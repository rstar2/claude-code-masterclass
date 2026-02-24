import styles from "./Input.module.css";

export interface InputProps {
  type: "email" | "password" | "text";
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}

export default function Input({
  type,
  name,
  label,
  required = false,
  minLength,
  autoComplete,
}: InputProps) {
  return (
    <div className={styles.inputField}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className={styles.input}
      />
    </div>
  );
}
