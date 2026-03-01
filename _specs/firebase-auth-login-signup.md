# Spec for firebase-auth-login-signup

branch: claude/feature/firebase-auth-login-signup

## Summary

Integrate Firebase Authentication into the login and signup pages. When a user signs up, create a new user document in the "users" collection with an auto-generated codename.

## Functional Requirements

### Login Page (`app/(public)/login/page.tsx`)

- Integrate with Firebase Authentication to sign in users with email/password
- Display appropriate error messages for failed authentication attempts
- Redirect to `/heists` upon successful login

### Signup Page (`app/(public)/signup/page.tsx`)

- Integrate with Firebase Authentication to create new users with email/password
- On successful signup, create a new document in the "users" Firestore collection with:
  - `id`: The user's Firebase UID
  - `codeName`: An auto-generated codename (see below)
- Display appropriate error messages for failed signup attempts
- Redirect to `/heists` upon successful signup

### CodeName Generation

- Generate a unique codename by selecting 3 words from 3 different unique word sets
- Concatenate the selected words in PascalCase format
- Example: "FierceShadowTiger" or "SilentStormBlade"

## Figma Design (only if referenced)

None

## Possible Edge-Cases

- User already exists in Firebase (signup attempt with existing email)
- Incorrect password on login
- Network errors during authentication
- Firestore document creation failure after successful auth
- Collision on codename generation (if uniqueness is required)
- User is already logged in when accessing login/signup pages

## Acceptance Criteria

- Login page successfully authenticates users with valid credentials
- Login page shows error for invalid credentials
- Signup page creates new Firebase user
- Signup page creates corresponding "users" collection document with id and codeName
- CodeName follows PascalCase format with 3 concatenated words
- Successful authentication redirects to `/heists`
- Appropriate error messages display for all failure scenarios

## Open Questions

- Should the codename be unique across all users, or can duplicates exist? No
- What are the 3 word sets to choose from for codename generation? Just generate some in a different file, like 40 words per set.
- Should there be a minimum password requirement beyond what Firebase enforces? No
- Should email verification be required before allowing login? No
- How should "remember me" functionality be handled (session persistence)? No remember me"

## Testing Guidelines

Create test file(s) in ./tests folder for the new feature with meaningful tests for the following cases (without going too deep)

- Successful login with valid credentials
- Failed login with invalid credentials
- Failed login with non-existent user
- Successful signup creates Firebase user
- Successful signup creates user document in Firestore
- CodeName generation produces valid PascalCase format with 3 words
- Signup with existing email shows appropriate error
- Redirect behavior after successful authentication
- Error message display for network failures
