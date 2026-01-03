export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      roasters: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          logo_url: string | null;
          website: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          logo_url?: string | null;
          website?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          website?: string | null;
          location?: string | null;
          created_at?: string;
        };
      };
      coffees: {
        Row: {
          id: string;
          roaster_id: string;
          name: string;
          origin: string | null;
          region: string | null;
          process: string | null;
          roast_level: string | null;
          tasting_notes: string[] | null;
          altitude: string | null;
          varietal: string | null;
          harvest_year: string | null;
          bag_image_url: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          roaster_id: string;
          name: string;
          origin?: string | null;
          region?: string | null;
          process?: string | null;
          roast_level?: string | null;
          tasting_notes?: string[] | null;
          altitude?: string | null;
          varietal?: string | null;
          harvest_year?: string | null;
          bag_image_url?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          roaster_id?: string;
          name?: string;
          origin?: string | null;
          region?: string | null;
          process?: string | null;
          roast_level?: string | null;
          tasting_notes?: string[] | null;
          altitude?: string | null;
          varietal?: string | null;
          harvest_year?: string | null;
          bag_image_url?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          coffee_id: string;
          user_id: string;
          rating: number;
          review_text: string | null;
          brewing_method: string | null;
          brew_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          coffee_id: string;
          user_id: string;
          rating: number;
          review_text?: string | null;
          brewing_method?: string | null;
          brew_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          coffee_id?: string;
          user_id?: string;
          rating?: number;
          review_text?: string | null;
          brewing_method?: string | null;
          brew_date?: string | null;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          coffee_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          coffee_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          coffee_id?: string;
          created_at?: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
