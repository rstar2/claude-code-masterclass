import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Input from "@/components/Input/Input";

describe("Input", () => {
  it("renders label with correct text", () => {
    render(<Input type="email" name="email" label="Email" />);

    const label = screen.getByLabelText("Email");
    expect(label).toBeInTheDocument();
  });

  it("renders input with correct type attribute", () => {
    render(<Input type="email" name="email" label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("applies required attribute when passed", () => {
    render(<Input type="email" name="email" label="Email" required />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeRequired();
  });

  it("applies minLength attribute when passed", () => {
    render(
      <Input type="password" name="password" label="Password" minLength={5} />,
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("minLength", "5");
  });

  it("has accessible association between label and input", () => {
    render(<Input type="email" name="email" label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email");
  });
});
