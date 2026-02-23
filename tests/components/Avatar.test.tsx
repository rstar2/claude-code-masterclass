import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Avatar from "@/components/Avatar";

describe("Avatar", () => {
  it("renders successfully", () => {
    render(<Avatar name="Rumen Neshev" />);
    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
  });

  it("displays first letters of name (max 2)", () => {
    render(<Avatar name="Rumen Neshev" />);
    expect(screen.getByText("RN")).toBeInTheDocument();
  });

  it("handles single name", () => {
    render(<Avatar name="Rumen" />);
    expect(screen.getByText("R")).toBeInTheDocument();
  });

  it("handles names with more than 2 words", () => {
    render(<Avatar name="Rumen Middle Neshev" />);
    expect(screen.getByText("RN")).toBeInTheDocument();
  });
});
