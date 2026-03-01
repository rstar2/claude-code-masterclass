# Auth Context with useUser() Hook

## Context

Need a global Firebase auth state management solution. The app has Firebase configured (`lib/firebase.ts`) but no way for components to access the current authenticated user. This is foundational for protected routes and user-specific features.

**Problem:** Components cannot know if a user is logged in or access user data.

**Solution:** React Context + custom hook pattern with real-time Firebase Auth listener.

---

## Implementation Plan

### 1. Create AuthProvider Component

**New files:**

- `components/AuthProvider/AuthProvider.tsx` - Provider with onAuthStateChanged listener
- `components/AuthProvider/types.ts` - TypeScript exports
- `components/AuthProvider/index.ts` - Barrel export

**Key implementation:**

- `'use client'` directive
- `useState` for `user` (User|null) and `loading` (boolean)
- `useRef` to track first load (ensures `loading` only true on initial check)
- `useEffect` with `onAuthStateChanged(auth, callback)` from Firebase
- Cleanup: return unsubscribe function
- Wrap children with `<AuthContext.Provider>`

### 2. Create useUser Hook

**New files:**

- `lib/hooks/useUser.ts` - Hook returning `{ user, loading }`
- `lib/hooks/index.ts` - Barrel export

**Implementation:**

- `useContext(AuthContext)` with undefined check
- Throw error if used outside provider

### 3. Integrate into Root Layout

**Modify:** `app/layout.tsx`

- Import `<AuthProvider>`
- Wrap `{children}` with provider

### 4. Create LoadingIndicator Component

**New files:**

- `components/LoadingIndicator/LoadingIndicator.tsx`
- `components/LoadingIndicator/LoadingIndicator.module.css`
- `components/LoadingIndicator/index.ts`

**Design:** Centered spinner using Tailwind + brand colors (primary purple)

### 5. Tests

**New files:**

- `tests/lib/hooks/useUser.test.tsx`
- `tests/components/AuthProvider/AuthProvider.test.tsx`

**Mock setup** in `vitest.setup.ts`:

```typescript
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));
```

**Test cases:**

- loading: true on initial render
- user: null when unauthenticated
- Returns User when authenticated
- Updates on auth change
- Throws outside provider
- Cleanup on unmount

---

## Files to Create/Modify

| File                                                      | Action                            |
| --------------------------------------------------------- | --------------------------------- |
| `components/AuthProvider/AuthProvider.tsx`                | Create                            |
| `components/AuthProvider/types.ts`                        | Create                            |
| `components/AuthProvider/index.ts`                        | Create                            |
| `lib/hooks/useUser.ts`                                    | Create                            |
| `lib/hooks/index.ts`                                      | Create                            |
| `components/LoadingIndicator/LoadingIndicator.tsx`        | Create                            |
| `components/LoadingIndicator/LoadingIndicator.module.css` | Create                            |
| `components/LoadingIndicator/index.ts`                    | Create                            |
| `app/layout.tsx`                                          | Modify - add AuthProvider wrapper |
| `vitest.setup.ts`                                         | Modify - add Firebase mocks       |
| `tests/lib/hooks/useUser.test.tsx`                        | Create                            |
| `tests/components/AuthProvider/AuthProvider.test.tsx`     | Create                            |

---

## Verification

1. **Manual test:**
   - Use browser DevTools → Application → Local Storage to check Firebase auth
   - Visit `/login` - should see loading state briefly, then `user: null`
   - (After signup/login implemented) verify `user` object is returned

2. **Component test:**
   - Create a test component that uses `useUser()` hook
   - Render and verify hook returns correct values

3. **Run tests:**

   ```bash
   pnpm test
   ```

## Out of scope

- Do not use the `useUser()` hook yet anywhere
