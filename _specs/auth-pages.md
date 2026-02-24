# Spec for auth-pages

branch: claude/feature/auth-pages
figma_component (if used): None

## Summary

- Create login and signup pages at `/login` and `/signup` routes
- Implement email and password input fields with validation
- Add password visibility toggle functionality using eye icons
- Use React 19 async patterns (useActionState, useFormStatus) for form handling
- Console log form submissions temporarily

## Functional Requirements

- **Login page** (`/login`):
  - Email input field with type="email"
  - Password input field with type="password"
  - Password visibility toggle button (Eye/EyeOff icon)
  - Submit button
  - Console log email and password on form submission

- **Signup page** (`/signup`):
  - Email input field with type="email"
  - Password input field with type="password"
  - Password visibility toggle button (Eye/EyeOff icon)
  - Submit button
  - Console log email and password on form submission

- Both forms must:
  - Use 'use client' directive for interactivity
  - Leverage React 19 useActionState for form state management
  - Use Lucide React icons for password toggle
  - Follow existing app theme (purple/pink color scheme)
  - Be placed in `app/(public)/login` and `app/(public)/signup` directories

## Figma Design (only if referenced)

- File: None
- Component name: None
- Key visual constraints: None - follow existing app styling from globals.css

## Possible Edge-Cases

- Double Form submission (user clicks too quickly), e.g. concurrency
- Accessibility considerations for password toggle (aria-labels, focus states)
- Mobile responsiveness for form layout

## Acceptance Criteria

- Login page renders at `/login` route
- Signup page renders at `/signup` route
- Both forms contain email and password fields
- Password visibility toggles between password and text types
- Form submissions log credentials to console
- No console errors or warnings
- Forms use React 19 async patterns (useActionState)
- Consistent styling with existing app theme

## Open Questions

- Should there be client-side validation beyond HTML5 attributes? -> No for now.
- Should password have minimum length requirements? -> Yes, 5 chars.
- Should forms persist data between route navigation? -> No.

## Testing Guidelines

Create test file(s) in ./test folder for the new feature with meaningful tests for the following cases (without going too deep)

- Login page renders email and password inputs
- Signup page renders email and password inputs
- Password visibility toggle changes input type between 'password' and 'text'
- Form submission logs to console with correct values
- Forms use React 19 hooks (useActionState, useFormStatus)
- Icons render correctly for password toggle
