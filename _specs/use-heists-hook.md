# Spec for use-heists-hook

branch: claude/feature/use-heists-hook
figma_component (if used): N/A

## Summary

- Custom React hook `useHeists()` for fetching realtime heist data from Firestore
- Filter heists by three categories: active, assigned, and expired
- Updates the heists page to display three separate collections of heists

## Functional Requirements

- Hook accepts a single string argument: `"active"`, `"assigned"`, or `"expired"`
- Returns realtime data ( Firestore snapshot or query listener)
- **"active"** filter: heists where `assigneeId` equals current user AND deadline is in the future
- **"assigned"** filter: heists where `creatorId` equals current user AND deadline is in the future
- **"expired"** filter: heists where deadline has passed AND `finalStatus` is NOT null
- Heists page renders three sections, each using the hook with different filter argument
- Each heist displays its title only (for now)

## Figma Design (only if referenced)

- N/A

## Possible Edge-Cases

- No current authenticated user - handle gracefully (return empty array or loading state)
- No heists found for a given category - show empty state
- Realtime listener cleanup on unmount
- Network errors when fetching from Firestore
- Multiple simultaneous hook calls with different filters

## Acceptance Criteria

- `useHeists()` hook exists in `hooks/` directory
- Hook returns `{ heists, loading, error }` or similar state shape
- Heists page uses hook 3 times with "active", "assigned", "expired" filters
- Each section renders heist titles in a list
- Realtime updates work (new heists appear, status changes reflect)

## Open Questions

- What is the exact Firestore collection path for heists? -> "heists" (COLLECTIONS.HEISTS) in @app/types/firestore
- What are the exact field names for `assigneeId`, `creatorId`, `deadline`, `finalStatus`? -> Check the @app/types/firestore/heists and the Heist type.
- Authentication method: how do we get current user (Firebase Auth user object, UID in context, etc.)? -> Yes
- Should expired heists filter by ANY user or only current user's heists? -> Yes

## Testing Guidelines

Create test file(s) in ./tests folder for the new feature with meaningful tests for the following cases (without going too deep)

- Hook returns loading state initially
- Hook returns heists array when data loads
- Hook subscribes to Firestore realtime listener
- Hook cleans up listener on unmount
- Error handling for Firestore failures
- Different filter arguments return correct heist subsets
