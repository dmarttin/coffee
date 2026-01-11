import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { Database } from "../types/database.types";
import type { Location, LocationFilterParams } from "../types/location";
import { DUMMY_LOCATIONS } from "./dummy-locations";

type Coffee = Database["public"]["Tables"]["coffees"]["Row"];
type Roaster = Database["public"]["Tables"]["roasters"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

// ============ Coffees ============

export function useCoffees() {
  return useQuery({
    queryKey: ["coffees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coffees")
        .select("*, roasters(name, logo_url)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCoffee(id: string) {
  return useQuery({
    queryKey: ["coffee", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coffees")
        .select("*, roasters(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useSearchCoffees(query: string) {
  return useQuery({
    queryKey: ["coffees", "search", query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coffees")
        .select("*, roasters(name, logo_url)")
        .or(`name.ilike.%${query}%,origin.ilike.%${query}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: query.length > 0,
  });
}

// ============ Roasters ============

export function useRoaster(id: string) {
  return useQuery({
    queryKey: ["roaster", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roasters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useRoasterCoffees(roasterId: string) {
  return useQuery({
    queryKey: ["roaster", roasterId, "coffees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coffees")
        .select("*")
        .eq("roaster_id", roasterId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!roasterId,
  });
}

// ============ Reviews ============

export function useCoffeeReviews(coffeeId: string) {
  return useQuery({
    queryKey: ["coffee", coffeeId, "reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, users(username, display_name, avatar_url)")
        .eq("coffee_id", coffeeId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!coffeeId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: {
      coffee_id: string;
      rating: number;
      review_text?: string;
      brewing_method?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const reviewData: Database["public"]["Tables"]["reviews"]["Insert"] = {
        ...review,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("reviews")
        .insert(reviewData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["coffee", variables.coffee_id, "reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["coffee", variables.coffee_id] });
    },
  });
}

// ============ Favorites ============

export function useUserFavorites(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*, coffees(*, roasters(name))")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ coffeeId, isFavorite }: { coffeeId: string; isFavorite: boolean }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("coffee_id", coffeeId);

        if (error) throw error;
      } else {
        const favoriteData: Database["public"]["Tables"]["favorites"]["Insert"] = {
          user_id: user.id,
          coffee_id: coffeeId,
        };

        const { error } = await supabase.from("favorites").insert(favoriteData);

        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", "favorites"] });
    },
  });
}

// ============ User ============

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

// ============ Auth ============

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    },
  });
}

// ============ Locations ============

export function useLocations(params?: LocationFilterParams) {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: async () => {
      // For now, use dummy data. Replace with Supabase query when ready:
      // const { data, error } = await supabase
      //   .from("locations")
      //   .select("*")
      //   .order("name");

      let filtered = [...DUMMY_LOCATIONS];

      if (params?.city) {
        filtered = filtered.filter(
          (loc) => loc.city.toLowerCase() === params.city!.toLowerCase()
        );
      }

      if (params?.type) {
        filtered = filtered.filter((loc) => loc.type === params.type);
      }

      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (loc) =>
            loc.name.toLowerCase().includes(query) ||
            loc.address.toLowerCase().includes(query)
        );
      }

      return filtered as Location[];
    },
  });
}

export function useCoffeeLocations(coffeeId: string) {
  return useQuery({
    queryKey: ["coffee", coffeeId, "locations"],
    queryFn: async () => {
      // For now, return all dummy locations. Replace with:
      // const { data, error } = await supabase
      //   .from("coffee_locations")
      //   .select("locations(*)")
      //   .eq("coffee_id", coffeeId);

      // Return dummy data for development
      return DUMMY_LOCATIONS as Location[];
    },
    enabled: !!coffeeId,
  });
}
