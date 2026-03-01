import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

// Mock the server action
vi.mock("@/actions/auth", () => ({
  signupAction: vi.fn(),
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

import SignupPage from "@/app/(public)/signup/page";

describe("SignupPage", () => {
  it("renders signup form with email field", () => {
    render(<SignupPage />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders signup form with password field", () => {
    render(<SignupPage />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("password field has minLength={5}", () => {
    render(<SignupPage />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("minLength", "5");
  });

  it("renders submit button", () => {
    render(<SignupPage />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    expect(submitButton).toBeInTheDocument();
  });

  it("renders link to login page", () => {
    render(<SignupPage />);

    const loginLink = screen.getByRole("link", { name: /log in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
