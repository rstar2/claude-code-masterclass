# Spec for route-protection

branch: claude/feature/route-protection
figma_component (if used): none

## Summary

- Implement route-level access control based on Firebase authentication status
- Public routes (`(public)` group) redirect authenticated users to dashboard
- Dashboard routes (`(dashboard)` group) redirect unauthenticated users to login
- Display loading state during Firebase auth initialization

## Functional Requirements

- **Public route group protection** (`(public)`)
  - Accessible only to unauthenticated users
  - Authenticated users redirected to `/heists`
  - Includes: splash, login, and signup pages

- **Dashboard route group protection** (`(dashboard)`)
  - Accessible only to authenticated users
  - Unauthenticated users redirected to `/login`
  - Includes: heists list, create, and detail pages

- **Loading state**
  - Show simple loader while Firebase auth status initializes
  - Displayed in group layouts before redirection decision

- **Auth hook integration**
  - Use existing `useUser()` hook to determine auth status
  - Handle loading, authenticated, and unauthenticated states

## Figma Design (only if referenced)

- File: none
- Component name: none
- Key visual constraints: none

## Possible Edge-Cases

- Firebase auth takes longer than expected to initialize
- User navigates directly to a protected route via URL
- Authentication state changes while user is on a page (logout/login)
- Network delays causing flicker between loader and redirect

## Acceptance Criteria

- Unauthenticated user accessing `/heists` redirects to `/login`
- Authenticated user accessing `/login` redirects to `/heists`
- Loader displays during auth initialization in both route groups
- No flicker or double-render when redirecting
- useUser() hook properly integrated into both layouts

## Open Questions

- Should there be a "redirect back" functionality after login (e.g., user tried to access `/heists/create` but was sent to login, then returned)? -> No for now.
- What specific visual style should the loader have (spinner, skeleton, etc.)? -> The clock icon from the main (public) page

## Testing Guidelines

Create test file(s) in ./test folder for the new feature with meaningful tests for the following cases (without going too deep)

- Unauthenticated user redirected away from dashboard routes
- Authenticated user redirected away from public routes
- Loader displays during auth initialization
- Redirect works when navigating directly to protected URLs
