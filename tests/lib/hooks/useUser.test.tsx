import { render, renderHook, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthProvider } from "@/components/AuthProvider";
import { useUser } from "@/lib/hooks/useUser";
import * as authModule from "firebase/auth";
import type { User } from "firebase/auth";

// Mock Firebase User
const createMockUser = (uid: string, email: string): User => ({
  uid,
  email,
  emailVerified: true,
  isAnonymous: false,
  providerData: [{ providerId: "password", uid }],
  stsTokenManager: { accessToken: "mock-token", expirationTime: 1234567890 },
  delete: vi.fn(),
  getIdToken: vi.fn(async () => "mock-id-token"),
  getIdTokenResult: vi.fn(async () => ({
    token: "mock-token",
    signInProvider: "password",
  })),
  linkWithCredential: vi.fn(),
  linkWithPhoneNumber: vi.fn(),
  linkWithPopup: vi.fn(),
  linkWithRedirect: vi.fn(),
  reauthenticateWithCredential: vi.fn(),
  reauthenticateWithPhoneNumber: vi.fn(),
  reauthenticateWithPopup: vi.fn(),
  reauthenticateWithRedirect: vi.fn(),
  reload: vi.fn(),
  sendEmailVerification: vi.fn(),
  toJSON: vi.fn(() => ({})),
  unlink: vi.fn(),
  updateEmail: vi.fn(),
  updatePassword: vi.fn(),
  updatePhoneNumber: vi.fn(),
  updateProfile: vi.fn(),
  metadata: { creationTime: "1234567890", lastSignInTime: "1234567890" },
  providerId: "firebase",
  refreshToken: "mock-refresh-token",
  tenantId: null,
  displayName: null,
  photoURL: null,
});

describe("useUser", () => {
  let mockUnsubscribe: ReturnType<typeof vi.fn>;
  let authCallback: ((user: User | null) => void) | null = null;

  beforeEach(() => {
    mockUnsubscribe = vi.fn();
    vi.mocked(authModule.onAuthStateChanged).mockImplementation(
      (_auth, callback) => {
        authCallback = callback as (user: User | null) => void;
        return mockUnsubscribe;
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should return loading: true during initial auth check", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
  });

  it("should return user: null when not authenticated", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    // Simulate auth check returning no user
    authCallback!(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toBe(null);
    });
  });

  it("should return Firebase User object when authenticated", async () => {
    const mockUser = createMockUser("user-123", "test@example.com");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    // Simulate auth check returning a user
    authCallback!(mockUser);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it("should update when auth state changes", async () => {
    const mockUser = createMockUser("user-123", "test@example.com");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    // Initial state: not authenticated
    authCallback!(null);

    await waitFor(() => {
      expect(result.current.user).toBe(null);
      expect(result.current.loading).toBe(false);
    });

    // User logs in
    authCallback!(mockUser);

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    // User logs out
    authCallback!(null);

    await waitFor(() => {
      expect(result.current.user).toBe(null);
    });
  });

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => useUser());
    }).toThrow("useAuthContext must be used within an AuthProvider");

    console.error = originalError;
  });
});
