# Spec for login-navbar-button

branch: claude/feature/login-navbar-button

## Summary

Add a login button to the navigation bar that appears when a user is not logged in (in place of the logout button). The button should match the "Create New Heist" button styling with a different icon.

## Functional Requirements

### Navbar (`components/Navbar/`)

- Add a login button that only renders when `user` is null (not authenticated)
- Position in the same location as the logout button (left of "Create New Heist" button)
- Use the same CSS styles as the "Create New Heist" button (gradient background)
- Use a login-related icon (e.g., LogIn from lucide-react)
- Display "Log In" text alongside the icon
- No redirect behavior yet (just the button UI)

## Figma Design

None provided

## Possible Edge-Cases

- None for UI-only implementation

## Acceptance Criteria

- Login button only visible when user is not logged in
- Login button hidden when user is logged in
- Login button has same gradient styling as "Create New Heist" button
- Login button displays a login icon and "Log In" text
- Login button appears to the left of "Create New Heist" button

## Open Questions

- Which icon to use? (suggesting LogIn from lucide-react) -> Yes

## Testing Guidelines

Create test file(s) in ./tests folder for the new feature with meaningful tests for the following cases (without going too deep)

- Login button renders when user is not logged in
- Login button does not render when user is logged in
- Login button has correct text and icon
- Login button links to /login route
