# Login Navbar Button Plan

## Context

The navbar currently shows a logout button when authenticated, but has no login button for unauthenticated users. Need to add a login button that appears in the same position when user is not logged in.

## Implementation Plan

### Update Navbar (`components/Navbar/Navbar.tsx`)

1. Import `LogIn` icon from lucide-react
2. Add conditional rendering: show login button when `!user` (no user logged in)
3. Login button uses the same `btn` class as "Create New Heist" for gradient styling
4. Link to `/login` route
5. When initially still not known whether user is logged in or not, then nor the Login button neither the Logout button should be visible

```tsx
{
  !user ? (
    <li>
      <Link href="/login" className="btn">
        <LogIn size={20} strokeWidth={2} />
        <span>Log In</span>
      </Link>
    </li>
  ) : (
    <li>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={styles.logoutBtn}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </li>
  );
}
```

### Update Tests (`tests/components/Navbar.test.tsx`)

Add tests for login button:

- Renders when user is not logged in
- Does not render when user is logged in
- Links to /login route

## Files to Create

None

## Files to Modify

| File                               | Changes                                     |
| ---------------------------------- | ------------------------------------------- |
| `components/Navbar/Navbar.tsx`     | Add login button with conditional rendering |
| `tests/components/Navbar.test.tsx` | Add login button tests                      |

## Verification

1. Start dev server
2. Visit `/heists` while logged out → verify login button shows
3. Login → verify logout button replaces login button
4. Logout → verify login button reappears
