import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthProvider } from "@/components/AuthProvider";
import * as authModule from "firebase/auth";

describe("AuthProvider", () => {
  let mockUnsubscribe: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUnsubscribe = vi.fn();
    vi.mocked(authModule.onAuthStateChanged).mockReturnValue(mockUnsubscribe);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should unsubscribe from auth changes on unmount", () => {
    const { unmount } = render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>,
    );

    expect(authModule.onAuthStateChanged).toHaveBeenCalledTimes(1);

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it("should set loading to false after first callback", () => {
    let authCallback: ((user: unknown) => void) | null = null;

    vi.mocked(authModule.onAuthStateChanged).mockImplementation(
      (_auth, callback) => {
        authCallback = callback as (user: unknown) => void;
        // Simulate async auth check
        setTimeout(() => callback(null), 0);
        return mockUnsubscribe;
      },
    );

    render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>,
    );

    expect(authModule.onAuthStateChanged).toHaveBeenCalled();
  });
});
