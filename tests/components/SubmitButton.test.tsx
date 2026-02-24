import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import SubmitButton from "@/components/SubmitButton/SubmitButton";

// Mock useFormStatus
vi.mock("react-dom", () => ({
  useFormStatus: () => ({ pending: false }),
}));

describe("SubmitButton", () => {
  it("renders children", () => {
    render(<SubmitButton>Submit</SubmitButton>);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("has type submit", () => {
    render(<SubmitButton>Submit</SubmitButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("has aria-busy attribute", () => {
    render(<SubmitButton>Submit</SubmitButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy");
  });
});
