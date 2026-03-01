"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      router.push("/heists");
    } catch (err) {
      setError(getAuthErrorMessage(err as { code: string }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="center-content px-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="form-title">Log in to Your Account</h2>

        <form onSubmit={handleSubmit} className={styles.authForm}>
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

          <SubmitButton disabled={isLoading}>Log In</SubmitButton>

          {error && <div className="text-error text-sm mt-2">{error}</div>}
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
