"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import styles from "./PasswordInput.module.css";

export interface PasswordInputProps {
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}

export default function PasswordInput({
  name,
  label,
  required = false,
  minLength,
  autoComplete,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.inputField}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className={styles.passwordInput}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={styles.toggleButton}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
