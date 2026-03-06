# Expired Heist Card - Code Review Fixes

## Context

The `ExpiredHeistCard` component and skeleton were created to display expired/completed heists with success or failed status indicators. A code review revealed accessibility and code quality issues that should be addressed.

**Files Created:**

- `components/ExpiredHeistCard/ExpiredHeistCard.tsx`
- `components/ExpiredHeistCard/ExpiredHeistCard.module.css`
- `components/ExpiredHeistCardSkeleton/ExpiredHeistCardSkeleton.tsx`
- `components/ExpiredHeistCardSkeleton/ExpiredHeistCardSkeleton.module.css`

**Files Modified:**

- `app/(dashboard)/heists/page.tsx`

---

## Issues Found

### 🔴 Serious (1)

1. **Decorative icons not hidden from screen readers** - `ExpiredHeistCard.tsx`
   - `Clock`, `User`, `CheckCircle2`, `XCircle` icons need `aria-hidden="true"`
   - Causes redundant announcements for screen reader users

### 🟡 Moderate (3)

2. **Loading state not announced** - `page.tsx`
   - Skeleton loaders lack `aria-live` region
   - Screen readers won't announce loading state

3. **Significant code duplication** - `page.tsx` lines 49-73
   - ExpiredHeistCard and HeistCard rendering duplicated in ternary
   - Same props passed with only `status` differing

4. **Missing type safety for status mapping** - `page.tsx` line 61
   - `h.finalStatus === "failure" ? "failed" : "success"` silently defaults to "success"
   - Could show incorrect heist outcomes for unexpected values

### 🔵 Minor (2)

5. **Inconsistent status type naming** - `ExpiredHeistCard.tsx`
   - `"success"` (noun) vs `"failed"` (adjective) - mixed grammatical forms

6. **Status badge high-contrast mode** - CSS (optional)
   - Could add explicit styles for `prefers-contrast: high`

### ✅ Verified Accessible Patterns

- Semantic `<article>` and `<h3>` structure
- Proper link structure with clear purpose
- Metadata organized with icon + label pairs
- No keyboard navigation blockers
- Loading skeletons maintain layout stability

---

## Implementation Plan

### 1. Add sr-only utility class

**File:** `app/globals.css`

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 2. Add aria-hidden to decorative icons

**File:** `components/ExpiredHeistCard/ExpiredHeistCard.tsx`

Add `aria-hidden="true"` to all Lucide icons:

- `<User size={12} className={styles.icon} aria-hidden="true" />`
- `<Clock size={12} className={styles.icon} aria-hidden="true" />`
- `<StatusIcon size={12} className={styles.statusIcon} aria-hidden="true" />`

### 3. Announce loading state

**File:** `app/(dashboard)/heists/page.tsx`

Add `aria-live="polite"` and `aria-busy="true"` to the loading container:

```tsx
if (loading) {
  content = (
    <div className={styles.grid} aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading heists...</span>
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
```

### 4. Refactor card rendering (reduce duplication)

**File:** `app/(dashboard)/heists/page.tsx`

Replace the ternary with dynamic component pattern:

```tsx
{
  heists.map((h) => {
    const CardComponent = isExpired ? ExpiredHeistCard : HeistCard;
    const cardProps = {
      key: h.id,
      id: h.id,
      title: h.title,
      targetUser: `@${h.assignedToCodename}`,
      createdBy: `@${h.createdByCodename}`,
      deadline: formatDeadline(h.deadline),
      status: isExpired
        ? h.finalStatus === "failure"
          ? "failed"
          : "success"
        : filter,
    };

    return <CardComponent {...cardProps} />;
  });
}
```

### 5. Add status validation helper

**File:** `app/(dashboard)/heists/page.tsx`

Add explicit validation for unexpected `finalStatus` values:

```tsx
function getExpiredStatus(finalStatus: string | null): HeistStatus {
  if (finalStatus === "failure") return "failed";
  if (finalStatus === "success") return "success";
  console.warn(
    `Unexpected finalStatus: ${finalStatus}, defaulting to "failed"`,
  );
  return "failed";
}

// In map:
status: isExpired ? getExpiredStatus(h.finalStatus) : filter;
```

### 6. (Optional) Unify status type naming

**File:** `components/ExpiredHeistCard/ExpiredHeistCard.tsx`

Change from `"success" | "failed"` to `"succeeded" | "failed"` for consistency.

**Note:** This would require updating the type, component logic, and page usage. Consider if worth the change.

---

## Checklist

- [ ] Add `.sr-only` utility to `globals.css`
- [ ] Add `aria-hidden="true"` to all icons in `ExpiredHeistCard.tsx`
- [ ] Add `aria-live` and `sr-only` text to loading state in `page.tsx`
- [ ] Refactor card rendering to use dynamic component pattern
- [ ] Add `getExpiredStatus` helper function
- [ ] (Optional) Unify status type naming
