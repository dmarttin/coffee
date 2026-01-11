# Phase 1: Problem Discovery & Risk Analysis

> **App**: Coffee Social - A social media platform for coffee discovery, scanning, reviews, and community
> **Current State**: Early MVP with basic discovery features working
> **Target**: Full social coffee app with scanner-driven content creation
> **Analysis Date**: January 2026

---

## Executive Summary of Critical Risks

| Risk Level | Category | Issue |
|------------|----------|-------|
| **CRITICAL** | Store Review | No authentication UI - app will be rejected |
| **CRITICAL** | Core Feature | Scanner not functional - core value prop missing |
| **CRITICAL** | Store Review | No Privacy Policy or Terms of Service |
| **CRITICAL** | Store Review | Apple Sign-In required but not implemented |
| **HIGH** | Product | Social features (following, feed, journal) don't exist |
| **HIGH** | UX | No onboarding flow for new users |
| **HIGH** | Privacy | No ATT implementation for tracking |
| **HIGH** | Store Review | No Data Safety / Privacy Nutrition Labels |
| **MEDIUM** | Technical | Camera permissions requested without graceful fallbacks |
| **MEDIUM** | UX | Profile/Roaster screens are non-functional placeholders |
| **MEDIUM** | Performance | No offline support - app unusable without network |

---

## 1. Product & UX Risks

### 1.1 Unclear Core Value Proposition
**Status**: PARTIALLY AT RISK

**Current State**:
- App positions as discovery tool (search/filter coffees)
- Vision is social media for coffee

**Gaps**:
- [ ] No clear "aha moment" in first session
- [ ] Scanner (core differentiator) is non-functional
- [ ] Social features completely missing
- [ ] No explanation of what makes this different from Yelp/Untappd

**Impact**: Users will download, see a basic coffee database, and churn immediately.

**Recommendations**:
1. Define the 3-step "first session success" journey
2. Implement scanner as primary content creation mechanism
3. Add social proof (activity feed) to home screen
4. Create compelling onboarding that shows social value

---

### 1.2 Feature Gap: Vision vs Reality

**Vision (What You Want)**:
- Scan → Review flow as primary content mechanism
- Following users + personalized social feed
- Coffee journal/logging personal history
- Check-ins at cafés
- Photo sharing

**Reality (What Exists)**:
- Static coffee database with search
- Review submission (requires auth that doesn't exist)
- Basic coffee detail pages

**Critical Missing Features**:

| Feature | Backend Ready? | UI Ready? | Effort |
|---------|---------------|-----------|--------|
| Authentication | ✅ Supabase Auth | ❌ No UI | Medium |
| Scanner Integration | ❌ Not wired | ⚠️ Component exists | High |
| User Profiles | ✅ Schema exists | ❌ Placeholder | Medium |
| Following System | ✅ Schema exists | ❌ Not built | Medium |
| Social Feed | ❌ No query | ❌ Not built | High |
| Coffee Journal | ❌ No schema | ❌ Not built | High |
| Café Check-ins | ❌ No schema | ❌ Not built | High |
| Photo Sharing | ⚠️ Image picker ready | ❌ Not built | Medium |

---

### 1.3 UX Inconsistencies

**Issues Identified**:

1. **Dead-End Screens**
   - Profile tab shows stats (0s) but no way to create content
   - Roaster detail page is hardcoded placeholder
   - User detail page is hardcoded placeholder

2. **Broken User Journeys**
   - Can't sign in (no UI) → Can't review → Core loop broken
   - Scan tab has buttons that do nothing
   - "Sign In" button on Profile does nothing

3. **Navigation Confusion**
   - Four tabs but only 2 are functional (Home, Discover)
   - Users will tap Scan/Profile and find dead ends

4. **Empty States Missing**
   - No guidance when journal is empty
   - No prompt to scan first coffee
   - No onboarding for new users

---

### 1.4 Onboarding & First-Time User Experience

**Current State**: NONE

**Risks**:
- [ ] No explanation of app purpose
- [ ] No account creation prompt
- [ ] No permission priming for camera/location
- [ ] No guided first action (scan your first coffee)
- [ ] No value demonstration before asking for commitment

**Store Review Risk**: Apps that request permissions without context get rejected.

**Recommended Onboarding Flow**:
```
1. Welcome screen - What is this app?
2. Value prop carousel (3 slides max)
3. Create account OR browse as guest
4. If account created → Permission priming for camera
5. Guided first scan with overlay instructions
6. Success celebration + prompt to follow users
```

---

### 1.5 Accessibility Gaps

**Current Assessment**: MODERATE RISK

**Good**:
- Using React Native accessibility props in some components
- Button component has `accessible` and `accessibilityLabel`

**Missing/Unknown**:
- [ ] No Dynamic Type support verified (iOS)
- [ ] No font scaling tested
- [ ] TalkBack/VoiceOver not tested
- [ ] Color contrast not audited (coffee browns may fail)
- [ ] Touch targets may be too small (minimum 44x44pt iOS, 48x48dp Android)
- [ ] No accessibility labels on icons
- [ ] RatingStars component (rotated squares) may confuse screen readers

**Store Risk**: Apple increasingly rejects apps with accessibility issues. Google Play's Data Safety requires disclosure.

---

## 2. User Journey Risks

### 2.1 Account Creation / Login Friction

**Critical Gap**: NO AUTHENTICATION UI EXISTS

**Current State**:
- Supabase Auth configured
- `useSession()` hook ready
- Secure storage for tokens ready
- NO sign-in screens
- NO sign-up screens
- NO social auth buttons

**Required for Launch**:
- [ ] Email/password sign-up flow
- [ ] Email/password sign-in flow
- [ ] Apple Sign-In (REQUIRED by Apple if you have any social login)
- [ ] Google Sign-In
- [ ] Forgot password flow
- [ ] Email verification flow
- [ ] Error handling (invalid email, weak password, account exists)
- [ ] Loading states during auth

**Apple Store Risk**: **REJECTION GUARANTEED** if Apple Sign-In not implemented when Google Sign-In exists.

---

### 2.2 Permissions Requested Too Early

**Current Risk**: HIGH

**Permissions Your App Uses**:
- Camera (for scanner)
- Location (for café check-ins, roaster maps)
- Photo Library (for photo sharing)
- Notifications (configured in app.json)

**Current Implementation**:
- Scanner component requests camera permission on mount
- No permission priming screens
- No explanation of why permission is needed
- No fallback UI if permission denied

**Store Review Risk**:
- Apple rejects apps that request permissions without clear purpose
- Apple requires NSCameraUsageDescription, NSLocationWhenInUseUsageDescription with compelling copy
- Android 13+ requires granular media permissions

**Recommended Flow**:
```
1. User taps "Scan" tab first time
2. Show priming screen: "To scan coffee bags, we need camera access"
3. Show benefits: "Instantly identify any coffee by scanning the bag"
4. CTA: "Enable Camera"
5. THEN trigger system permission dialog
6. If denied: Show settings deep link, explain limitations
```

---

### 2.3 Navigation & Information Architecture

**Current Structure**:
```
Tabs:
├── Home (Feed) ✅ Working
├── Discover ✅ Working
├── Scan ❌ Placeholder
└── Profile ❌ Placeholder

Routes:
├── /coffee/[id] ✅ Working
├── /roaster/[id] ❌ Placeholder
└── /user/[id] ❌ Placeholder
```

**Problems**:

1. **Tab Order**: Scan should be center tab (primary action) but it's 3rd
2. **Dead Routes**: 2 of 4 tabs lead to non-functional screens
3. **Missing Routes**:
   - /settings
   - /auth/sign-in
   - /auth/sign-up
   - /auth/forgot-password
   - /journal
   - /check-in
   - /notifications
   - /search/users
   - /edit-profile

4. **Social Feed Missing**: Home shows all coffees, not personalized following feed

---

### 2.4 Offline & Low-Connectivity Scenarios

**Current State**: NO OFFLINE SUPPORT

**Behaviors**:
- App makes Supabase calls on every screen
- No data caching beyond React Query defaults
- No offline indicator
- Network errors show generic error
- No retry mechanisms visible to user

**Risks**:
- App unusable in coffee shops with bad WiFi
- Scanning in areas without connectivity fails silently
- Users lose drafted reviews if connection drops

**Recommendations**:
1. Implement React Query persistence (AsyncStorage)
2. Add offline banner indicator
3. Queue reviews/check-ins for later sync
4. Cache scanned coffee data locally
5. Add graceful error states with retry

---

## 3. Technical & Architecture Risks

### 3.1 iOS vs Android Feature Parity

**Current Assessment**: UNKNOWN - Testing Required

**Potential Issues**:
- React Native Maps behaves differently per platform
- Camera APIs have platform-specific quirks
- Apple Sign-In is iOS-native, different flow on Android
- Push notification tokens differ per platform
- Deep linking configuration differs

**Required Testing**:
- [ ] Test all screens on both platforms
- [ ] Verify map functionality on Android
- [ ] Test scanner on both platforms
- [ ] Verify social auth flows on both
- [ ] Check gesture handling consistency

---

### 3.2 Scanner Technical Debt

**Current State**:
- `Scanner.tsx` component exists with expo-barcode-scanner
- Scan screen (`scan.tsx`) does NOT use Scanner component
- No OCR implementation for reading coffee bag text
- No coffee identification/matching logic
- No fallback for unrecognized coffees

**Technical Decisions Needed**:

1. **Barcode vs OCR vs Both?**
   - Barcode: Easy, but most coffee bags don't have scannable codes
   - OCR: Complex, requires ML model or API
   - Manual entry fallback: Required regardless

2. **Coffee Matching Strategy**:
   - Match against existing database?
   - Allow users to add new coffees?
   - What if scan doesn't match anything?

3. **Offline Scanning**:
   - Can scanning work offline?
   - Cache coffee database locally?

---

### 3.3 API & Backend Bottlenecks

**Current Supabase Usage**:
- Direct client queries (no API abstraction)
- No rate limiting visible
- No error boundaries
- Queries in components (not centralized)

**Scaling Concerns**:
- Social feed will require complex queries (following relationships)
- Real-time features (notifications) not implemented
- Image uploads for photos will need storage limits
- No pagination visible in feed queries

**Recommendations**:
1. Add pagination to all list queries
2. Implement Supabase Realtime for notifications
3. Set up Supabase Storage for user photos
4. Add query error boundaries
5. Consider Edge Functions for complex operations

---

### 3.4 Release Management Risks

**Current State**:
- No version management visible
- No app.json version bumping
- No build scripts
- No environment separation (dev/staging/prod)

**Required for Launch**:
- [ ] Semantic versioning in app.json
- [ ] Build number auto-increment
- [ ] EAS Build configuration
- [ ] Environment-specific Supabase projects
- [ ] Release branch strategy

---

### 3.5 CI/CD & Build Pipeline

**Current State**: NONE VISIBLE

**Required**:
- [ ] EAS Build setup for iOS/Android
- [ ] Automated testing on PR
- [ ] TypeScript type checking in CI
- [ ] Lint checks
- [ ] Build verification before merge
- [ ] TestFlight deployment automation
- [ ] Play Store internal track automation

---

## 4. Performance & Stability Risks

### 4.1 Cold Start Time

**Current Risk**: UNKNOWN - Not Measured

**Factors**:
- Expo Router initialization
- React Query setup
- Supabase client initialization
- Initial data fetch

**Recommendations**:
1. Measure cold start with Flipper
2. Defer non-critical initialization
3. Add splash screen with proper duration
4. Optimize initial bundle size

---

### 4.2 Memory Usage

**Potential Issues**:
- FlatList with images may not virtualize properly
- Camera preview may leak memory
- Map with many markers can be heavy
- No image caching strategy visible

---

### 4.3 Battery Drain

**Risk Areas**:
- Camera kept active on Scan tab
- Location tracking for check-ins
- Map rendering with live updates

**Recommendations**:
1. Only activate camera when scan screen focused
2. Use significant location changes, not continuous
3. Lazy-load maps when visible

---

### 4.4 Network Error Handling

**Current State**: BASIC

**Gaps**:
- Generic "Error fetching" messages
- No retry buttons on failures
- No differentiation between errors (network vs server vs auth)
- No timeout handling

---

### 4.5 Crash-Prone Flows

**Identified Risks**:
1. Scanner with denied camera permissions
2. Map with no location permission
3. Review submission when session expired
4. Deep link to non-existent coffee ID
5. Image loading failures

---

## 5. Privacy, Security & Compliance Risks

### 5.1 Apple App Tracking Transparency (ATT)

**Current State**: NOT IMPLEMENTED

**Requirements**:
- If you collect ANY data that can be used for tracking, you need ATT
- Supabase Analytics? Third-party SDKs? Need to audit

**Questions to Answer**:
1. Are you using any analytics SDKs?
2. Does Supabase collect any identifiers?
3. Any advertising SDKs planned?

**If Yes to Any**: Implement ATT prompt with clear explanation.

**Store Risk**: Apple WILL reject if ATT required but not implemented.

---

### 5.2 Android Permission Model

**Permissions Needed**:
```xml
CAMERA - For scanning
ACCESS_FINE_LOCATION - For check-ins (consider COARSE instead)
READ_EXTERNAL_STORAGE - For photo selection (Android 12-)
READ_MEDIA_IMAGES - For photo selection (Android 13+)
POST_NOTIFICATIONS - For push (Android 13+)
```

**Risks**:
- Android 13+ requires POST_NOTIFICATIONS runtime permission
- Android 13+ changed storage permissions significantly
- Must handle permission rationale dialogs

---

### 5.3 Privacy Policy & Terms of Service

**Current State**: NONE EXIST

**CRITICAL**: Both stores REQUIRE Privacy Policy URL

**Must Include**:
- What data you collect (account info, location, photos, coffee preferences)
- How you use the data
- Third-party sharing (Supabase, analytics)
- Data retention
- User rights (deletion, export)
- Contact information
- GDPR compliance if EU users
- CCPA compliance if California users

**Deliverables Needed**:
- [ ] Privacy Policy document
- [ ] Terms of Service document
- [ ] Hosted URLs for both (website needed)
- [ ] In-app links to both in Settings

---

### 5.4 Privacy Labels (Apple) & Data Safety (Google)

**Apple Privacy Nutrition Label Requirements**:
Must declare:
- Data collected (email, name, photos, location, usage data)
- Data linked to identity
- Data used for tracking
- Data sharing with third parties

**Google Play Data Safety Requirements**:
Must declare:
- Data types collected
- Data sharing practices
- Security practices
- Data deletion capability

**Store Risk**: REJECTION if labels don't match actual app behavior.

---

### 5.5 Data Storage Security

**Current Assessment**: MODERATE

**Good**:
- Using Expo Secure Store for auth tokens
- Supabase handles password hashing

**Concerns**:
- Supabase anon key in code (acceptable but should be env var)
- No Row Level Security verification
- User uploaded photos - access control?

**Recommendations**:
1. Audit Supabase RLS policies
2. Ensure photos are private by default
3. Add option to delete account and all data

---

### 5.6 GDPR / Consent Handling

**If Targeting EU Users**:
- [ ] Cookie/tracking consent before any analytics
- [ ] Right to data export
- [ ] Right to deletion ("right to be forgotten")
- [ ] Age verification (if minors restricted)
- [ ] Data Processing Agreement with Supabase

---

## 6. Store Review & Policy Risks

### 6.1 Apple App Store Review Guidelines - Specific Risks

| Guideline | Risk | Status |
|-----------|------|--------|
| 1.1 App Completeness | Placeholder screens will cause rejection | HIGH RISK |
| 2.1 App Completeness | Must be fully functional, no dead ends | HIGH RISK |
| 4.0 Design - Sign in with Apple | REQUIRED if Google Sign-In present | CRITICAL |
| 4.2 Minimum Functionality | Must be useful, not just a database | MEDIUM RISK |
| 5.1.1 Data Collection | Privacy policy required, accurate labels | HIGH RISK |
| 5.1.2 Data Use and Sharing | Must match Privacy Nutrition Labels | HIGH RISK |

**Specific Rejection Triggers**:
1. Profile tab showing "Sign In" button that does nothing
2. Scan tab with non-functional camera button
3. Roaster/User detail pages with hardcoded placeholder text
4. No Apple Sign-In when Google Sign-In exists
5. Missing privacy policy

---

### 6.2 Google Play Policy Violations - Specific Risks

| Policy | Risk | Status |
|--------|------|--------|
| Broken Functionality | Non-working features cause rejection | HIGH RISK |
| User Data | Data Safety form must be accurate | HIGH RISK |
| Permissions | Must request at time of need, not startup | MEDIUM RISK |
| Deceptive Behavior | Placeholder screens could be seen as deceptive | MEDIUM RISK |

---

### 6.3 Rejection-Prone UX Patterns

**Patterns to Fix**:
1. **Login Wall**: Don't block all features behind login. Allow browse-first.
2. **Permission Walls**: Don't show permission dialogs on first launch
3. **Placeholder Content**: Remove or complete all placeholder screens
4. **External Links**: "Visit Website" buttons must work
5. **Deep Links**: All routes must handle invalid IDs gracefully

---

### 6.4 Metadata Requirements

**App Store Connect**:
- [ ] App name (30 chars max)
- [ ] Subtitle (30 chars max)
- [ ] Keywords (100 chars max)
- [ ] Description (4000 chars max)
- [ ] Promotional text (170 chars)
- [ ] Screenshots (6.7", 6.5", 5.5" iPhone + iPad if universal)
- [ ] App icon (1024x1024)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] Category (Food & Drink or Social Networking?)

**Google Play Console**:
- [ ] App name (50 chars max)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Screenshots (min 2, max 8 per device type)
- [ ] Feature graphic (1024x500)
- [ ] App icon (512x512)
- [ ] Privacy policy URL
- [ ] Data Safety form completed
- [ ] Content rating questionnaire
- [ ] Target audience declaration

---

## 7. Monetization & Business Risks

### 7.1 Current Strategy: Free

**Assessment**: Lower risk, but considerations needed.

**Even for Free Apps**:
- Apple requires Terms of Service link
- Future subscription plans must be designed now (UI hooks)
- Avoid patterns that look like they'll paywall later (dark patterns)

---

### 7.2 Future Monetization Readiness

**If Subscription Planned Later**:
- Design "Pro" feature hooks now
- Avoid giving everything away (hold back features)
- Consider what's worth paying for:
  - Unlimited scans?
  - Advanced analytics?
  - Roaster verified badges?
  - Ad-free experience?

---

## 8. Analytics & Observability Risks

### 8.1 Missing Key Product Metrics

**Current State**: NO ANALYTICS VISIBLE

**Critical Metrics Needed**:
- Daily/Weekly/Monthly Active Users
- Session duration
- Feature usage (scans, reviews, follows)
- Onboarding completion rate
- Screen flow/funnel analysis
- Retention cohorts

---

### 8.2 No Crash Monitoring

**Current State**: NONE

**Required**:
- [ ] Sentry or Crashlytics integration
- [ ] Error boundary components
- [ ] Performance monitoring
- [ ] Network request monitoring

---

### 8.3 No Post-Launch Alerting

**Required**:
- Crash rate alerts
- API error rate alerts
- User-reported issues pipeline
- App Store review monitoring

---

## 9. Edge Cases & Failure Scenarios

### 9.1 First-Time Users with No Data

**Scenarios to Handle**:
- Empty feed (no coffees to show) → Show onboarding/suggestions
- Empty journal → Show "Scan your first coffee" CTA
- No followers → Show suggested users to follow
- No reviews → Prompt to leave first review

---

### 9.2 Authentication Edge Cases

**Scenarios**:
- Session expires mid-use
- Sign in on new device
- Delete account and data
- Merge guest activity with account
- Email already exists (different provider)

---

### 9.3 Scanner Edge Cases

**Scenarios**:
- Scan unrecognized coffee bag → Allow manual entry
- Scan in low light → Show guidance
- Scan blurry image → Show retry prompt
- Coffee already in database → Show existing entry
- Coffee not in database → Create new entry flow

---

### 9.4 Timezone, Locale, Language

**Risks**:
- Review timestamps (relative vs absolute)
- Date formats (MM/DD vs DD/MM)
- Brew dates in future (timezone issues)
- RTL language support?
- Multi-language content (coffee names, origins)?

---

### 9.5 App Update Migration

**Required**:
- Backward compatible database changes
- Handle old app versions gracefully
- Force update mechanism for breaking changes
- Migration for local cached data

---

## Risk Priority Matrix

### Must Fix Before Any Testing
1. Authentication UI (sign-in, sign-up, social auth)
2. Remove or complete placeholder screens
3. Implement Apple Sign-In (required)
4. Create Privacy Policy
5. Wire up scanner functionality

### Must Fix Before Store Submission
1. Permission priming flows
2. Privacy labels / Data Safety form
3. Store metadata and screenshots
4. Onboarding flow
5. Error handling throughout

### Should Fix for Quality Launch
1. Offline support
2. Accessibility audit
3. Performance optimization
4. Analytics integration
5. Crash monitoring

### Can Address Post-Launch
1. Advanced social features
2. Notifications
3. Localization
4. Deep linking from external sources

---

## Next Steps

1. Review this analysis with team
2. Prioritize risk remediation
3. Proceed to Phase 2: Launch Roadmap
4. Create PRDs for each major work stream

---

*Document generated as part of Coffee Social App launch preparation*
