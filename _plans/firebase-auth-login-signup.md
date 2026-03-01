# Firebase Auth Integration Plan

## Context

Login and signup pages exist with UI complete but server actions are stubs. Firebase is configured with Auth and Firestore. Need to implement actual authentication flow with user document creation on signup.

---

## Implementation Plan

### 1. Create Codename Generator (`lib/codename.ts`)

New utility with 3 word sets (~40 words each), heist-themed:

- **Adjectives**: Fierce, Silent, Shadow, Cunning, Swift, Ghost, Dark, Neon, Crimson, Iron, Stealth, Rapid, Lethal, Mystic, Golden, Silver, Bronze, Diamond, Savage, Brutal, Chaotic, Phantom, Wicked, Wild, Frozen, Burning, Electric, Toxic, Cosmic, Divine, Ancient, Future, Digital, Analog, Quantum, Atomic, Nuclear, Plasma, Sonic, Mystic, Rogue
- **Nouns**: Tiger, Blade, Storm, Phoenix, Viper, Raven, Falcon, Wolf, Dragon, Shadow, Cobra, Panther, Scorpion, Hawk, Eagle, Shark, Bear, Lion, Fox, Owl, Spider, Wasp, Bat, Cat, Dog, Rat, Pig, Cow, Bull, Horse, Zebra, Deer, Moose, Elk, Ram, Goat, Sheep, Fish, Bird, Snake, Lizard, Turtle
- **Agents**: Hunter, Striker, Walker, Runner, Seeker, Breaker, Thief, Agent, Operative, Assassin, Mercenary, Soldier, Warrior, Knight, Paladin, Ranger, Scout, Sniper, Spy, Ninja, Samurai, Viking, Pirate, Bandit, Outlaw, Renegade, Rebel, Legend, Champion, Master, Expert, Pro, Elite, Ace, Boss, King, Queen, Prince, Princess

```typescript
export function generateCodeName(): string {
  // Random word from each set, concatenate as PascalCase
}
```

### 2. Create Error Mapper (`lib/auth-errors.ts`)

Map Firebase Auth error codes to user-friendly messages:
| Firebase Code | Message |
|---------------|---------|
| `auth/invalid-credential` | Invalid email or password |
| `auth/email-already-in-use` | Email already registered |
| `auth/invalid-email` | Invalid email address |
| `auth/weak-password` | Password is too weak |
| `auth/network-request-failed` | Network error. Check connection |
| `auth/too-many-requests` | Too many attempts. Try again later |
| `auth/user-disabled` | This account has been disabled |

### 3. Implement Auth Actions (`actions/auth.ts`)

**loginAction:**

```typescript
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";

// 1. Extract email/password from FormData
// 2. Try: signInWithEmailAndPassword(auth, email, password)
// 3. Catch: return { errors: { email: [getAuthErrorMessage(error)] } }
// 4. Success: redirect("/heists")
```

**signupAction:**

```typescript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { generateCodeName } from "@/lib/codename";
import { getAuthErrorMessage } from "@/lib/auth-errors";

// 1. Extract email/password from FormData
// 2. Try: createUserWithEmailAndPassword(auth, email, password)
// 3. On success: setDoc(doc(db, "users", user.uid), { id: user.uid, codeName: generateCodeName() })
// 4. Catch: return { errors: { email: [getAuthErrorMessage(error)] } }
// 5. Success: redirect("/heists")
```

### 4. Update Login Page (`app/(public)/login/page.tsx`)

Add error display below form:

```tsx
{
  state?.errors?.email && (
    <div className="text-error text-sm mt-2">{state.errors.email[0]}</div>
  );
}
```

### 5. Update Signup Page (`app/(public)/signup/page.tsx`)

Add same error display pattern as login.

---

## Files to Create

| File                         | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `lib/codename.ts`            | Codename generator with 3 word sets |
| `lib/auth-errors.ts`         | Firebase error code mapper          |
| `tests/lib/codename.test.ts` | Codename generation tests           |

## Files to Modify

| File                           | Changes                                           |
| ------------------------------ | ------------------------------------------------- |
| `actions/auth.ts`              | Implement loginAction, signupAction with Firebase |
| `app/(public)/login/page.tsx`  | Add error display                                 |
| `app/(public)/signup/page.tsx` | Add error display                                 |

---

## Verification

1. Start dev server
2. Test signup:
   - Navigate to `/signup`
   - Enter email/password
   - Submit → verify redirect to `/heists`
   - Check Firestore "users" collection for new document with id and codeName
3. Test login:
   - Navigate to `/login`
   - Enter credentials
   - Submit → verify redirect to `/heists`
4. Test errors:
   - Wrong password → "Invalid email or password"
   - Duplicate signup → "Email already registered"
5. Run tests: `npm test` for codename tests
