-- Seed Nomad Coffee Examples
-- Run this in Supabase SQL Editor to add example coffees

-- Insert Nomad Coffee roaster (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.roasters WHERE name = 'Nomad Coffee') THEN
    INSERT INTO public.roasters (name, description, website, location, logo_url)
    VALUES (
      'Nomad Coffee',
      'Specialty coffee roasters based in Barcelona, Spain. Focused on direct trade relationships and exceptional quality.',
      'https://nomadcoffee.es',
      'Barcelona, Spain',
      'https://nomadcoffee.es/cdn/shop/files/nomad-coffee-logo.png'
    );
  END IF;
END $$;

-- Insert Fellow Farms coffee
WITH nomad_roaster AS (
  SELECT id FROM public.roasters WHERE name = 'Nomad Coffee'
)
INSERT INTO public.coffees (
  roaster_id,
  name,
  origin,
  region,
  process,
  varietal,
  altitude,
  harvest_year,
  tasting_notes,
  bag_image_url
)
SELECT
  id,
  'Fellow Farms',
  'Colombia',
  'Valle del Cauca',
  'Natural',
  'Geisha',
  '1,700-2,000 MASL',
  '2025',
  ARRAY['White flowers', 'Honey', 'Poached pear', 'Plum', 'Red fruit jam', 'Peach', 'Sultana raisins'],
  'https://nomadcoffee.es/cdn/shop/files/fellow-farms-geisha-nomad-coffee.jpg'
FROM nomad_roaster
WHERE NOT EXISTS (
  SELECT 1 FROM public.coffees c
  JOIN public.roasters r ON c.roaster_id = r.id
  WHERE c.name = 'Fellow Farms' AND r.name = 'Nomad Coffee'
);

-- Insert Sidra Las Flores coffee
WITH nomad_roaster AS (
  SELECT id FROM public.roasters WHERE name = 'Nomad Coffee'
)
INSERT INTO public.coffees (
  roaster_id,
  name,
  origin,
  region,
  process,
  varietal,
  altitude,
  harvest_year,
  tasting_notes,
  bag_image_url
)
SELECT
  id,
  'Sidra Las Flores',
  'Colombia',
  'Acevedo, Huila',
  'Natural Anaerobic',
  'Bourbon Sidra',
  '1,750 MASL',
  '2025',
  ARRAY['Cacao nibs', 'Lychee', 'Pineapple', 'Mango', 'Citrus peel', 'Cherry', 'Cocoa powder'],
  'https://nomadcoffee.es/cdn/shop/files/sidra-las-flores-nomad-coffee.jpg'
FROM nomad_roaster
WHERE NOT EXISTS (
  SELECT 1 FROM public.coffees c
  JOIN public.roasters r ON c.roaster_id = r.id
  WHERE c.name = 'Sidra Las Flores' AND r.name = 'Nomad Coffee'
);

-- Insert Jardín coffee
WITH nomad_roaster AS (
  SELECT id FROM public.roasters WHERE name = 'Nomad Coffee'
)
INSERT INTO public.coffees (
  roaster_id,
  name,
  origin,
  region,
  process,
  varietal,
  altitude,
  harvest_year,
  tasting_notes,
  bag_image_url
)
SELECT
  id,
  'Jardín',
  'Costa Rica',
  'Turrialba',
  'Natural Anaerobic',
  'SL28, SL24, Typica, Geisha, San Isidro, Bourbon',
  '1,400 MASL',
  '2025',
  ARRAY['Blackberries', 'Red plum', 'Tamarind', 'Molasses', 'Cherry', 'Dark chocolate'],
  'https://nomadcoffee.es/cdn/shop/files/jardin-aquiares-nomad-coffee.jpg'
FROM nomad_roaster
WHERE NOT EXISTS (
  SELECT 1 FROM public.coffees c
  JOIN public.roasters r ON c.roaster_id = r.id
  WHERE c.name = 'Jardín' AND r.name = 'Nomad Coffee'
);

-- Verify the inserts
SELECT
  c.name as coffee_name,
  r.name as roaster_name,
  c.origin,
  c.process,
  c.tasting_notes
FROM public.coffees c
JOIN public.roasters r ON c.roaster_id = r.id
WHERE r.name = 'Nomad Coffee';
