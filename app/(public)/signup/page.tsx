"use client";

import { useState, SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import { createUserDocument } from "@/actions/user";
import { generateCodeName } from "@/lib/codename";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./page.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const codeName = generateCodeName();

    try {
      const userCredential = await signup(email, password, codeName);
      await createUserDocument(userCredential.user.uid, codeName);
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
        <h2 className="form-title">Sign Up for an Account</h2>

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
            autoComplete="new-password"
          />

          <SubmitButton disabled={isLoading}>Sign Up</SubmitButton>

          {error && <div className="text-error text-sm mt-2">{error}</div>}
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
