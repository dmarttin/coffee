import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import "dotenv/config";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function seedNomadCoffees() {
  try {
    console.log("🌱 Seeding Nomad Coffee examples...\n");

    // First, check if Nomad Coffee roaster exists or create it
    const { data: existingRoaster } = await supabase
      .from("roasters")
      .select("id")
      .eq("name", "Nomad Coffee")
      .single();

    let roasterId: string;

    if (existingRoaster) {
      roasterId = existingRoaster.id;
      console.log("✓ Found existing Nomad Coffee roaster");
    } else {
      const { data: newRoaster, error: roasterError } = await supabase
        .from("roasters")
        .insert({
          name: "Nomad Coffee",
          description:
            "Specialty coffee roasters based in Barcelona, Spain. Focused on direct trade relationships and exceptional quality.",
          website: "https://nomadcoffee.es",
          location: "Barcelona, Spain",
          logo_url: "https://nomadcoffee.es/cdn/shop/files/nomad-coffee-logo.png",
        })
        .select()
        .single();

      if (roasterError) throw roasterError;
      roasterId = newRoaster!.id;
      console.log("✓ Created Nomad Coffee roaster");
    }

    // Seed the three coffees
    const coffees = [
      {
        name: "Fellow Farms",
        origin: "Colombia",
        region: "Valle del Cauca",
        process: "Natural",
        varietal: "Geisha",
        altitude: "1,700-2,000 MASL",
        harvest_year: "2025",
        tasting_notes: [
          "White flowers",
          "Honey",
          "Poached pear",
          "Plum",
          "Red fruit jam",
          "Peach",
          "Sultana raisins",
        ],
        bag_image_url: "https://nomadcoffee.es/cdn/shop/files/fellow-farms-geisha-nomad-coffee.jpg",
      },
      {
        name: "Sidra Las Flores",
        origin: "Colombia",
        region: "Acevedo, Huila",
        process: "Natural Anaerobic",
        varietal: "Bourbon Sidra",
        altitude: "1,750 MASL",
        harvest_year: "2025",
        tasting_notes: [
          "Cacao nibs",
          "Lychee",
          "Pineapple",
          "Mango",
          "Citrus peel",
          "Cherry",
          "Cocoa powder",
        ],
        bag_image_url: "https://nomadcoffee.es/cdn/shop/files/sidra-las-flores-nomad-coffee.jpg",
      },
      {
        name: "Jardín",
        origin: "Costa Rica",
        region: "Turrialba",
        process: "Natural Anaerobic",
        varietal: "SL28, SL24, Typica, Geisha, San Isidro, Bourbon",
        altitude: "1,400 MASL",
        harvest_year: "2025",
        tasting_notes: [
          "Blackberries",
          "Red plum",
          "Tamarind",
          "Molasses",
          "Cherry",
          "Dark chocolate",
        ],
        bag_image_url: "https://nomadcoffee.es/cdn/shop/files/jardin-aquiares-nomad-coffee.jpg",
      },
    ];

    for (const coffee of coffees) {
      // Check if coffee already exists
      const { data: existingCoffee } = await supabase
        .from("coffees")
        .select("id")
        .eq("name", coffee.name)
        .eq("roaster_id", roasterId)
        .single();

      if (existingCoffee) {
        console.log(`⊘ Skipping "${coffee.name}" - already exists`);
        continue;
      }

      const { error: coffeeError } = await supabase.from("coffees").insert({
        roaster_id: roasterId,
        ...coffee,
      });

      if (coffeeError) {
        console.error(`✗ Error inserting "${coffee.name}":`, coffeeError.message);
      } else {
        console.log(`✓ Added "${coffee.name}"`);
      }
    }

    console.log("\n✨ Seeding complete!\n");
  } catch (error: any) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

seedNomadCoffees();
