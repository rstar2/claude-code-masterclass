# Plan: Route Protection

## Overview

Add authentication-based route protection to `(public)` and `(dashboard)` route groups using existing `useUser()` hook, with loading state during Firebase auth initialization.

## Files to Modify

1. **`app/(public)/layout.tsx`** - Convert to client component, add auth check & loader
2. **`app/(dashboard)/layout.tsx`** - Convert to client component, add auth check & loader
3. **`tests/app/(public)/layout.test.tsx`** - New test file
4. **`tests/app/(dashboard)/layout.test.tsx`** - New test file

## Implementation Steps

### Step 1: Create shared Loader component

Create `components/RouteLoader/index.ts` and `components/RouteLoader/RouteLoader.tsx`:

- Client component displaying centered Clock8 icon (from lucide-react)
- Uses `center-content` utility class for positioning
- Simple, minimal visual (clock icon matches brand)

### Step 2: Update `(public)/layout.tsx`

Convert from server to client component:

- Add `'use client'` directive
- Import `useUser`, `useRouter`, `useEffect`
- Import `RouteLoader` component
- Show loader while `loading === true`
- Redirect to `/heists` when `user` exists (using `useEffect` + `router.replace`)
- Render children normally when `user === null` and `loading === false`

### Step 3: Update `(dashboard)/layout.tsx`

Convert from server to client component:

- Add `'use client'` directive
- Import `useUser`, `useRouter`, `useEffect`
- Import `RouteLoader` component
- Show loader while `loading === true`
- Redirect to `/login` when `user === null`
- Render children + Navbar when user exists

### Step 4: Write tests

**`tests/app/(public)/layout.test.tsx`**:

- Mock `useUser` and `useRouter`
- Test loader displays during loading
- Test redirect to `/heists` when authenticated
- Test children render when unauthenticated

**`tests/app/(dashboard)/layout.test.tsx``**:

- Mock `useUser`, `useRouter`, and Navbar
- Test loader displays during loading
- Test redirect to `/login` when unauthenticated
- Test children + Navbar render when authenticated

## Edge Cases Handled

- Direct URL navigation to protected routes
- Slow Firebase auth initialization
- Auth state changes (login/logout) while on page
- No flicker due to `useEffect` + conditional rendering pattern

## Order of Work

1. Create RouteLoader component
2. Modify (public)/layout.tsx
3. Modify (dashboard)/layout.tsx
4. Create tests for both layouts
5. Run tests to verify behavior
