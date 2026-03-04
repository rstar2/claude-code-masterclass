import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUser } from "@/lib/hooks/useUser";
import PublicLayout from "@/app/(public)/layout";

// Mock Next.js router
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// Mock useUser hook
vi.mock("@/lib/hooks/useUser");

// Mock RouteLoader
vi.mock("@/components/RouteLoader", () => ({
  RouteLoader: () => <div data-testid="route-loader">Loading...</div>,
}));

describe("PublicLayout", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("should show loader while loading", () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <PublicLayout>
        {" "}
        <div>Child content</div>{" "}
      </PublicLayout>,
    );

    expect(screen.getByTestId("route-loader")).toBeInTheDocument();
    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
  });

  it("should redirect to /heists when authenticated", async () => {
    const mockUser = { uid: "user-123", email: "test@example.com" };
    vi.mocked(useUser).mockReturnValue({
      user: mockUser as any,
      loading: false,
    });

    render(
      <PublicLayout>
        {" "}
        <div>Child content</div>{" "}
      </PublicLayout>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/heists");
    });
  });

  it("should render children when unauthenticated", () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <PublicLayout>
        {" "}
        <div>Child content</div>{" "}
      </PublicLayout>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
