"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./page.module.css";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="center-content px-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="form-title">Log in to Your Account</h2>

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
            autoComplete="current-password"
          />

          <SubmitButton>Log In</SubmitButton>
        </form>

        <p className={styles.authFooter}>
          Don't have an account?{" "}
          <Link href="/signup" className={styles.authLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
