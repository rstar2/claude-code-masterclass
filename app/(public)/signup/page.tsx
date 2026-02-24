"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/actions/auth";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./page.module.css";

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, null);

  return (
    <div className="center-content px-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="form-title">Sign Up for an Account</h2>

        <form action={formAction} className={styles.authForm}>
          <Input
            type="email"
            name="email"
            label="Email"
            required
            autoComplete="email"
          />

          <PasswordInput
            name="password"
            label="Password"
            required
            minLength={5}
            autoComplete="new-password"
          />

          <SubmitButton>Sign Up</SubmitButton>
        </form>

        <p className={styles.authFooter}>
          Already have an account?{" "}
          <Link href="/login" className={styles.authLink}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
