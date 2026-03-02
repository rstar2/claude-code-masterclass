# Spec for logout-navbar-button

branch: claude/feature/logout-navbar-button
figma: https://www.figma.com/design/elHzuUQZiJXNqJft57oneh/Page-Designs?node-id=14-3&t=N1LkdpUuKxy4dR4R-0

## Summary

Add a logout button to the navigation bar that only appears when a user is logged in. Clicking it signs the user out and redirects to the login page.

## Functional Requirements

### Navbar (`components/Navbar/`)

- Add a logout button that only renders when a user is authenticated
- Use the existing `useUser` hook to check authentication status
- On click: sign out via Firebase Auth and redirect to `/login`
- Button should match the existing navbar styling

### Logout Behavior

- Call Firebase Auth's `signOut()` method
- Clear the user session
- No redirects

## Figma Design

- **Link**: https://www.figma.com/design/elHzuUQZiJXNqJft57oneh/Page-Designs?node-id=14-3&t=N1LkdpUuKxy4dR4R-0
- **Note**: Design reference to be reviewed manually for exact styling details

## Possible Edge-Cases

- Network errors during logout
- User session already expired
- Multiple rapid logout clicks

## Acceptance Criteria

- Logout button only visible when user is logged in
- Clicking logout signs the user out
- AuthProvider state updates correctly (user becomes null)
- No errors logged to console during normal logout flow

## Open Questions

- What should the logout button text be? (e.g., "Logout", "Sign Out", icon only?) -> Logout
- Should there be a confirmation dialog before logout? -> No
- After logout, should redirect go to `/login` or `/` (splash page)? -> No the AuthProvider should handle this later

## Testing Guidelines

Create test file(s) in ./tests folder for the new feature with meaningful tests for the following cases (without going too deep)

- Logout button renders when user is logged in
- Logout button does not render when user is not logged in
- Clicking logout calls Firebase signOut
- AuthProvider state updates to null after logout
