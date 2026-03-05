# Spec for create-heist-form

branch: claude/feature/create-heist-form
figma_component (if used): none

## Summary

Add a form to create new heists in the dashboard. Users can assign heists to other users with a deadline. On successful creation, user is redirected to the heists list.

## Functional Requirements

- Form accessible at `/heists/create`
- Form fields: title, description, assign to (dropdown of all users from "users" collection), deadline (preset options: 24h, 48h, 72h, 1 week)
- `createdByCodename` auto-populated from logged-in user's codename
- `createdBy` (uid) auto-populated from logged-in user
- `createdAt` set to current date on submission
- `finalStatus` defaults to `null` (active heist)
- On success: create document in "heists" collection, redirect to `/heists`
- Form validation: title and description required, assignee required

## Figma Design (only if referenced)

- None

## Possible Edge-Cases

- No other users available to assign to (logged-in user cannot assign to themselves)
- User session expires during form interaction
- Firestore write failure (network, permissions)
- Users collection empty or unavailable

## Acceptance Criteria

- Form renders with all required fields
- Assignee dropdown populates from "users" collection (excluding current user)
- Deadline selector has 4 preset options (24h, 48h, 72h, 1 week) with 48h as default
- Form submission creates heist document with correct fields
- Success redirects to `/heists` list page
- Validation errors displayed inline

## Open Questions

- Should users be able to assign heists to themselves? -> No
- Should there be a draft/save-later functionality? -> No
- What's the max length for title and description? -> Title: 50 chars, Description: 200 chars

## Testing Guidelines

Create test file(s) in ./test folder for the new feature with meaningful tests for the following cases (without going too deep)

- Form renders with all fields
- Assignee dropdown loads users from collection
- Deadline dropdown has correct options
- Form validation works (required fields)
- Successful submission creates document and redirects
- Error handling for Firestore write failures
