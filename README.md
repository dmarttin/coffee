# ☕ Coffee Discovery App

A mobile-first application for specialty coffee enthusiasts to scan, rate, discover, and share coffee experiences. Think Vivino or Untappd, but for coffee.

## 🎯 Vision

The specialty coffee scene is exploding with new roasters and shops opening daily. This app aims to be the central hub where coffee lovers can:
- Scan and catalog coffee bags
- Rate and review their coffee experiences
- Discover new roasters and origins
- Share brewing recipes
- Connect to e-commerce platforms to purchase coffee
- Learn more about coffee
- Discover new recipies

## ✨ Core Features (MVP)

### Phase 1 - Essential Discovery
- [ ] **Coffee Scanning**: Use camera to capture coffee bag labels with OCR text extraction
- [ ] **Coffee Database**: Browse and search all coffees in the database
- [ ] **Coffee Profiles**: Detailed pages for each coffee with origin, roaster, process, tasting notes
- [ ] **Rating System**: Rate coffees (1-5 "beans") with written reviews
- [ ] **User Profiles**: Personal coffee journal with rated coffees and favorites
- [ ] **Roaster Profiles**: Dedicated pages for coffee roasters with their catalog

### Phase 2 - Community & Discovery
- [ ] **Feed/Timeline**: Discover what coffees others are drinking and rating
- [ ] **Follow System**: Follow other coffee enthusiasts and roasters
- [ ] **Search & Filters**: Advanced search by origin, process, roaster, flavor notes
- [ ] **Collections**: Create and share coffee lists (e.g., "Best Ethiopian Naturals")
- [ ] **Check-ins**: Mark when/where you tried a coffee (at home, at a cafe)
- [ ] **Coffee Shops**: The cafes can create "shop pages", where users can find all the cafes nearby with updated times and important information like what coffe do they serve, they are roasters…

### Phase 3 - Enhanced Features
- [ ] **Brewing Recipes**: Share and discover brewing methods (Aeropress, V60, etc.)
- [ ] **Recipe Calculator**: Adjust recipes based on dose/ratio/water temp
- [ ] **E-commerce Integration**: Link to online shops selling the coffee
- [ ] **Nearby Cafes**: Find specialty coffee shops near you serving specific coffees
- [ ] **Notifications**: New coffee releases from favorite roasters, friends' reviews
- [ ] **Statistics**: Personal coffee stats (origins tried, favorite roasters, spending)

### Phase 4 - Advanced
- [ ] **Barcode Scanning**: Quick lookup via product barcodes
- [ ] **Taste Profile**: AI-powered recommendations based on rating history
- [ ] **Roaster Dashboard**: Tools for roasters to manage their catalog
- [ ] **Marketplace**: Connect users directly to roasters for purchases
- [ ] **Events**: Coffee cuppings, workshops, and meetups

## 🛠 Tech Stack

### Frontend (Mobile)
- **Framework**: Expo SDK 52+ with TypeScript
- **Routing**: Expo Router (file-based)
- **Styling**: NativeWind (Tailwind for React Native)
- **Animations**: React Native Reanimated
- **Images**: Expo Image

### Backend & Data
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (coffee bag images)
- **Realtime**: Supabase Realtime (live updates)
- **API Client**: @supabase/supabase-js

### Camera & Scanning
- **Camera**: expo-camera
- **Image Picker**: expo-image-picker
- **OCR**: Google ML Kit Vision / Tesseract.js
- **Barcode**: expo-barcode-scanner

### State Management
- **Server State**: TanStack Query (React Query)
- **Client State**: Zustand (if needed)

### Essential Modules
- `expo-auth-session` - Supabase authentication
- `expo-secure-store` - Secure token storage
- `expo-file-system` - File handling
- `expo-notifications` - Push notifications
- `expo-location` - Geolocation for cafe check-ins

### Deployment
- **Mobile Builds**: EAS (Expo Application Services)
- **App Stores**: iOS App Store & Google Play Store
- **CI/CD**: EAS Build & Submit

## 📊 Database Schema (Initial)

### Tables

**users**
- id (uuid, primary key)
- email (text)
- username (text, unique)
- display_name (text)
- avatar_url (text)
- bio (text)
- created_at (timestamp)

**roasters**
- id (uuid, primary key)
- name (text)
- description (text)
- logo_url (text)
- website (text)
- location (text)
- created_at (timestamp)

**coffees**
- id (uuid, primary key)
- roaster_id (uuid, foreign key)
- name (text)
- origin (text)
- region (text)
- process (text) - washed, natural, honey, etc.
- roast_level (text) - light, medium, dark
- tasting_notes (text[]) - array of flavor notes
- altitude (text)
- varietal (text)
- harvest_year (text)
- bag_image_url (text)
- created_by (uuid, foreign key to users)
- created_at (timestamp)

**reviews**
- id (uuid, primary key)
- coffee_id (uuid, foreign key)
- user_id (uuid, foreign key)
- rating (integer) - 1-5
- review_text (text)
- brewing_method (text)
- brew_date (date)
- created_at (timestamp)

**favorites**
- id (uuid, primary key)
- user_id (uuid, foreign key)
- coffee_id (uuid, foreign key)
- created_at (timestamp)

**follows**
- id (uuid, primary key)
- follower_id (uuid, foreign key to users)
- following_id (uuid, foreign key to users)
- created_at (timestamp)

### Future Tables
- `recipes` - brewing recipes
- `check_ins` - cafe visits
- `collections` - user-curated coffee lists
- `cafes` - coffee shop locations
- `coffee_variants` - different bag sizes/grinds of same coffee

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app (for testing)
- Supabase account

### Installation
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Create new Expo app with TypeScript
npx create-expo-app@latest coffee-app --template

# Navigate to project
cd coffee-app

# Install dependencies
npm install @supabase/supabase-js
npm install nativewind
npm install tailwindcss
npm install @tanstack/react-query
npm install zustand
npm install expo-camera expo-image-picker expo-barcode-scanner
npm install expo-secure-store expo-file-system expo-notifications
```

### Environment Variables

Create `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Development
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on physical device (scan QR with Expo Go)
npx expo start
```

### Building for Production
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## 📁 Project Structure
```
coffee-app/
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home/Feed
│   │   ├── discover.tsx     # Discover coffees
│   │   ├── scan.tsx         # Camera/Scan
│   │   └── profile.tsx      # User profile
│   ├── coffee/[id].tsx      # Coffee detail page
│   ├── roaster/[id].tsx     # Roaster profile page
│   ├── user/[id].tsx        # User profile page
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── CoffeeCard.tsx
│   ├── ReviewCard.tsx
│   ├── RatingStars.tsx
│   └── Scanner.tsx
├── lib/                     # Utilities
│   ├── supabase.ts         # Supabase client
│   ├── queries.ts          # React Query hooks
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript types
│   └── database.types.ts   # Supabase generated types
├── assets/                  # Images, fonts
├── .env                     # Environment variables
├── app.json                # Expo config
├── package.json
└── tsconfig.json
```

## 🎨 Design Principles

- **Mobile-first**: Optimized for one-handed use
- **Visual**: High-quality coffee bag photography
- **Fast**: Instant loading, optimistic updates
- **Simple**: Clean interface, easy onboarding
- **Delightful**: Smooth animations, satisfying interactions

## 🔐 Security & Privacy

- User data encrypted at rest (Supabase)
- Secure authentication with Supabase Auth
- Row Level Security (RLS) policies on all tables
- Images stored securely in Supabase Storage
- No tracking or selling of user data

## 📈 Success Metrics

- Active users scanning/rating coffee weekly
- Number of coffees in database
- User retention (7-day, 30-day)
- Reviews per coffee
- Roaster adoption rate

## 🗺 Roadmap

**Q1 2026**
- MVP launch (scanning, rating, discovery)
- Beta testing with specialty coffee community
- Initial roaster partnerships

**Q1 2026**
- Recipe sharing feature
- E-commerce integrations
- Cafe check-ins

**Q2 2026**
- AI taste profile recommendations
- Roaster dashboard
- Enhanced search & filters

**Q3 2026**
- Marketplace features
- Events & community meetups
- International expansion

## 📝 Development Notes

Built with ❤️ and ☕ by Daniel

This is an app-first product. Web version may come later if needed.

All development will be done using Claude Code for rapid iteration and AI-assisted development.


## 📄 License

TBD

---

**Let's make specialty coffee discovery amazing.** 🚀☕