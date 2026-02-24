"use client";

import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn"
      aria-busy={pending}
    >
      {pending ? "Submitting..." : children}
    </button>
  );
}
