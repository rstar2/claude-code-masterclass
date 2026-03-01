# Spec for auth-context-user-hook

branch: claude/feature/auth-context-user-hook
figma_component (if used): N/A

## Summary

Create a Firebase authentication context that provides real-time user state across the application. A `useUser()` hook will return the current user object or null if not authenticated. This is the foundation for auth-dependent features—signin, signup, and logout logic will be specified separately.

## Functional Requirements

- **Firebase Auth Context**: Create a React context provider that wraps the whole app , e.g. all routes
- **Real-time listener**: Subscribe to Firebase Auth state changes on mount and unsubscribe on unmount
- **useUser() hook**: Returns `{ user: User | null, loading: boolean }`
  - `user`: Firebase User object if authenticated, null if not
  - `loading`: true while initial auth state is being determined, false after
- **Provider placement**: Wrap layout so protected routes have access
- **Type safety**: Export proper TypeScript types for the user object and hook return value

## Figma Design (only if referenced)

N/A – No UI components for this feature

## Possible Edge-Cases

- **Auth state during page load**: Show loading state while Firebase determines initial auth state
- **User object changes**: Handle Firebase auth state updates (e.g., token refresh, profile changes) seamless ly
- **Client-side only**: Ensure provider only runs on client (use 'use client' directive)
- **Multiple providers**: Design to work alongside other future context providers

## Acceptance Criteria

- [x] useUser() hook is accessible from any component within the whole app
- [x] Returns null for user when not authenticated
- [x] Returns Firebase User object when authenticated
- [x] Loading state is true only during initial auth check, not on subsequent auth changes
- [x] Auth state updates automatically trigger re-renders in consuming components
- [x] TypeScript types are exported for use in components

## Open Questions

- Should we store additional user data (beyond Firebase auth user) in Firestore? If so, should that be included in the hook return value or separate? -> No need for now
- Do we need a loading indicator component, or is that left to consuming components? Yes

## Testing Guidelines

Create test file(s) in ./tests folder for the new feature with meaningful tests for the following cases:

- Hook returns loading: true during initial auth check
- Hook returns user: null when no authenticated user
- Hook returns Firebase User object when authenticated
- Hook updates when auth state changes
- Provider unmounts and cleans up listener
- Hook throws error if used outside provider context
