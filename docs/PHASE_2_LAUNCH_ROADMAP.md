# Phase 2: Launch Roadmap

> **App**: Coffee Social - Social media platform for coffee discovery
> **Goal**: App Store & Play Store approval on first submission
> **Strategy**: Build foundation → Core features → Polish → Submit

---

## Roadmap Overview

```
PHASE A: Foundation & Compliance (Blocking)
├── 1. Product Scope Lock
├── 2. Authentication System
├── 3. Privacy & Legal Compliance
└── 4. Permission Handling

PHASE B: Core Feature Build
├── 5. Scanner Implementation
├── 6. User Profiles & Social Graph
├── 7. Social Feed
├── 8. Coffee Journal
└── 9. Café Check-ins

PHASE C: Platform Readiness
├── 10. UX/UI Audit & Fixes
├── 11. Performance & Stability
├── 12. Analytics Integration
└── 13. Error Handling & Edge Cases

PHASE D: Store Preparation
├── 14. Store Assets & Metadata
├── 15. Beta Testing (TestFlight/Internal)
├── 16. QA & Regression Testing
└── 17. Final Review Checklist

PHASE E: Launch
├── 18. Submission
├── 19. Launch Day
└── 20. Post-Launch Monitoring
```

---

# PHASE A: Foundation & Compliance

These items are **blocking** - nothing else should proceed until these are complete.

---

## 1. Product Scope Lock

### Objective
Finalize exactly what features ship in V1 vs post-launch to prevent scope creep and align all teams.

### What Must Be Done

- [ ] **Define V1 MVP Feature Set**
  - Core: Authentication, Scanner → Review flow, Coffee discovery
  - Social: User profiles, Following, Basic feed
  - Engagement: Coffee journal, Café check-ins
  - Photo sharing: Attached to reviews only (not standalone posts)

- [ ] **Define V1.1+ Features (NOT in first launch)**
  - Standalone photo posts
  - Direct messaging
  - Roaster verification
  - Advanced recommendation engine
  - Notifications beyond basics

- [ ] **Document Feature Specifications**
  - Scanner: What happens when scan succeeds/fails
  - Check-in: What data is captured
  - Journal: What constitutes a journal entry

- [ ] **Sign-off Meeting**
  - All stakeholders agree on scope
  - Written record of scope decisions

### Why It Matters
Scope creep is the #1 killer of launch timelines. Locking scope now prevents "just one more feature" delays. Teams need clarity on what to build.

### Deliverables
- [ ] V1 Feature Matrix document
- [ ] V1.1 Parking Lot document
- [ ] Stakeholder sign-off (documented)

### Owner(s)
- **Primary**: Product
- **Consulted**: iOS, Android, Design, Backend

### Dependencies
- None (this is the starting point)

### Pitfalls to Avoid
- Being vague about scope ("we'll see")
- Not documenting decisions
- Allowing stakeholders to add features verbally
- Confusing "nice to have" with "must have"

---

## 2. Authentication System

### Objective
Implement complete authentication flow with Email, Apple Sign-In, and Google Sign-In that meets App Store requirements.

### What Must Be Done

#### 2.1 Authentication UI Screens
- [ ] **Sign In Screen** (`/auth/sign-in`)
  - Email/password form
  - "Continue with Apple" button (prominent, above Google)
  - "Continue with Google" button
  - "Forgot password" link
  - "Create account" link
  - Error state handling

- [ ] **Sign Up Screen** (`/auth/sign-up`)
  - Email/password form
  - Username selection
  - Display name (optional)
  - Terms & Privacy checkbox (required)
  - Social sign-up buttons
  - Password requirements indicator

- [ ] **Forgot Password Screen** (`/auth/forgot-password`)
  - Email input
  - Submit button
  - Success confirmation
  - Back to sign in link

- [ ] **Email Verification Screen** (`/auth/verify`)
  - Pending verification state
  - Resend email button
  - Instructions text

#### 2.2 Social Auth Integration

- [ ] **Apple Sign-In** (REQUIRED)
  - Configure Supabase Apple provider
  - Add Apple Sign-In capability in Xcode
  - Implement `expo-apple-authentication`
  - Handle name/email privacy choices
  - Test on real device (simulator has issues)

- [ ] **Google Sign-In**
  - Configure Supabase Google provider
  - Set up Google Cloud OAuth credentials
  - Implement `expo-auth-session` with Google
  - Handle Android vs iOS differences

#### 2.3 Session Management

- [ ] **Persistent Sessions**
  - Store tokens in Expo Secure Store (already configured)
  - Auto-refresh expired tokens
  - Handle session expiry gracefully

- [ ] **Auth State Provider**
  - Global auth context
  - Loading state while checking session
  - Redirect to auth when needed

#### 2.4 Guest/Browse Mode

- [ ] **Allow Browsing Without Account**
  - Home feed accessible
  - Coffee details accessible
  - Discover/search accessible
  - Prompt sign-in for: Reviews, Journal, Following, Check-ins

### Why It Matters
- **Apple REQUIRES Sign in with Apple** if you offer any social login
- Users expect modern auth flows
- Session bugs cause frustration and churn
- Blocking auth breaks the entire app

### Deliverables
- [ ] 4 auth screens (sign-in, sign-up, forgot-password, verify)
- [ ] Apple Sign-In working on iOS
- [ ] Google Sign-In working on both platforms
- [ ] Email/password flow complete
- [ ] Session persistence working

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Supabase configuration
- **Design**: Auth screen designs

### Dependencies
- Supabase Auth providers configured
- Apple Developer account for Sign-In capability
- Google Cloud Console for OAuth

### Pitfalls to Avoid
- Apple Sign-In button must use official styling
- Apple Sign-In MUST be visually as prominent as Google
- Don't forget Android implementation of Apple Sign-In (yes, it works)
- Handle users who hide their email with Apple
- Test on real devices, not just simulators

---

## 3. Privacy & Legal Compliance

### Objective
Create all required legal documents and implement compliance features to meet store requirements and regulations.

### What Must Be Done

#### 3.1 Privacy Policy

- [ ] **Draft Privacy Policy**
  - Data collected:
    - Account info (email, username, name)
    - Profile photos
    - Coffee reviews and ratings
    - Location data (for check-ins)
    - Device info (for analytics)
  - How data is used:
    - Provide service
    - Personalization
    - Analytics
  - Third-party sharing:
    - Supabase (hosting)
    - Analytics provider
  - Data retention
  - User rights (access, deletion, export)
  - Contact info
  - Last updated date

- [ ] **GDPR Compliance** (if EU users)
  - Right to deletion
  - Right to data export
  - Consent mechanism for tracking

- [ ] **CCPA Compliance** (if CA users)
  - "Do Not Sell My Data" option
  - Data deletion capability

#### 3.2 Terms of Service

- [ ] **Draft Terms of Service**
  - User conduct rules
  - Content ownership (users own their content)
  - License grant (you can display their content)
  - Prohibited content
  - Account termination
  - Limitation of liability
  - Dispute resolution

#### 3.3 Hosting & Access

- [ ] **Host Documents**
  - Create simple website/landing page
  - Host Privacy Policy at `/privacy`
  - Host Terms of Service at `/terms`
  - Get URLs for store listings

- [ ] **In-App Links**
  - Add Privacy Policy link in Settings
  - Add Terms link in Settings
  - Show both during sign-up
  - Required checkbox for Terms acceptance

#### 3.4 Account Deletion

- [ ] **Implement Account Deletion**
  - Settings option to delete account
  - Confirmation dialog with consequences
  - Delete user data from Supabase
  - This is REQUIRED by both stores

### Why It Matters
- Both stores REQUIRE Privacy Policy URL
- Apple requires account deletion option
- Legal compliance protects you from liability
- Missing this = immediate rejection

### Deliverables
- [ ] Privacy Policy document
- [ ] Terms of Service document
- [ ] Hosted URLs for both
- [ ] In-app links to both
- [ ] Account deletion feature

### Owner(s)
- **Primary**: Legal / Product
- **Backend**: Account deletion implementation
- **Web**: Hosting documents

### Dependencies
- Domain name / website for hosting
- Legal review (recommended but not blocking)

### Pitfalls to Avoid
- Generic templates that don't match your actual data use
- Forgetting to update when features change
- Not implementing actual account deletion
- Privacy labels that don't match policy

---

## 4. Permission Handling

### Objective
Implement proper permission request flows with priming screens that explain why permissions are needed.

### What Must Be Done

#### 4.1 Camera Permission (Scanner)

- [ ] **Permission Priming Screen**
  - Shown before system dialog
  - Explain: "Scan any coffee bag to instantly identify it"
  - Visual: Camera icon or illustration
  - CTA: "Enable Camera"
  - Skip option: "Maybe Later"

- [ ] **Permission Denied Handling**
  - Show alternative UI
  - Explain limitations
  - Deep link to Settings app
  - "Enable in Settings" button

- [ ] **Info.plist / Manifest**
  - NSCameraUsageDescription: "Coffee Social uses your camera to scan coffee bags and identify coffees instantly."
  - Android: CAMERA permission

#### 4.2 Photo Library Permission

- [ ] **Permission Priming** (when adding photo to review)
  - Explain: "Add photos of your coffee to your review"
  - Only request when user taps "Add Photo"

- [ ] **Android 13+ Handling**
  - Use READ_MEDIA_IMAGES (not READ_EXTERNAL_STORAGE)
  - Handle partial access

#### 4.3 Location Permission (Check-ins)

- [ ] **Permission Priming Screen**
  - Shown when user tries to check-in
  - Explain: "Check in at cafés to share where you're enjoying coffee"
  - Visual: Map pin illustration
  - CTA: "Enable Location"
  - Skip option: "Skip Check-in"

- [ ] **Permission Level Decision**
  - Use "When In Use" only (not "Always")
  - Consider COARSE vs FINE location

- [ ] **Denied Handling**
  - Allow manual café selection as fallback
  - Settings deep link

### Why It Matters
- Apps that request permissions without context get rejected
- Users deny permissions they don't understand
- Platform guidelines require just-in-time requests

### Deliverables
- [ ] Camera priming screen
- [ ] Location priming screen
- [ ] All Info.plist usage descriptions written
- [ ] Android manifest permissions correct
- [ ] Denied state handling for each permission

### Owner(s)
- **Primary**: iOS, Android
- **Design**: Priming screen designs

### Dependencies
- Auth complete (permissions requested in authenticated flows)

### Pitfalls to Avoid
- Requesting all permissions on app launch
- Vague usage descriptions ("to improve your experience")
- Not handling denied state
- Forgetting to test permission flows on real devices

---

# PHASE B: Core Feature Build

Build the differentiating features that make this a social coffee app.

---

## 5. Scanner Implementation

### Objective
Implement the core Scan → Identify → Review flow that differentiates Coffee Social.

### What Must Be Done

#### 5.1 Scanner Integration

- [ ] **Wire Scanner to Scan Screen**
  - Remove placeholder content
  - Integrate existing Scanner component
  - Full-screen camera view
  - Overlay with scanning frame
  - Flash/torch toggle

- [ ] **Barcode Detection**
  - Use expo-barcode-scanner
  - Detect common formats: EAN13, EAN8, UPC, QR
  - Debounce rapid detections

#### 5.2 Coffee Identification Strategy

- [ ] **Define Identification Approach**

  Option A: Barcode Lookup
  - Map barcodes to coffee database
  - Requires roasters to provide barcode mappings
  - High accuracy when matched
  - Poor coverage initially

  Option B: OCR + Fuzzy Match
  - Read text from bag
  - Match against coffee names, roasters
  - More complex, less accurate
  - Better coverage

  Option C: Manual Selection (MVP Recommended)
  - Scan triggers search
  - User selects from results
  - Fallback: Add new coffee

  **Recommendation**: Start with Option C for MVP

- [ ] **Match Results Screen**
  - Show top matches from scan
  - Search bar for refinement
  - "Add New Coffee" option
  - "Can't find it? Add manually"

#### 5.3 Add New Coffee Flow

- [ ] **New Coffee Form**
  - Required: Name, Roaster
  - Optional: Origin, Process, Roast Level, Tasting Notes
  - Photo capture from current scan
  - Barcode association

- [ ] **Roaster Selection**
  - Search existing roasters
  - Add new roaster inline
  - Prevent duplicates

#### 5.4 Scan → Review Bridge

- [ ] **Post-Scan CTA**
  - Primary: "Review This Coffee"
  - Secondary: "Add to Journal" (just log, no review)
  - Tertiary: "Save for Later"

- [ ] **Review Pre-Fill**
  - Coffee already selected
  - Brew date = today (editable)
  - Focus on rating and notes

### Why It Matters
- Scanner is the core differentiator you identified
- Scan → Review is the primary content creation mechanism
- Without this, app is just another coffee database

### Deliverables
- [ ] Working scanner with camera integration
- [ ] Coffee matching/selection flow
- [ ] Add new coffee form
- [ ] Scan → Review transition

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Coffee matching queries, new coffee creation
- **Design**: Scanner UI, matching flow

### Dependencies
- Phase A complete (auth, permissions)
- Camera permission flow done

### Pitfalls to Avoid
- Overcomplicating identification (start simple)
- Not handling scan failures gracefully
- Requiring too much info for new coffees
- Slow camera initialization

---

## 6. User Profiles & Social Graph

### Objective
Transform placeholder profile screens into functional user profiles with following capabilities.

### What Must Be Done

#### 6.1 Own Profile Screen

- [ ] **Profile Header**
  - Profile photo (with change option)
  - Display name
  - Username (@handle)
  - Bio (editable)
  - Stats: Reviews count, Following, Followers

- [ ] **Profile Content Tabs**
  - Reviews: User's coffee reviews
  - Journal: Coffee log entries
  - Check-ins: Café visits
  - Favorites: Saved coffees

- [ ] **Edit Profile**
  - Change photo (expo-image-picker)
  - Edit name, username, bio
  - Upload to Supabase Storage
  - Validation (unique username)

#### 6.2 Other User Profiles

- [ ] **View Other User** (`/user/[id]`)
  - Same layout as own profile
  - Follow/Unfollow button
  - No edit options
  - Same content tabs

- [ ] **Follow System**
  - Follow button with states: Follow, Following, Requested (if private)
  - Follower count updates
  - Following count updates
  - Query: `useToggleFollow(userId)`

#### 6.3 Social Discovery

- [ ] **Find Users**
  - Search by username
  - Suggested users (active reviewers)
  - User search in Discover tab

### Why It Matters
- Social features require visible profiles
- Following is foundation for personalized feed
- User investment (profile customization) drives retention

### Deliverables
- [ ] Functional Profile tab
- [ ] Other user profile screen
- [ ] Follow/unfollow functionality
- [ ] Edit profile flow
- [ ] User search

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Follow queries, user search, storage for photos
- **Design**: Profile layouts

### Dependencies
- Auth complete
- Supabase Storage configured for photos

### Pitfalls to Avoid
- Allowing duplicate usernames
- Not validating username format (@mentions must work)
- Heavy profile photos slowing load
- Not handling user not found

---

## 7. Social Feed

### Objective
Replace the generic coffee list with a personalized feed showing activity from followed users.

### What Must Be Done

#### 7.1 Feed Architecture

- [ ] **Feed Types**
  - Following Feed: Activity from people you follow
  - Discover Feed: Trending/popular activity
  - Toggle between them on Home

- [ ] **Activity Types**
  - New review from followed user
  - Check-in from followed user
  - New coffee added by followed user

#### 7.2 Feed Items

- [ ] **Review Activity Card**
  - User avatar, name, timestamp
  - Coffee being reviewed (linked)
  - Rating
  - Review snippet
  - Engagement: Like, Comment (v1.1?)

- [ ] **Check-in Activity Card**
  - User avatar, name, timestamp
  - Café name, location
  - Coffee if tagged
  - Photo if attached

#### 7.3 Feed Queries

- [ ] **Backend Query**
  ```sql
  -- Pseudo-query for feed
  SELECT activities.*
  FROM activities
  JOIN follows ON activities.user_id = follows.following_id
  WHERE follows.follower_id = current_user_id
  ORDER BY created_at DESC
  LIMIT 20 OFFSET ?
  ```

- [ ] **Pagination**
  - Infinite scroll with cursor pagination
  - Pull-to-refresh

#### 7.4 Empty States

- [ ] **No Following Yet**
  - "Follow coffee lovers to see their activity"
  - Suggested users to follow
  - Link to Discover

### Why It Matters
- This transforms the app from database to social platform
- Personalized feed drives engagement
- Core social media behavior

### Deliverables
- [ ] Following feed implementation
- [ ] Discover/trending feed
- [ ] Activity cards (review, check-in)
- [ ] Pagination
- [ ] Empty states

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Feed queries (may need optimization)
- **Design**: Activity card designs

### Dependencies
- User profiles complete
- Follow system working

### Pitfalls to Avoid
- N+1 query problems (fetch user data efficiently)
- No pagination (feed grows forever)
- Showing content from blocked users (future consideration)

---

## 8. Coffee Journal

### Objective
Implement personal coffee logging so users can track their coffee journey.

### What Must Be Done

#### 8.1 Journal Data Model

- [ ] **Journal Entry Schema**
  ```
  journal_entries:
    id, user_id, coffee_id,
    brew_date, brew_method,
    rating (optional),
    notes (optional),
    photo_url (optional),
    created_at
  ```

- [ ] **Differentiate from Reviews**
  - Review = Public, for others to see
  - Journal = Private (or optionally public), personal log

#### 8.2 Journal Entry Creation

- [ ] **Entry Flow**
  - From Scan → "Add to Journal"
  - From Coffee Detail → "Log This Coffee"
  - From Journal → "Quick Add"

- [ ] **Entry Form**
  - Coffee (pre-filled if from scan)
  - Date/time
  - Brew method
  - Quick rating (optional)
  - Personal notes
  - Photo (optional)

#### 8.3 Journal View

- [ ] **Journal Screen** (Profile tab → Journal section)
  - Chronological list
  - Filter by: Date range, Coffee, Brew method
  - Stats: Total coffees logged, favorite brew method

- [ ] **Calendar View** (Optional for V1)
  - Visual calendar showing brew days
  - Tap day → see entries

#### 8.4 Journal Entry Detail

- [ ] **View Entry**
  - All logged info
  - Link to coffee detail
  - Edit/Delete options

### Why It Matters
- Personal tracking drives daily engagement
- Coffee enthusiasts want to remember what they tried
- Builds data for future recommendations

### Deliverables
- [ ] Journal schema and queries
- [ ] Add to journal flow
- [ ] Journal list view
- [ ] Entry detail view

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Journal schema, queries
- **Design**: Journal UI

### Dependencies
- Scanner complete (primary entry point)
- Coffee detail pages working

### Pitfalls to Avoid
- Overcomplicating journal entry
- Not making it fast to log
- Missing edit/delete functionality
- No empty state guidance

---

## 9. Café Check-ins

### Objective
Allow users to check in at cafés and share where they're enjoying coffee.

### What Must Be Done

#### 9.1 Check-in Data Model

- [ ] **Check-in Schema**
  ```
  check_ins:
    id, user_id, cafe_id,
    coffee_id (optional),
    note (optional),
    photo_url (optional),
    latitude, longitude,
    created_at

  cafes:
    id, name, address,
    latitude, longitude,
    google_place_id,
    created_by, created_at
  ```

#### 9.2 Check-in Flow

- [ ] **Trigger Points**
  - Dedicated check-in button
  - Quick action from scan (if at a café)

- [ ] **Location Detection**
  - Get current location
  - Find nearby cafés
  - Let user select or search

- [ ] **Check-in Form**
  - Café selected/confirmed
  - Coffee (optional - what are you drinking?)
  - Photo (optional)
  - Note (optional)

#### 9.3 Café Database

- [ ] **Café Sources**
  - User-added cafés
  - Integration consideration: Google Places API

- [ ] **Add New Café**
  - Name
  - Address / location
  - Photo (optional)

#### 9.4 Check-in Display

- [ ] **On User Profile**
  - Check-ins tab
  - Map view of check-in history

- [ ] **In Feed**
  - Check-in activity cards
  - Café linked

### Why It Matters
- Location-based social (Swarm/Untappd model) drives engagement
- Shared experiences at places create community
- Discovery of new cafés through friends

### Deliverables
- [ ] Check-in schema and queries
- [ ] Check-in flow with location
- [ ] Café database and creation
- [ ] Check-in display in profile and feed

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Check-in/café schema
- **Design**: Check-in flow UI

### Dependencies
- Location permission flow
- Feed implemented (to show check-ins)

### Pitfalls to Avoid
- Requiring exact location match
- Making check-in take too many steps
- Not allowing offline queuing
- Heavy map usage draining battery

---

# PHASE C: Platform Readiness

Ensure the app is stable, performant, and polished.

---

## 10. UX/UI Audit & Fixes

### Objective
Audit the complete app against platform guidelines and ensure cross-platform consistency.

### What Must Be Done

#### 10.1 Apple Human Interface Guidelines Audit

- [ ] **Navigation**
  - Tab bar follows HIG (max 5 tabs, clear icons)
  - Navigation titles present
  - Back buttons work correctly

- [ ] **Typography**
  - Dynamic Type support (scalable fonts)
  - Minimum 11pt for legible text

- [ ] **Touch Targets**
  - Minimum 44x44pt for all tappable elements
  - Adequate spacing between targets

- [ ] **Safe Areas**
  - Content respects notch, home indicator
  - No UI under status bar content

- [ ] **iOS-Specific Patterns**
  - Pull-to-refresh where appropriate
  - Swipe gestures (swipe to delete in lists)
  - Haptic feedback on actions

#### 10.2 Material Design 3 Audit

- [ ] **Navigation**
  - Bottom navigation follows MD3
  - FAB placement if used

- [ ] **Components**
  - Proper elevation and shadows
  - Ripple effects on touch

- [ ] **Touch Targets**
  - Minimum 48x48dp

- [ ] **Android-Specific Patterns**
  - Back button handling
  - System navigation compatibility

#### 10.3 Cross-Platform Consistency

- [ ] **Visual Consistency**
  - Same colors, fonts, spacing
  - Platform-appropriate component variants

- [ ] **Feature Parity**
  - All features work on both platforms
  - Same user flows

- [ ] **Performance Parity**
  - Similar load times
  - Similar animation smoothness

#### 10.4 Fix Identified Issues

- [ ] **Placeholder Screen Removal**
  - Roaster detail: Wire to real data
  - User detail: Wire to real data
  - Any remaining hardcoded content

- [ ] **Dead-End Elimination**
  - All buttons must do something
  - All links must navigate somewhere
  - Error states show recovery actions

### Why It Matters
- Platform-native feel drives user trust
- HIG/MD3 violations look "off" to users
- Cross-platform consistency reduces QA burden

### Deliverables
- [ ] HIG audit checklist completed
- [ ] MD3 audit checklist completed
- [ ] All placeholder screens completed
- [ ] All dead-ends fixed

### Owner(s)
- **Primary**: Design (audit), iOS, Android (fixes)
- **QA**: Verification

### Dependencies
- Core features complete (something to audit)

### Pitfalls to Avoid
- Ignoring platform conventions
- Over-customizing standard components
- Different behavior per platform without reason

---

## 11. Performance & Stability Hardening

### Objective
Ensure the app is fast, stable, and doesn't drain battery.

### What Must Be Done

#### 11.1 Performance Measurement

- [ ] **Cold Start Time**
  - Target: < 3 seconds to interactive
  - Measure with Flipper/React DevTools
  - Identify slow initialization

- [ ] **Screen Load Times**
  - Target: < 1 second for cached data
  - Identify slow queries

- [ ] **Memory Usage**
  - Profile with platform tools
  - Identify memory leaks

#### 11.2 Optimization

- [ ] **Image Optimization**
  - Use expo-image for caching
  - Appropriate image sizes (don't load full-res for thumbnails)
  - Progressive loading / blurhash

- [ ] **List Performance**
  - FlatList optimization (keyExtractor, getItemLayout)
  - Image recycling in lists
  - Avoid re-renders

- [ ] **Bundle Size**
  - Analyze bundle with Metro
  - Remove unused dependencies
  - Code splitting if needed

#### 11.3 Stability

- [ ] **Error Boundaries**
  - Wrap screens in error boundaries
  - Graceful fallback UI
  - Error reporting

- [ ] **Network Resilience**
  - Timeout handling
  - Retry logic for transient failures
  - Offline indicator

- [ ] **Memory Management**
  - Clean up camera when leaving scan screen
  - Dispose map views when not visible

#### 11.4 Battery Optimization

- [ ] **Camera**
  - Only active when scan screen visible
  - Release resources on blur

- [ ] **Location**
  - Stop updates when not needed
  - Use appropriate accuracy level

### Why It Matters
- Slow apps get uninstalled
- Crashes tank ratings
- Battery drain causes complaints

### Deliverables
- [ ] Performance benchmarks documented
- [ ] Optimizations implemented
- [ ] Error boundaries in place
- [ ] Battery optimization verified

### Owner(s)
- **Primary**: iOS, Android
- **QA**: Testing and verification

### Dependencies
- Feature complete (optimize final code)

### Pitfalls to Avoid
- Premature optimization (measure first)
- Ignoring Android low-end devices
- Not testing on real devices

---

## 12. Analytics Integration

### Objective
Implement analytics to understand user behavior and app health.

### What Must Be Done

#### 12.1 Analytics Provider Selection

- [ ] **Choose Provider**
  - Options: Mixpanel, Amplitude, PostHog, Firebase Analytics
  - Considerations: Privacy, cost, features
  - Recommendation: PostHog (privacy-focused, self-hostable)

#### 12.2 Event Implementation

- [ ] **Core Events**
  - App Open
  - Screen View (all screens)
  - Sign Up Completed
  - Sign In Completed
  - Scan Initiated
  - Scan Completed
  - Review Created
  - Journal Entry Created
  - Check-in Created
  - Follow User
  - Coffee Viewed

- [ ] **Funnel Events**
  - Onboarding Step (1, 2, 3...)
  - Onboarding Completed
  - First Scan
  - First Review
  - First Follow

#### 12.3 Crash Monitoring

- [ ] **Integrate Crash Reporter**
  - Options: Sentry, Crashlytics, Bugsnag
  - Recommendation: Sentry (great RN support)

- [ ] **Configure**
  - Source maps upload for readable stack traces
  - Breadcrumbs for user journey
  - Performance monitoring

#### 12.4 Privacy Compliance

- [ ] **ATT Integration** (if using tracking)
  - Show ATT prompt after onboarding
  - Respect user choice
  - Document in Privacy Policy

- [ ] **Consent for EU**
  - Consent dialog before analytics
  - Honor consent choice

### Why It Matters
- Can't improve what you don't measure
- Crash visibility enables fast fixes
- Funnels identify drop-off points

### Deliverables
- [ ] Analytics SDK integrated
- [ ] Core events implemented
- [ ] Crash monitoring active
- [ ] Privacy compliance verified

### Owner(s)
- **Primary**: iOS, Android
- **Backend**: Analytics backend if self-hosted
- **Product**: Event specifications

### Dependencies
- Auth complete (identify users)
- ATT/consent flows if required

### Pitfalls to Avoid
- Tracking everything (focus on actionable metrics)
- Not documenting in Privacy Policy
- Identifying users without consent

---

## 13. Error Handling & Edge Cases

### Objective
Handle all error states and edge cases gracefully.

### What Must Be Done

#### 13.1 Network Errors

- [ ] **No Connection**
  - Banner indicating offline
  - Cache available data
  - Queue mutations for retry

- [ ] **API Errors**
  - Distinguish error types (auth, server, client)
  - User-friendly messages
  - Retry buttons

- [ ] **Timeout Handling**
  - Reasonable timeouts
  - Retry option
  - Don't hang indefinitely

#### 13.2 Auth Edge Cases

- [ ] **Session Expiry**
  - Detect expired token
  - Attempt silent refresh
  - Prompt re-auth if refresh fails

- [ ] **Account Issues**
  - Email not verified
  - Account disabled
  - Password reset required

#### 13.3 Content Edge Cases

- [ ] **Empty States**
  - Empty feed: Suggest follows
  - Empty journal: Prompt first scan
  - Empty search results: Suggest adjustments
  - No reviews: Prompt first review

- [ ] **Not Found**
  - Coffee deleted: Graceful message
  - User deleted: Graceful message
  - Deep link to invalid ID: Handle gracefully

#### 13.4 Scanner Edge Cases

- [ ] **Camera Errors**
  - Permission denied: Clear guidance
  - Camera unavailable: Fallback to manual

- [ ] **Scan Failures**
  - Nothing detected: Prompt manual entry
  - Low light: Suggest lighting adjustment

#### 13.5 Input Validation

- [ ] **Form Validation**
  - Email format
  - Password requirements
  - Username rules (@, no spaces)
  - Required fields

- [ ] **Character Limits**
  - Bio length
  - Review length
  - Username length

### Why It Matters
- Unhandled errors = poor reviews
- Edge cases are what real users hit
- Graceful handling = professional feel

### Deliverables
- [ ] All network errors handled
- [ ] All auth edge cases handled
- [ ] All empty states designed
- [ ] All form validation in place

### Owner(s)
- **Primary**: iOS, Android
- **Design**: Empty state and error designs
- **QA**: Edge case testing

### Dependencies
- Features complete

### Pitfalls to Avoid
- Generic error messages
- Not testing offline
- Assuming happy path

---

# PHASE D: Store Preparation

Prepare everything needed for successful submission.

---

## 14. Store Assets & Metadata

### Objective
Create all assets and metadata required for App Store Connect and Google Play Console.

### What Must Be Done

#### 14.1 App Icon

- [ ] **iOS App Icon**
  - 1024x1024 PNG (no transparency)
  - No alpha channel
  - Export all required sizes

- [ ] **Android Adaptive Icon**
  - 512x512 for Play Store
  - Foreground and background layers
  - Test on different device launchers

#### 14.2 Screenshots

- [ ] **iOS Screenshots**
  - 6.7" (iPhone 14 Pro Max) - Required
  - 6.5" (iPhone 14 Plus) - Required
  - 5.5" (iPhone 8 Plus) - Required if supporting
  - iPad (if universal app)
  - Up to 10 per device size

- [ ] **Android Screenshots**
  - Phone screenshots (min 2, max 8)
  - 7" tablet (if supporting)
  - 10" tablet (if supporting)

- [ ] **Screenshot Content**
  - Highlight key features: Scan, Review, Feed, Journal
  - Real app content (not mockups)
  - Text overlays explaining features
  - Consistent visual style

#### 14.3 App Store Text

- [ ] **App Name**: "Coffee Social" (or final name)
  - iOS: 30 characters max
  - Android: 50 characters max

- [ ] **Subtitle** (iOS only)
  - 30 characters max
  - "Discover & Review Specialty Coffee"

- [ ] **Short Description** (Android)
  - 80 characters max
  - One compelling sentence

- [ ] **Full Description**
  - 4000 characters max
  - Key features with bullet points
  - Social proof if available
  - Call to action

- [ ] **Keywords** (iOS)
  - 100 characters max
  - Research competitor keywords
  - "coffee, specialty coffee, barista, coffee review, coffee journal, café finder"

- [ ] **Promotional Text** (iOS)
  - 170 characters max
  - Can be updated without review

#### 14.4 Additional Requirements

- [ ] **Feature Graphic** (Android)
  - 1024x500 PNG or JPG
  - Banner image for store listing

- [ ] **Support URL**
  - Email or website for support
  - Must be accessible

- [ ] **Privacy Policy URL**
  - Live, accessible URL

- [ ] **Category Selection**
  - Primary: Food & Drink or Social Networking
  - Secondary: Lifestyle

#### 14.5 Content Rating

- [ ] **iOS Content Rating**
  - Answer questionnaire accurately
  - User-generated content consideration

- [ ] **Android Content Rating**
  - IARC questionnaire
  - Accurate answers for regional ratings

### Why It Matters
- Missing assets = can't submit
- Poor screenshots = poor conversion
- Inaccurate ratings = rejection

### Deliverables
- [ ] App icon (all sizes)
- [ ] Screenshots (all required sizes)
- [ ] All text copy finalized
- [ ] URLs live and accessible

### Owner(s)
- **Primary**: Design (visuals), Marketing (copy)
- **Product**: Final approval

### Dependencies
- App feature complete (real screenshots)

### Pitfalls to Avoid
- Screenshots with placeholder content
- Icon with transparency (iOS rejects)
- Copying competitor descriptions
- Incorrect content ratings

---

## 15. Beta Testing (TestFlight & Internal Track)

### Objective
Distribute beta builds to gather feedback and catch issues before public launch.

### What Must Be Done

#### 15.1 TestFlight Setup (iOS)

- [ ] **Apple Developer Account**
  - Enroll in Apple Developer Program ($99/year)
  - Configure App Store Connect

- [ ] **App Creation**
  - Create app in App Store Connect
  - Bundle ID matching app
  - Basic metadata

- [ ] **TestFlight Configuration**
  - Add internal testers (team)
  - Create external testing group
  - Beta App Information
  - Beta App Review (for external)

#### 15.2 Google Play Internal/Closed Testing

- [ ] **Google Play Console Account**
  - Pay $25 one-time fee
  - Complete developer profile

- [ ] **App Creation**
  - Create app in Play Console
  - Package name matching

- [ ] **Testing Tracks**
  - Internal testing (team, no review)
  - Closed testing (invited users, needs review)
  - Set up test user emails

#### 15.3 Build Distribution

- [ ] **EAS Build Setup**
  - Configure eas.json
  - Production credentials
  - Build profiles (development, preview, production)

- [ ] **iOS Build**
  ```bash
  eas build --platform ios --profile preview
  ```

- [ ] **Android Build**
  ```bash
  eas build --platform android --profile preview
  ```

- [ ] **Submit to Test Tracks**
  - iOS: Submit to TestFlight
  - Android: Upload to internal track

#### 15.4 Beta Feedback Collection

- [ ] **Feedback Mechanism**
  - In-app feedback option
  - TestFlight native feedback
  - Google Play feedback
  - Direct survey link

- [ ] **Tester Communication**
  - What to test
  - Known issues
  - Feedback expectations

### Why It Matters
- Real device testing catches issues
- User feedback improves product
- TestFlight review prepares for App Store review

### Deliverables
- [ ] TestFlight beta live
- [ ] Google Play internal track live
- [ ] Testers onboarded
- [ ] Feedback process established

### Owner(s)
- **Primary**: iOS, Android
- **Product**: Tester recruitment, feedback analysis

### Dependencies
- Developer accounts created
- App substantially complete

### Pitfalls to Avoid
- Starting TestFlight too late
- Not having real testers (just team)
- Ignoring feedback
- Beta builds with critical bugs

---

## 16. QA & Regression Testing

### Objective
Comprehensive testing to ensure quality before store submission.

### What Must Be Done

#### 16.1 Test Plan Creation

- [ ] **User Flow Tests**
  - Complete onboarding flow
  - Sign up (all methods)
  - Sign in (all methods)
  - Scan → Review → Feed flow
  - Profile editing
  - Following users
  - Journal entry creation
  - Check-in flow

- [ ] **Platform-Specific Tests**
  - iOS: All supported iPhone sizes, iPads if universal
  - Android: Various screen sizes, Android versions

- [ ] **Edge Case Tests**
  - All error states
  - Empty states
  - Offline mode
  - Permission denied states

#### 16.2 Device Testing Matrix

- [ ] **iOS Devices**
  - iPhone SE (smallest supported)
  - iPhone 14 (standard)
  - iPhone 14 Pro Max (largest)
  - iPad if universal

- [ ] **Android Devices**
  - Low-end device (test performance)
  - Mid-range (common user)
  - High-end flagship
  - Various Android versions (minimum supported to latest)

#### 16.3 Test Execution

- [ ] **Manual Testing**
  - Follow test plan
  - Document all issues
  - Retest fixes

- [ ] **Automated Tests** (if time permits)
  - Critical path E2E tests
  - Component unit tests

#### 16.4 Bug Triage

- [ ] **Priority Classification**
  - P0: Blocker (crash, data loss) - Must fix
  - P1: Critical (broken feature) - Must fix
  - P2: Major (bad UX) - Should fix
  - P3: Minor (cosmetic) - Nice to fix

- [ ] **Fix Verification**
  - All P0/P1 resolved
  - Most P2 resolved
  - P3 tracked for post-launch

### Why It Matters
- Store reviewers test manually
- Bugs cause rejection
- Quality affects ratings

### Deliverables
- [ ] Test plan document
- [ ] Test execution log
- [ ] Bug list with status
- [ ] All blockers resolved

### Owner(s)
- **Primary**: QA
- **iOS, Android**: Bug fixes

### Dependencies
- Feature complete
- Beta testing feedback incorporated

### Pitfalls to Avoid
- Testing only happy paths
- Single device testing
- Not re-testing fixes
- Launching with known blockers

---

## 17. Final Review Checklist

### Objective
Final verification that everything is ready for submission.

### What Must Be Done

#### 17.1 Apple App Store Checklist

- [ ] **Technical Requirements**
  - [ ] App launches without crash
  - [ ] All features functional
  - [ ] No placeholder content
  - [ ] Works on all supported iOS versions
  - [ ] Works on all supported devices

- [ ] **Sign in with Apple**
  - [ ] Implemented correctly
  - [ ] Uses official button style
  - [ ] At least as prominent as Google

- [ ] **Privacy**
  - [ ] Privacy Policy URL accessible
  - [ ] Privacy Nutrition Labels accurate
  - [ ] ATT implemented if tracking
  - [ ] Account deletion available

- [ ] **Content**
  - [ ] No placeholder content
  - [ ] No test/debug content
  - [ ] No offensive content

- [ ] **Metadata**
  - [ ] Name, subtitle, description complete
  - [ ] Keywords set
  - [ ] Screenshots uploaded
  - [ ] Support URL works
  - [ ] Privacy Policy URL works

- [ ] **Review Information**
  - [ ] Demo account credentials (if login required)
  - [ ] Notes for reviewer explaining features

#### 17.2 Google Play Checklist

- [ ] **Technical Requirements**
  - [ ] App launches without crash
  - [ ] All features functional
  - [ ] Target API level compliant
  - [ ] 64-bit support

- [ ] **Permissions**
  - [ ] All permissions justified
  - [ ] No unused permissions
  - [ ] Permission rationale strings set

- [ ] **Data Safety**
  - [ ] Form completed accurately
  - [ ] Matches actual data collection
  - [ ] Data deletion described

- [ ] **Content Rating**
  - [ ] IARC questionnaire complete
  - [ ] Accurate answers

- [ ] **Metadata**
  - [ ] All text complete
  - [ ] Screenshots uploaded
  - [ ] Feature graphic uploaded
  - [ ] Category selected

#### 17.3 Go/No-Go Decision

- [ ] **Go Criteria Met**
  - All P0/P1 bugs resolved
  - All checklist items passed
  - Legal documents live
  - Beta testing feedback addressed
  - Team sign-off

- [ ] **No-Go Triggers**
  - Any P0 bugs remaining
  - Missing required features
  - Legal documents not ready
  - Critical feedback unaddressed

### Why It Matters
- Checklists catch oversight
- Store reviewers use similar checklists
- Clear criteria prevent premature launch

### Deliverables
- [ ] Apple checklist completed
- [ ] Google checklist completed
- [ ] Go/No-Go decision documented
- [ ] Team sign-off

### Owner(s)
- **Primary**: Product, QA
- **All teams**: Sign-off

### Dependencies
- All previous phases complete

### Pitfalls to Avoid
- Rushing the checklist
- Ignoring "minor" failures
- Not getting team sign-off

---

# PHASE E: Launch

Execute the launch.

---

## 18. Store Submission

### Objective
Submit to both stores with coordinated timing.

### What Must Be Done

#### 18.1 Production Build

- [ ] **iOS Production Build**
  ```bash
  eas build --platform ios --profile production
  ```

- [ ] **Android Production Build**
  ```bash
  eas build --platform android --profile production
  ```

- [ ] **Build Verification**
  - Test production builds before submission
  - Verify signing correct
  - Verify version numbers

#### 18.2 iOS Submission

- [ ] **Submit via EAS**
  ```bash
  eas submit --platform ios
  ```
  Or upload via Transporter

- [ ] **App Store Connect**
  - Select build
  - Complete App Information
  - Add review notes
  - Submit for review

- [ ] **Export Compliance**
  - Answer encryption questions
  - Most apps: No encryption or exempt

#### 18.3 Android Submission

- [ ] **Submit via EAS**
  ```bash
  eas submit --platform android
  ```
  Or upload via Play Console

- [ ] **Play Console**
  - Promote to production track
  - Complete release notes
  - Submit for review

- [ ] **Staged Rollout** (Recommended)
  - Start at 10% rollout
  - Monitor crashes/feedback
  - Increase gradually

#### 18.4 Review Timeline

- [ ] **Expected Timelines**
  - Apple: 24-48 hours typical (can be longer)
  - Google: 1-3 days for first submission

- [ ] **Monitor Status**
  - Check daily for updates
  - Respond to rejection quickly if needed

### Why It Matters
- Correct submission avoids delays
- Coordinated timing for simultaneous launch

### Deliverables
- [ ] iOS app submitted
- [ ] Android app submitted
- [ ] Submission confirmation

### Owner(s)
- **Primary**: iOS, Android
- **Product**: Final sign-off

### Dependencies
- All checklists passed
- Go decision made

### Pitfalls to Avoid
- Submitting Friday afternoon (weekend reviews)
- Not having demo credentials ready
- Incomplete review notes

---

## 19. Launch Day Plan

### Objective
Coordinate launch activities and be ready for issues.

### What Must Be Done

#### 19.1 Approval Monitoring

- [ ] **Monitor Both Stores**
  - Check App Store Connect status
  - Check Play Console status
  - Ready to release when approved

#### 19.2 Coordinated Release

- [ ] **Release Strategy**
  - Option A: Release iOS and Android same time
  - Option B: Soft launch one platform first
  - Decide and document

- [ ] **Release Execution**
  - iOS: Click "Release This Version"
  - Android: Confirm production release

#### 19.3 Announcement

- [ ] **Marketing Coordination**
  - Social media posts ready
  - Email to waitlist (if any)
  - Press release (if applicable)

- [ ] **Store Optimization**
  - Monitor search ranking
  - Track store listing views

#### 19.4 War Room

- [ ] **Team Availability**
  - Engineering on standby
  - QA monitoring feedback
  - Support ready for inquiries

- [ ] **Communication Channels**
  - Slack channel for launch
  - Escalation paths clear

### Why It Matters
- Coordinated launch maximizes impact
- Ready team can respond to issues

### Deliverables
- [ ] Release executed on both platforms
- [ ] Announcements published
- [ ] Team in monitoring mode

### Owner(s)
- **Primary**: Product, Marketing
- **All teams**: On standby

### Dependencies
- Store approval received

### Pitfalls to Avoid
- Releasing one platform and forgetting the other
- No one monitoring after release
- Not having hotfix process ready

---

## 20. Post-Launch Monitoring & Hotfix Plan

### Objective
Monitor app health and be ready to respond to issues.

### What Must Be Done

#### 20.1 Health Monitoring

- [ ] **Crash Monitoring**
  - Sentry/Crashlytics dashboard
  - Alert thresholds set
  - < 1% crash-free rate = investigate

- [ ] **Analytics Dashboard**
  - Daily active users
  - Key funnels
  - Feature usage

- [ ] **User Feedback**
  - App store reviews
  - In-app feedback
  - Social media mentions

#### 20.2 Review Response

- [ ] **Monitor Reviews**
  - Check daily
  - Respond to negative reviews
  - Thank positive reviews

- [ ] **Common Issues**
  - Document frequently reported issues
  - Prioritize fixes

#### 20.3 Hotfix Process

- [ ] **Severity Levels**
  - P0 (Crash): Hotfix same day
  - P1 (Major Bug): Hotfix within 48 hours
  - P2 (Minor): Next regular release

- [ ] **Hotfix Procedure**
  1. Identify issue
  2. Create fix
  3. Test fix
  4. Build new version (increment build number)
  5. Submit for review (request expedited if critical)
  6. Deploy

#### 20.4 First Week Goals

- [ ] **Stability Target**
  - 99%+ crash-free sessions
  - No P0/P1 issues remaining

- [ ] **Engagement Targets**
  - Define success metrics
  - Monitor daily

### Why It Matters
- Early issues can tank ratings
- Fast response builds user trust
- Data informs iteration

### Deliverables
- [ ] Monitoring dashboards active
- [ ] Daily check-ins first week
- [ ] Hotfix process documented
- [ ] First week report

### Owner(s)
- **Primary**: Engineering, QA
- **Product**: Analysis and prioritization

### Dependencies
- Launch complete
- Monitoring tools configured

### Pitfalls to Avoid
- Not monitoring after launch
- Slow response to critical issues
- Ignoring user feedback

---

# Appendix: Quick Reference

## Critical Path (Blocking Items)

1. Authentication UI with Apple Sign-In
2. Privacy Policy + Terms hosted
3. Scanner functionality
4. Remove all placeholder screens
5. Store assets and metadata
6. Developer accounts
7. TestFlight/Internal Track testing
8. Final QA pass
9. Submit

## Team Responsibility Matrix

| Area | Product | Design | iOS | Android | Backend | QA | Legal |
|------|---------|--------|-----|---------|---------|-----|-------|
| Scope Lock | **O** | C | C | C | C | | |
| Auth UI | C | **O** | **O** | **O** | C | C | |
| Privacy Docs | C | | | | | | **O** |
| Scanner | C | **O** | **O** | **O** | C | C | |
| Social Features | C | **O** | **O** | **O** | **O** | C | |
| UX Audit | C | **O** | C | C | | **O** | |
| Performance | | | **O** | **O** | C | C | |
| Analytics | **O** | | C | C | C | | |
| Store Assets | C | **O** | | | | | |
| Submission | C | | **O** | **O** | | | |

**O** = Owner, **C** = Contributor

---

*Document generated as part of Coffee Social App launch preparation*
