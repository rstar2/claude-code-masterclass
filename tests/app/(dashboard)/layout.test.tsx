import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUser } from "@/lib/hooks/useUser";
import DashboardLayout from "@/app/(dashboard)/layout";

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

// Mock Navbar
vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("should show loader while loading", () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <DashboardLayout>
        {" "}
        <div>Child content</div>{" "}
      </DashboardLayout>,
    );

    expect(screen.getByTestId("route-loader")).toBeInTheDocument();
    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
  });

  it("should redirect to /login when unauthenticated", async () => {
    vi.mocked(useUser).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <DashboardLayout>
        {" "}
        <div>Child content</div>{" "}
      </DashboardLayout>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("should render children and navbar when authenticated", () => {
    const mockUser = { uid: "user-123", email: "test@example.com" };
    vi.mocked(useUser).mockReturnValue({
      user: mockUser as any,
      loading: false,
    });

    render(
      <DashboardLayout>
        {" "}
        <div>Child content</div>{" "}
      </DashboardLayout>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
