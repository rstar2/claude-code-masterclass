# Plan: useHeists Hook for Realtime Heist Data

## Context

Need to display heists in three categories on the dashboard page:

- **Active**: heists assigned TO current user (deadline not passed)
- **Assigned**: heists assigned BY current user (deadline not passed)
- **Expired**: heists with passed deadline AND finalStatus is not null

Current heists page is a placeholder. This hook enables realtime Firestore queries to populate the three sections.

## Implementation

### 1. Create useHeists Hook

**File**: `lib/hooks/useHeists.ts`

```typescript
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/types/firestore";
import { heistConverter, type Heist } from "@/types/firestore/heist";
import { useUser } from "./useUser";

type HeistFilter = "active" | "assigned" | "expired";

interface UseHeistsResult {
  heists: Heist[];
  loading: boolean;
  error: Error | null;
}

export function useHeists(filter: HeistFilter): UseHeistsResult {
  const { user } = useUser();
  const [heists, setHeists] = useState<Heist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setHeists([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Build query based on filter
    const heistsRef = collection(db, COLLECTIONS.HEISTS).withConverter(
      heistConverter,
    );
    let q;

    const now = new Date();

    switch (filter) {
      case "active":
        // assignedTo === user.uid AND deadline > now
        q = query(
          heistsRef,
          where("assignedTo", "==", user.uid),
          where("deadline", ">", now),
        );
        break;
      case "assigned":
        // createdBy === user.uid AND deadline > now
        q = query(
          heistsRef,
          where("createdBy", "==", user.uid),
          where("deadline", ">", now),
        );
        break;
      case "expired":
        // deadline <= now AND finalStatus != null
        q = query(
          heistsRef,
          where("deadline", "<=", now),
          where("finalStatus", "!=", null),
        );
        break;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const heistsData = snapshot.docs.map((doc) => doc.data());
        setHeists(heistsData);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [filter, user?.uid]);

  return { heists, loading, error };
}
```

**Update**: `lib/hooks/index.ts`

```typescript
export { useUser } from "./useUser";
export { useHeists } from "./useHeists";
```

### 2. Update Heists Page

**File**: `app/(dashboard)/heists/page.tsx`

Make it a client component and use the hook 3 times:

```typescript
'use client';

import { useHeists } from "@/lib/hooks/useUser";

export default function HeistsPage() {
  const { heists: activeHeists, loading: activeLoading } = useHeists("active");
  const { heists: assignedHeists, loading: assignedLoading } = useHeists("assigned");
  const { heists: expiredHeists, loading: expiredLoading } = useHeists("expired");

  return (
    <div className="page-content">
      <HeistSection title="Your Active Heists" heists={activeHeists} loading={activeLoading} />
      <HeistSection title="Heists You've Assigned" heists={assignedHeists} loading={assignedLoading} />
      <HeistSection title="All Expired Heists" heists={expiredHeists} loading={expiredLoading} />
    </div>
  );
}

function HeistSection({ title, heists, loading }: { title: string; heists: Heist[]; loading: boolean }) {
  if (loading) return <div className="heist-section"><h2>{title}</h2><p>Loading...</p></div>;
  return (
    <div className="heist-section">
      <h2>{title}</h2>
      <ul>{heists.map(h => <li key={h.id}>{h.title}</li>)}</ul>
    </div>
  );
}
```

### 3. Add Basic Styling

**File**: `app/(dashboard)/heists/page.module.css`

```css
@reference "../../globals.css";

.heist-section {
  margin-bottom: 2rem;
}

.heist-section h2 {
  color: var(--heading);
  margin-bottom: 1rem;
}

.heist-section ul {
  list-style: none;
  padding: 0;
}

.heist-section li {
  padding: 0.75rem;
  background: var(--light);
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}
```

## Critical Files

| File                                     | Action                            |
| ---------------------------------------- | --------------------------------- |
| `lib/hooks/useHeists.ts`                 | Create new hook file              |
| `lib/hooks/index.ts`                     | Export useHeists                  |
| `app/(dashboard)/heists/page.tsx`        | Convert to client, add hook usage |
| `app/(dashboard)/heists/page.module.css` | Create new CSS module             |
| `types/firestore/heist.ts`               | Reference only (already exists)   |

## Verification

1. Run `pnpm dev` and navigate to `/heists`
2. Verify three sections render with heist titles
3. Create a new heist via `/heists/create` - check it appears in real-time
4. Update heist deadline/finalStatus - verify it moves between sections
5. Sign out - verify empty state (no errors)
6. Check browser console for any errors

## Open Questions (from spec - now answered)

- Firestore collection: `COLLECTIONS.HEISTS` ✓
- Field names: `createdBy`, `assignedTo`, `deadline`, `finalStatus` ✓
- Auth: `useUser()` hook provides `user.uid` ✓
- Expired filter: All users' expired heists (spec says "all expired") ✓
