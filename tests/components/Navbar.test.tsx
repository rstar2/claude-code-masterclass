import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

// Mock auth modules
vi.mock("@/lib/hooks/useUser", () => ({
  useUser: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  logout: vi.fn(),
}));

// component imports
import Navbar from "@/components/Navbar";
import { useUser } from "@/lib/hooks/useUser";
import { logout } from "@/lib/auth";

describe("Navbar", () => {
  it("renders the main heading", () => {
    vi.mocked(useUser).mockReturnValue({ user: null, loading: false });
    render(<Navbar />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("renders the Create Heist link", () => {
    vi.mocked(useUser).mockReturnValue({ user: null, loading: false });
    render(<Navbar />);

    const createLink = screen.getByRole("link", { name: /create new heist/i });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/heists/create");
  });

  describe("when user is logged in", () => {
    it("renders the logout button", () => {
      const mockUser = { uid: "123", email: "test@example.com" };
      vi.mocked(useUser).mockReturnValue({ user: mockUser, loading: false });
      vi.mocked(logout).mockResolvedValue(undefined);

      render(<Navbar />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      expect(logoutButton).toBeInTheDocument();
    });

    it("calls logout when logout button is clicked", async () => {
      const mockUser = { uid: "123", email: "test@example.com" };
      vi.mocked(useUser).mockReturnValue({ user: mockUser, loading: false });
      vi.mocked(logout).mockResolvedValue(undefined);

      render(<Navbar />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      await userEvent.click(logoutButton);

      expect(logout).toHaveBeenCalledTimes(1);
    });

    it("shows loading state while logging out", async () => {
      const mockUser = { uid: "123", email: "test@example.com" };
      vi.mocked(useUser).mockReturnValue({ user: mockUser, loading: false });
      vi.mocked(logout).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<Navbar />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      await userEvent.click(logoutButton);

      expect(
        screen.getByRole("button", { name: "Logging out..." }),
      ).toBeInTheDocument();
    });
  });

  describe("when user is not logged in", () => {
    it("does not render the logout button", () => {
      vi.mocked(useUser).mockReturnValue({ user: null, loading: false });

      render(<Navbar />);

      const logoutButton = screen.queryByRole("button", { name: "Logout" });
      expect(logoutButton).not.toBeInTheDocument();
    });
  });
});
