# Create Heist Form

## Context

Users need a way to create new heists and assign them to other users. The create page at `/heists/create` currently has only a placeholder. This form will allow authenticated users to:

1. Create heists with title, description, assignee, and deadline
2. Auto-populate creator info from logged-in user
3. Select assignee from other users in the system
4. Choose deadline from preset options (24h, 48h, 72h, 1 week)
5. Redirect to `/heists` list on success

**Problem:** No way to create heists in the app.

**Solution:** Client form with server action for Firestore write, using existing patterns.

---

## Implementation Plan

### 1. Create User Type for Firestore

**New file:** `types/firestore/user.ts`

```typescript
export interface User {
  id: string; // Firebase Auth uid
  codeName: string; // Generated codename
}
```

**Modify:** `types/firestore/index.ts` - add USERS to COLLECTIONS, export User type

### 2. Create Select Component (Reusable Dropdown)

**New files:**

- `components/Select/Select.tsx` - Select dropdown component
- `components/Select/Select.module.css` - Styles matching Input component
- `components/Select/index.ts` - Barrel export

**Props:** name, label, options array, required, defaultValue

### 3. Create Textarea Component

**New files:**

- `components/Textarea/Textarea.tsx` - Textarea for description field
- `components/Textarea/Textarea.module.css` - Styles matching Input component
- `components/Textarea/index.ts` - Barrel export

**Props:** name, label, required, maxLength (200 for description)

### 4. Create Server Action for Heist Creation

**New file:** `actions/heist.ts`

```typescript
"use server";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CreateHeistInput } from "@/types/firestore";
import { serverTimestamp } from "firebase/firestore";
import { redirect } from "next/navigation";

export async function createHeist(formData: FormData) {
  // Extract and validate form data
  // Get current user from session (need to figure out auth in server actions)
  // Fetch assignee codename from users collection
  // Create document with serverTimestamp for createdAt
  // Redirect to /heists on success
}
```

**Note:** Need to investigate how to get current user in server actions. May need to pass uid from client or use cookies/session.

### 5. Create Users Fetch Helper

**New file:** `lib/users.ts`

```typescript
export async function getAllUsers(): Promise<User[]> {
  // Fetch all users from users collection
  // Return array of User objects
}
```

### 6. Implement Create Heist Page

**Modify:** `app/(dashboard)/heists/create/page.tsx`

- `'use client'` directive (needs interactivity for form)
- Fetch users on mount for dropdown
- Form with fields: title (Input), description (Textarea), assignTo (Select), deadline (Select)
- Server action for form submission
- Error handling and display
- Loading states

**Form fields:**

- `title`: text input, required, maxLength 50
- `description`: textarea, required, maxLength 200
- `assignTo`: select dropdown, populated from users collection (exclude current user)
- `deadline`: select with preset options (24h, 48h, 72h, 1 week), default 48h

### 7. Add User Type to Firestore Index

**Modify:** `types/firestore/index.ts`

- Add `USERS: "users"` to COLLECTIONS
- Export User type

---

## Files to Create/Modify

| File                                           | Action                   |
| ---------------------------------------------- | ------------------------ |
| `types/firestore/user.ts`                      | Create                   |
| `types/firestore/index.ts`                     | Modify - add User, USERS |
| `components/Select/Select.tsx`                 | Create                   |
| `components/Select/Select.module.css`          | Create                   |
| `components/Select/index.ts`                   | Create                   |
| `components/Textarea/Textarea.tsx`             | Create                   |
| `components/Textarea/Textarea.module.css`      | Create                   |
| `components/Textarea/index.ts`                 | Create                   |
| `lib/users.ts`                                 | Create                   |
| `actions/heist.ts`                             | Create                   |
| `app/(dashboard)/heists/create/page.tsx`       | Modify - implement form  |
| `tests/components/Select/Select.test.tsx`      | Create                   |
| `tests/components/Textarea/Textarea.test.tsx`  | Create                   |
| `tests/app/(dashboard)/heists/create.test.tsx` | Create                   |

---

## Reusable Patterns (From Exploration)

**Form pattern** (from `app/(public)/login/page.tsx`):

- Client component with handleSubmit
- FormData extraction
- try/catch with error state
- router.push for redirect

**Input component** (`components/Input/Input.tsx`):

- CSS modules with Tailwind `@apply`
- Props: type, name, label, required, minLength, autoComplete

**SubmitButton** (`components/SubmitButton/SubmitButton.tsx`):

- `useFormStatus()` hook for pending state
- Works with `<form action={...}>`

**Firestore pattern** (`actions/user.ts`):

- `"use server"` directive
- `doc()`, `setDoc()` for writes
- Import db from `@/lib/firebase`

**User hook** (`lib/hooks/useUser.ts`):

- Returns `{ user, loading }`
- User has `uid`, `email`, etc. (Firebase Auth User type)

---

## Open Questions to Resolve

1. **Server action auth:** How to get current user in server action?
   - Option A: Pass uid from client form (hidden field)
   - Option B: Use Firebase Admin SDK with session cookies
   - Option C: Use Next.js middleware/session

2. **User codename access:** Is codename in Firebase Auth or Firestore users collection?
   - From `actions/user.ts`: codename is stored in Firestore users collection
   - Need to query users collection to get codename for display

---

## Verification

1. **Manual test:**
   - Login as user, visit `/heists/create`
   - Form should render with all fields
   - Assignee dropdown should show other users (not current user)
   - Submit form with valid data → redirect to `/heists`
   - Check Firestore console for new heist document

2. **Validation tests:**
   - Empty form → HTML5 validation errors
   - Title > 50 chars → should be blocked
   - Description > 200 chars → should be blocked

3. **Run tests:**

   ```bash
   pnpm test
   ```

4. **Test server action:**
   - Network tab should show action call
   - Check payload includes all required fields

## Out of Scope

- Heist list page (separate feature)
- Heist detail page
- Edit/update heist functionality
- Delete heist functionality
