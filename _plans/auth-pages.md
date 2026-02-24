# Auth Pages Implementation Plan

## Context

Create login and signup pages with modern form handling using React 19 async patterns. The forms will temporarily log to console (no backend integration yet) and include password visibility toggles with proper accessibility.

## Implementation Approach

### Phase 1: Create Reusable Form Components

Build reusable primitives first to avoid duplication between login and signup forms.

**1. Input Component**

- `components/Input/Input.tsx` - Reusable input with label
- `components/Input/Input.module.css` - Styled input field with focus state
- Supports type="email" | "password" | "text"
- HTML5 validation via props (required, minLength, autoComplete)
- Proper label/input association for accessibility

**2. PasswordInput Component**

- `components/PasswordInput/PasswordInput.tsx` - Password input with visibility toggle
- `components/PasswordInput/PasswordInput.module.css` - Wrapper and toggle button styles
- Uses Eye/EyeOff icons from lucide-react
- Local state for visibility toggle
- Accessibility: aria-label on toggle button
- Focus management: maintains input focus after toggle

**3. SubmitButton Component**

- `components/SubmitButton/SubmitButton.tsx` - Button using React 19 useFormStatus
- No CSS module (uses global `.btn` class)
- Auto-disables during form submission (prevents double submission)
- Shows "Submitting..." text during pending state
- aria-busy attribute for accessibility

### Phase 2: Create Server Actions

**`app/actions/auth.ts`**

- Server action functions for form handling
- `loginAction()` - Logs email and password length to console
- `signupAction()` - Logs email and password length to console
- Returns typed state for useActionState

### Phase 3: Implement Login Page

**`app/(public)/login/page.tsx`**

- Client component ('use client' directive)
- Uses useActionState with loginAction
- Form with email input and password input
- SubmitButton component
- Link to signup page
- Console logs credentials on submission

**`app/(public)/login/page.module.css`**

- Form layout styles (flex-col gap-4)
- Footer with link to signup
- Auth link styling (primary color with hover)

### Phase 4: Implement Signup Page

**`app/(public)/signup/page.tsx`**

- Client component ('use client' directive)
- Uses useActionState with signupAction
- Form with email input and password input
- SubmitButton component
- Link to login page
- Console logs credentials on submission

**`app/(public)/signup/page.module.css`**

- Same styles as login page
- Footer with link to login

### Phase 5: Testing

**Component Tests:**

- `tests/components/Input.test.tsx` - Label, type, required, minLength attributes
- `tests/components/PasswordInput.test.tsx` - Toggle functionality, icon changes, focus management
- `tests/components/SubmitButton.test.tsx` - Pending state, disabled state, aria-busy

**Page Tests:**

- `tests/app/(public)/login.test.tsx` - Form renders, useActionState used, console.log on submit
- `tests/app/(public)/signup.test.tsx` - Form renders, useActionState used, console.log on submit

## Critical Files

- `components/PasswordInput/PasswordInput.tsx` - Core interactive component with toggle logic
- `components/SubmitButton/SubmitButton.tsx` - React 19 useFormStatus pattern
- `app/actions/auth.ts` - Server actions for console logging
- `app/(public)/login/page.tsx` - Login page implementation
- `app/(public)/signup/page.tsx` - Signup page implementation

## Implementation Sequence

1. Create Input component + tests
2. Create PasswordInput component + tests
3. Create SubmitButton component + tests
4. Create auth actions file
5. Implement Login page + tests
6. Implement Signup page + tests
7. Run full test suite
8. Manual accessibility testing (keyboard nav, screen reader)

## Edge Cases Handled

- **Double submission**: useFormStatus auto-disables button during submission
- **Accessibility**: aria-label on toggle, aria-busy on button, proper label associations
- **Mobile responsiveness**: Full-width inputs, flex-col layout, max-width on page-content
- **Password validation**: HTML5 minLength={5} attribute (browser native validation)

## Verification

After implementation:

1. Run `npm test` - All tests should pass
2. Visit `/login` - Form should render with email/password fields
3. Visit `/signup` - Form should render with email/password fields
4. Toggle password visibility - Eye icon should change, input type should toggle
5. Submit forms - Check browser console for login/signup logs
6. Test keyboard navigation - Tab through fields, Enter to submit
7. Test double submission - Button should disable during "Submitting..." state
