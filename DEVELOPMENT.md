# Coffee Discovery App - Development Guide

## Project Setup Complete!

The Coffee Discovery App has been scaffolded with Phase 1 features implemented. This is a mobile-first application for specialty coffee enthusiasts to scan, rate, discover, and share coffee experiences.

## What's Been Built

### Core Infrastructure
- Expo SDK 54+ with TypeScript
- Expo Router (file-based routing) with tab navigation
- NativeWind v4 (Tailwind CSS for React Native)
- Supabase backend (PostgreSQL database, auth, storage)
- TanStack Query for server state management
- Complete database schema with RLS policies

### Implemented Features (Phase 1)

#### 1. Coffee Database & Discovery
- Browse all coffees in the database
- Search by coffee name, roaster, or origin
- Filter interface (UI ready for implementation)
- Real-time data fetching with loading states
- Empty states and error handling

#### 2. Coffee Profiles
- Detailed coffee pages with full information
- Display origin, region, process, roast level, varietal, altitude
- Tasting notes displayed as tags
- Coffee bag image display
- Link to roaster profile

#### 3. Rating & Review System
- Star rating component (1-5 stars)
- Add reviews with modal interface
- Display all reviews for each coffee
- Calculate and show average ratings
- Authentication check before rating
- Review cards with user info and timestamps

#### 4. Navigation & UI
- Tab-based navigation (Home, Discover, Scan, Profile)
- Clean, coffee-themed design
- Smooth transitions and animations
- Loading and error states throughout

### Project Structure

```
coffee-app/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx          # Tab layout with icons
│   │   ├── index.tsx            # Home/Feed (placeholder)
│   │   ├── discover.tsx         # Coffee discovery & search ✅
│   │   ├── scan.tsx             # Camera/Scan (placeholder)
│   │   └── profile.tsx          # User profile (placeholder)
│   ├── coffee/[id].tsx          # Coffee detail page ✅
│   ├── roaster/[id].tsx         # Roaster profile (placeholder)
│   ├── user/[id].tsx            # User profile (placeholder)
│   └── _layout.tsx              # Root layout with providers
├── components/                   # Reusable components ✅
│   ├── CoffeeCard.tsx           # Coffee list item
│   ├── ReviewCard.tsx           # Review display
│   ├── RatingStars.tsx          # Star rating component
│   └── Scanner.tsx              # Camera scanner (ready)
├── lib/                         # Utilities
│   ├── supabase.ts              # Supabase client ✅
│   └── queries.ts               # React Query hooks ✅
├── types/                       # TypeScript types
│   └── database.types.ts        # Supabase generated types ✅
├── supabase/                    # Database
│   └── migrations/
│       └── 001_initial_schema.sql ✅
├── .env                         # Environment variables
├── tailwind.config.js           # Tailwind config
├── metro.config.js              # Metro bundler config
└── package.json                 # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)
- Supabase account

### Installation

1. **Navigate to the project:**
   ```bash
   cd coffee-app
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Configure Supabase:**
   - Create a Supabase project at https://supabase.com
   - Run the SQL migration in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor
   - Update `.env` with your Supabase credentials (already configured)

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on your device:**
   - Scan the QR code with Expo Go (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## Database Setup

The database schema has been created in `supabase/migrations/001_initial_schema.sql`. To set it up:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of the migration file
4. Run the migration

This creates:
- `users` - User profiles
- `roasters` - Coffee roasters
- `coffees` - Coffee products
- `reviews` - User reviews and ratings
- `favorites` - User favorite coffees
- `follows` - User follow relationships
- RLS policies for security
- Helper functions for ratings

## Tech Stack Details

### Frontend
- **Expo SDK 54+** - React Native framework
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **NativeWind v4** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth animations

### Backend & Data
- **Supabase** - PostgreSQL database
- **Supabase Auth** - User authentication
- **Supabase Storage** - Image storage
- **TanStack Query** - Server state management
- **Expo SecureStore** - Secure token storage

### Components & UI
- Custom reusable components
- Responsive design
- Loading states
- Error handling
- Empty states

## Available React Query Hooks

Located in `lib/queries.ts`:

### Coffees
- `useCoffees()` - Get all coffees
- `useCoffee(id)` - Get single coffee
- `useSearchCoffees(query)` - Search coffees

### Roasters
- `useRoaster(id)` - Get roaster details
- `useRoasterCoffees(roasterId)` - Get roaster's coffees

### Reviews
- `useCoffeeReviews(coffeeId)` - Get coffee reviews
- `useCreateReview()` - Mutation to create review

### Favorites
- `useUserFavorites(userId)` - Get user favorites
- `useToggleFavorite()` - Add/remove favorites

### Auth
- `useSession()` - Get current session
- `useCurrentUser()` - Get current user profile
- `useUser(id)` - Get user profile

## Next Steps (To Complete Phase 1)

### Not Yet Implemented:
1. **Authentication Flow** - Sign up, login, logout
2. **User Profile** - View and edit user profile
3. **Roaster Profiles** - Complete roaster pages
4. **Coffee Scanning** - Camera + OCR integration
5. **Home Feed** - Activity feed implementation

### Future Phases:
- Phase 2: Community features (follows, feed, collections)
- Phase 3: Recipes, e-commerce, cafe check-ins
- Phase 4: Barcode scanning, AI recommendations, marketplace

## Development Tips

### Adding New Features
1. Create types in `types/database.types.ts`
2. Add query hooks in `lib/queries.ts`
3. Build reusable components in `components/`
4. Create pages in `app/`

### Styling with NativeWind
Use Tailwind classes directly:
```tsx
<View className="p-4 bg-white rounded-lg">
  <Text className="text-xl font-bold text-gray-800">Hello</Text>
</View>
```

### Fetching Data
```tsx
const { data, isLoading, error } = useCoffees();
```

### Creating Mutations
```tsx
const createReview = useCreateReview();
await createReview.mutateAsync({ coffee_id, rating, review_text });
```

## Common Commands

```bash
# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Clear cache
npx expo start --clear

# Type check
npx tsc --noEmit

# Build for production
eas build --platform ios
eas build --platform android
```

## Troubleshooting

### Module not found errors
```bash
npx expo start --clear
```

### Database connection issues
- Check `.env` file has correct Supabase credentials
- Verify Supabase project is active

### NativeWind classes not working
- Ensure `global.css` is imported in `app/_layout.tsx`
- Check `metro.config.js` has NativeWind configuration

## Project Status

✅ Project scaffolding complete
✅ Database schema created
✅ Coffee discovery implemented
✅ Coffee profiles implemented
✅ Rating system implemented
✅ Core components built
⏳ Authentication flow (pending)
⏳ User profiles (pending)
⏳ Scanning feature (pending)
⏳ Roaster profiles (pending)

## Contributing

This project uses Claude Code for development. All code follows TypeScript best practices and React Native conventions.

---

Built with ❤️ and ☕ by Daniel
