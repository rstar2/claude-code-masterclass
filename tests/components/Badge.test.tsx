import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Badge from "@/components/Badge";

describe("Badge", () => {
  it("renders successfully", () => {
    render(<Badge />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays default text", () => {
    render(<Badge />);
    expect(screen.getByRole("status")).toHaveTextContent("Badge");
  });

  it("displays custom text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByRole("status")).toHaveTextContent("New");
  });
});
