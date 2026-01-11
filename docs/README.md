# Coffee Social - Launch Documentation

> **App**: Coffee Social - A social media platform for specialty coffee discovery
> **Vision**: Scan → Review → Share → Connect around coffee
> **Target**: iOS App Store + Google Play Store simultaneous launch

---

## Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| [Phase 1: Risk Analysis](./PHASE_1_RISK_ANALYSIS.md) | All identified risks and issues | Product, Engineering, Leadership |
| [Phase 2: Launch Roadmap](./PHASE_2_LAUNCH_ROADMAP.md) | Step-by-step path to launch | All Teams |
| [Phase 3: PRD Readiness](./PHASE_3_PRD_READINESS.md) | How to write PRDs from roadmap | Product, Design |

---

## Current State Summary

### What's Working
- Coffee feed with Supabase data
- Coffee discovery with search and advanced filtering
- Coffee detail pages with reviews and ratings
- Review submission (requires auth)
- UI component library (Button, Card, Input, Badge, etc.)
- Maps integration ready

### What's Missing for Launch
- Authentication UI (critical - blocking)
- Scanner integration (core feature)
- User profiles (placeholder)
- Social feed (not built)
- Coffee journal (not built)
- Café check-ins (not built)
- Privacy Policy & Terms (required)
- Store assets (none exist)

---

## Critical Path to Launch

```
1. [BLOCKING] Authentication UI with Apple Sign-In
2. [BLOCKING] Privacy Policy + Terms of Service
3. [CORE] Scanner → Identify → Review flow
4. [CORE] User Profiles with Follow system
5. [CORE] Social Feed
6. [ENGAGEMENT] Coffee Journal
7. [ENGAGEMENT] Café Check-ins
8. [REQUIRED] Store assets and metadata
9. [REQUIRED] Developer account setup
10. [REQUIRED] TestFlight / Internal Track testing
11. [REQUIRED] QA and regression testing
12. [SUBMIT] App Store + Play Store submission
```

---

## Top 5 Risks (Act Now)

| # | Risk | Impact | Action |
|---|------|--------|--------|
| 1 | No Apple Sign-In | **Store Rejection** | Implement immediately |
| 2 | Placeholder screens | **Store Rejection** | Remove or complete |
| 3 | No Privacy Policy | **Store Rejection** | Draft and host |
| 4 | Scanner not working | **No core value** | Wire up scanner |
| 5 | No auth UI | **App unusable** | Build auth screens |

---

## PRDs Required (8 Total)

| PRD | Priority | Dependencies |
|-----|----------|--------------|
| Authentication | P0 | None |
| Permission Flows | P0 | None |
| Scanner | P0 | Auth, Permissions |
| User Profiles | P1 | Auth |
| Social Feed | P1 | User Profiles |
| Coffee Journal | P2 | Scanner |
| Check-ins | P2 | User Profiles |
| Analytics | P2 | Auth |

---

## Quick Links

### Development Setup
```bash
cd coffee-app
npm install
npx expo start
```

### Useful Commands
```bash
# Seed sample data
npm run seed:nomad

# Build for iOS
eas build --platform ios --profile preview

# Build for Android
eas build --platform android --profile preview
```

### Key Files
- [App Layout](../coffee-app/app/_layout.tsx) - Root navigation
- [Tab Navigation](../coffee-app/app/(tabs)/_layout.tsx) - Bottom tabs
- [Supabase Client](../coffee-app/lib/supabase.ts) - Backend connection
- [Queries](../coffee-app/lib/queries.ts) - Data fetching hooks

---

## Next Steps

1. **Product**: Review Phase 1 Risk Analysis with team
2. **Product**: Lock V1 scope based on roadmap
3. **Design**: Begin auth screen designs
4. **Engineering**: Start authentication implementation
5. **Legal**: Begin Privacy Policy drafting
6. **All**: Schedule weekly launch sync

---

*Last Updated: January 2026*
*Analysis Version: 1.0*
