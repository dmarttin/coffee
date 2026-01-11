# Component Library

> Track the status of all UI components for the Coffee App.
>
> **Status Legend:**
> - `[ ]` Not started
> - `[~]` In progress
> - `[x]` Complete
> - `[!]` Needs revision

---

## Design System

Foundation files for typography, colors, spacing, and theming.

| File | Status | Notes |
|------|--------|-------|
| `lib/theme.ts` | `[x]` | Colors, typography, spacing, shadows, gradients |
| `lib/fonts.ts` | `[x]` | Font loading config (Fraunces, DM Sans, JetBrains Mono) |
| `tailwind.config.js` | `[x]` | Extended with coffee palette, roast levels, origins |
| `app/showcase.tsx` | `[x]` | Dev screen to preview all components |

**Access showcase:** Profile tab → Developer Tools → Design System Showcase

---

## UI Primitives

Core building blocks used across the entire app.

| Component | Status | Notes |
|-----------|--------|-------|
| Button | `[x]` | Existing - multiple variants |
| Input | `[x]` | Existing |
| Card | `[x]` | Existing - with Header, Content, Footer |
| Badge | `[x]` | Existing |
| Text | `[x]` | Existing |
| Separator | `[x]` | Existing |
| Icons | `[x]` | Icon wrapper around lucide-react-native |

---

## Layout

Structural components for consistent page layouts.

| Component | Status | Notes |
|-----------|--------|-------|
| Header | `[x]` | Custom header with back/close, large title support |
| Footer | `[x]` | Tab bar styled with design system |
| Container | `[x]` | Screen wrapper with safe areas, scroll, padding |

---

## Home Screen

Components for the main feed/home experience.

| Component | Status | Notes |
|-----------|--------|-------|
| CaptureButton | `[x]` | FAB or prominent button to scan coffee |
| CoffeeCard | `[x]` | Existing - coffee preview card |
| FilterBar | `[x]` | Filter chips (origin, roast, etc.) |
| SortDropdown | `[x]` | Sort by rating, recent, etc. |

---

## Camera & Scanner

Components for the OCR coffee capture flow.

| Component | Status | Notes |
|-----------|--------|-------|
| CaptureScreen | `[x]` | Camera viewfinder with overlay |
| LoadingOCR | `[x]` | Processing animation/skeleton |
| PossibleMatches | `[x]` | List of matched coffees from scan |
| Scanner | `[x]` | Existing - core scanner logic |

---

## Coffee Details

Components for individual coffee pages.

| Component | Status | Notes |
|-----------|--------|-------|
| CoffeeHero | `[x]` | Hero image, name, roaster, origin |
| CoffeeRating | `[x]` | Star rating display + count |
| CoffeeInfo | `[x]` | Origin, process, altitude, flavor notes |
| CoffeeNotes | `[x]` | User's personal tasting notes |
| CoffeeMetrics | `[x]` | Grind size, brew method, ratio |
| TasteSlider | `[x]` | Existing - flavor profile sliders |
| RatingStars | `[x]` | Existing |
| RecipeStarGraph | `[x]` | Existing |

### Coffee Details - Implementation Plans

#### CoffeeHero
1. Props interface
   - `type CoffeeHeroProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coffeeHeroVariants> & {`
   - `name: string; roasterName?: string; origin?: string; imageUrl?: string;`
   - `rating?: number; reviewCount?: number;`
   - `onShare?: () => void; onRate?: () => void; onAddToCart?: () => void;`
   - `rightAccessory?: React.ReactNode; className?: string;`
   - `}`
2. Visual structure/layout
   - Top hero container with bag image on the left, content stack on the right.
   - Image block uses `Image` with a rounded frame and a subtle shadow.
   - Title stack: origin badge, coffee name (display font), roaster name, and meta line.
   - Floating action row under meta (rate/share/add) or a single trailing accessory slot.
3. Styling approach
   - Use CVA for layout variants: `variant: "default" | "compact"` and `tone: "cream" | "dark"`.
   - Use `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border` for theme compatibility.
   - Use `font-display` and `text-display-sm` for the name; `font-body` for labels.
   - Add a gradient-like overlay using a positioned `View` with `bg-coffee-900/40`.
4. Sub-components needed
   - `CoffeeHeroImage` (handles placeholder + overlay).
   - `CoffeeHeroActions` (Pressables for share/rate/add).
   - `CoffeeHeroMeta` (badge + name + roaster).
5. Integration points with existing components
   - `Badge` for origin label.
   - `Button` or `Pressable` for actions.
   - `Text` for typography and text tokens.
   - Optional `RatingStars` for a mini rating chip.

#### CoffeeRating
1. Props interface
   - `type CoffeeRatingProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coffeeRatingVariants> & {`
   - `rating: number; reviewCount: number;`
   - `breakdown?: Array<{ label: string; value: number }>;`
   - `showBreakdown?: boolean; className?: string;`
   - `}`
2. Visual structure/layout
   - Left stack: large rating number, `RatingStars`, review count line.
   - Right stack: optional vertical rating breakdown bars with labels.
   - Divider between left/right when breakdown is present.
3. Styling approach
   - CVA for `size: "default" | "compact"` and `layout: "stack" | "split"`.
   - Use `Card` or `View` with `bg-card` and `border-border` for depth.
   - Rating number uses `font-display` + `text-display-sm`.
   - Breakdown bars use `bg-muted` track with `bg-amber` fill.
4. Sub-components needed
   - `RatingBreakdownRow` (label + bar + value).
5. Integration points with existing components
   - `RatingStars` for stars.
   - `Separator` for split layout.
   - `Text` for labels and counts.

#### CoffeeInfo
1. Props interface
   - `type CoffeeInfoProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coffeeInfoVariants> & {`
   - `origin?: string; process?: string; altitude?: string;`
   - `varietal?: string; harvestDate?: string;`
   - `items?: Array<{ label: string; value: string; icon?: React.ReactNode }>;`
   - `className?: string;`
   - `}`
2. Visual structure/layout
   - Grid or stacked rows of labeled values.
   - Each row includes an icon on the left, label, and value aligned right.
   - Optional "Details" header row with a subtle divider.
3. Styling approach
   - CVA with `variant: "grid" | "stack"` and `emphasis: "default" | "muted"`.
   - Use `bg-secondary` and `rounded-lg` for row chips or `bg-card` for the block.
   - Labels in `text-xs uppercase text-muted-foreground`.
   - Values in `text-sm text-foreground font-body`.
4. Sub-components needed
   - `InfoRow` (icon + label + value).
   - `InfoGrid` (2-column layout for compact screens).
5. Integration points with existing components
   - `Text` for labels/values.
   - `Separator` between rows in stacked layout.
   - Optional `Badge` for process or varietal.

#### CoffeeNotes
1. Props interface
   - `type CoffeeNotesProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coffeeNotesVariants> & {`
   - `note?: string; updatedAt?: string;`
   - `flavorTags?: string[];`
   - `onEdit?: () => void; onDelete?: () => void;`
   - `onChangeText?: (text: string) => void;`
   - `editable?: boolean; className?: string;`
   - `}`
2. Visual structure/layout
   - Header row: "Notes" title + edit/delete actions.
   - Body: multiline text area or rendered text block with placeholder.
   - Footer: timestamp and optional flavor tag chips.
3. Styling approach
   - CVA with `state: "empty" | "filled"` for placeholder styling.
   - Use `bg-card`, `border-border`, and `rounded-xl` for a journal card feel.
   - Text area uses `font-body`; timestamp uses `text-xs text-muted-foreground`.
   - Tag chips use `Badge` variants with warm accent.
4. Sub-components needed
   - `NotesActions` (edit/delete buttons).
   - `FlavorTagList` (horizontal wrap of tags).
5. Integration points with existing components
   - `Input` or `TextInput` for edit mode.
   - `Button` (ghost) for edit/delete.
   - `Badge` for flavor tags.
   - `Text` for content and timestamp.

#### CoffeeMetrics
1. Props interface
   - `type CoffeeMetricsProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coffeeMetricsVariants> & {`
   - `grindSize?: string; brewMethod?: string; ratio?: string;`
   - `waterTemp?: string; brewTime?: string;`
   - `metrics?: Array<{ label: string; value: string; unit?: string }>;`
   - `className?: string;`
   - `}`
2. Visual structure/layout
   - Two-column grid of metric tiles or a stacked list on small screens.
   - Each tile has label on top, value in mono font, unit aligned to baseline.
   - Optional "Recipe" header and compact divider.
3. Styling approach
   - CVA with `layout: "grid" | "stack"` and `density: "cozy" | "tight"`.
   - Use `bg-secondary` for tiles and `border-border` for definition.
   - Values use `font-mono` to emphasize precision.
4. Sub-components needed
   - `MetricItem` (label + value + unit).
   - `MetricGrid` (responsive columns).
5. Integration points with existing components
   - `Card` for the overall container if a grouped module is needed.
   - `Text` for labels and values.
   - `Separator` between rows for stacked layout.

---

## Where to Find (Map)

Reusable map components for locations.

| Component | Status | Notes |
|-----------|--------|-------|
| MapView | `[x]` | Interactive map container |
| LocationPin | `[x]` | Custom map marker |
| LocationList | `[x]` | List view of locations |
| LocationCard | `[x]` | Card for a single location |
| RoasterLocationsMap | `[x]` | Existing |
| RoasterMapPreview | `[x]` | Existing |

---

## Reviews

Review and comment system components.

| Component | Status | Notes |
|-----------|--------|-------|
| ReviewSummary | `[x]` | Aggregate rating + breakdown |
| ReviewCard | `[x]` | Existing - single review preview |
| ReviewFull | `[x]` | Expanded review with full text |
| CommentCard | `[x]` | Single comment display |
| CommentList | `[x]` | Threaded comments |
| CommentInput | `[x]` | Add comment form |

---

## Cafeteria Details

Components for cafe/shop pages.

| Component | Status | Notes |
|-----------|--------|-------|
| CafeteriaHero | `[x]` | Hero with name, photo, hours |
| CafeteriaInfo | `[x]` | Address, hours, contact |
| CafeteriaMap | `[x]` | Single location map embed |
| AvailableCoffees | `[x]` | Grid/list of coffees served |

---

## Brand Details

Components for roaster/brand pages.

| Component | Status | Notes |
|-----------|--------|-------|
| BrandHero | `[x]` | Brand logo, name, description |
| BrandInfo | `[x]` | Founded, location, story |
| BrandLocations | `[x]` | Where to find this brand |
| BrandCoffees | `[x]` | All coffees from this roaster |

---

## Profile

User profile and settings components.

| Component | Status | Notes |
|-----------|--------|-------|
| ProfileHeader | `[x]` | Avatar, name, stats |
| MyCoffeeList | `[x]` | User's saved/rated coffees |
| SavedCafeterias | `[x]` | Saved cafe list with filters |
| CafeteriaMapFilters | `[x]` | Saved / Want to go / Custom lists |
| SettingsMenu | `[x]` | Settings list with toggles |
| SettingsRow | `[x]` | Individual setting item |

---

## Recommendations

Discovery and suggestion components.

| Component | Status | Notes |
|-----------|--------|-------|
| CoffeeCarousel | `[x]` | Existing - horizontal scroll |
| RecommendationSection | `[x]` | "You might like" section |
| SimilarCoffees | `[x]` | Based on current coffee |

---

## Summary

| Category | Total | Complete | Remaining |
|----------|-------|----------|-----------|
| Design System | 4 | 4 | 0 |
| UI Primitives | 7 | 7 | 0 |
| Layout | 3 | 3 | 0 |
| Home Screen | 4 | 4 | 0 |
| Camera & Scanner | 4 | 4 | 0 |
| Coffee Details | 8 | 8 | 0 |
| Where to Find | 6 | 6 | 0 |
| Reviews | 6 | 6 | 0 |
| Cafeteria Details | 4 | 4 | 0 |
| Brand Details | 4 | 4 | 0 |
| Profile | 6 | 6 | 0 |
| Recommendations | 3 | 3 | 0 |
| **TOTAL** | **59** | **59** | **0** |

---

## Development Order (Suggested)

1. ~~**Design System** - theme, fonts, tailwind config~~ ✅
2. ~~**Layout** - Header, Footer, Container~~ ✅
3. ~~**UI Primitives** - Icons~~ ✅
4. ~~**Home Screen** - CaptureButton, FilterBar, SortDropdown~~ ✅
5. ~~**Coffee Details** - CoffeeHero, CoffeeRating, CoffeeInfo, CoffeeNotes, CoffeeMetrics~~ ✅
6. ~~**Reviews** - ReviewSummary, ReviewFull, CommentCard, CommentList, CommentInput~~ ✅
7. ~~**Where to Find** - MapView, LocationPin, LocationList, LocationCard~~ ✅
8. ~~**Camera & Scanner** - CaptureScreen, LoadingOCR, PossibleMatches~~ ✅
9. ~~**Cafeteria Details** - All~~ ✅
10. ~~**Brand Details** - All~~ ✅
11. ~~**Profile** - All~~ ✅
12. ~~**Recommendations** - RecommendationSection, SimilarCoffees~~ ✅
