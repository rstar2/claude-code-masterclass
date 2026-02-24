import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock the server action
vi.mock("@/app/actions/auth", () => ({
  loginAction: vi.fn(),
}));

// Mock the components to avoid complex setup
vi.mock("@/components/Input/Input", () => ({
  default: ({
    label,
    name,
    type,
    required,
  }: {
    label: string;
    name: string;
    type: string;
    required?: boolean;
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} required={required} />
    </div>
  ),
}));

vi.mock("@/components/PasswordInput/PasswordInput", () => ({
  default: ({
    label,
    name,
    minLength,
  }: {
    label: string;
    name: string;
    minLength?: number;
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type="password" name={name} minLength={minLength} />
    </div>
  ),
}));

vi.mock("@/components/SubmitButton/SubmitButton", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <button type="submit">{children}</button>
  ),
}));

import LoginPage from "@/app/(public)/login/page";

describe("LoginPage", () => {
  it("renders login form with email field", () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders login form with password field", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("password field has minLength={5}", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("minLength", "5");
  });

  it("renders submit button", () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: "Log In" });
    expect(submitButton).toBeInTheDocument();
  });

  it("renders link to signup page", () => {
    render(<LoginPage />);

    const signupLink = screen.getByRole("link", { name: /sign up/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
