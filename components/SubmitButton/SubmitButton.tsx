"use client";

import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function SubmitButton({
  children,
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = disabled ?? pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="btn"
      aria-busy={isDisabled}
    >
      {isDisabled ? "Submitting..." : children}
    </button>
  );
}
