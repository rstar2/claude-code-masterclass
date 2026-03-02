# Logout Navbar Button Plan

## Context

The app has authentication state managed via `AuthProvider` and `useUser` hook, but there's no way for users to log out. Need to add a logout button to the navbar that only shows when authenticated.

## Implementation Plan

### 1. Add Logout Function (`lib/auth.ts`)

Add a `logout()` function that calls Firebase Auth's `signOut()`:

```typescript
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export async function logout(): Promise<void> {
  await signOut(auth);
}
```

### 2. Update Navbar (`components/Navbar/Navbar.tsx`)

- Import `useUser` from `@/lib/hooks/useUser`
- Import `logout` from `@/lib/auth`
- Conditionally render logout button when `user` exists
- Handle logout click with loading state to prevent double-clicks

```tsx
const { user } = useUser();
const [isLoggingOut, setIsLoggingOut] = useState(false);

async function handleLogout() {
  setIsLoggingOut(true);
  try {
    await logout();
  } finally {
    setIsLoggingOut(false);
  }
}

// Only render when user exists
{
  user && (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={styles.logoutBtn}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
```

### 3. Add Button Styling (`components/Navbar/Navbar.module.css`)

Add `.logoutBtn` class matching navbar button patterns:

```css
.logoutBtn {
  @apply cursor-pointer rounded-lg px-4 py-2 text-sm font-medium hover:bg-dark/10 disabled:cursor-not-allowed disabled:opacity-70;
}
```

## Files to Create

None

## Files to Modify

| File                                  | Changes                                      |
| ------------------------------------- | -------------------------------------------- |
| `lib/auth.ts`                         | Add `logout()` function                      |
| `components/Navbar/Navbar.tsx`        | Add logout button with conditional rendering |
| `components/Navbar/Navbar.module.css` | Add `.logoutBtn` style                       |

## Verification

1. Start dev server
2. Login at `/login` with test credentials
3. Verify logout button appears in navbar
4. Click logout button
5. Verify user is signed out (AuthProvider state updates)
6. Verify no console errors
