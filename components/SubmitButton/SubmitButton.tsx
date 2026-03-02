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
  // NOTE: because useFormStatus() will work ONLY when the parent form uses an action,
  // e.g. <form action={...}> ... <SubmitButton/> </form>
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
