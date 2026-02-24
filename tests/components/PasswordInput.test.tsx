import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import PasswordInput from "@/components/PasswordInput/PasswordInput";

describe("PasswordInput", () => {
  it("renders password input with type='password' by default", () => {
    render(<PasswordInput name="password" label="Password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders Eye icon initially", () => {
    render(<PasswordInput name="password" label="Password" />);

    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it("toggles to EyeOff icon when clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordInput name="password" label="Password" />);

    const toggleButton = screen.getByRole("button", { name: /show password/i });
    await user.click(toggleButton);

    const updatedButton = screen.getByRole("button", {
      name: /hide password/i,
    });
    expect(updatedButton).toBeInTheDocument();
  });

  it("changes input type to 'text' when toggle clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordInput name="password" label="Password" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    await user.click(toggleButton);

    expect(input.type).toBe("text");
  });

  it("changes input type back to 'password' when toggle clicked again", async () => {
    const user = userEvent.setup();
    render(<PasswordInput name="password" label="Password" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(input.type).toBe("password");
  });

  it("toggle button has aria-label", () => {
    render(<PasswordInput name="password" label="Password" />);

    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(toggleButton).toHaveAttribute("aria-label");
  });
});
