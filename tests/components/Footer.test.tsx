import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders successfully", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year), "i"))).toBeInTheDocument();
  });

  it("displays copyright and creator text", () => {
    render(<Footer />);
    expect(screen.getByText(/©/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Created by Rumen Claude Code/i),
    ).toBeInTheDocument();
  });
});
