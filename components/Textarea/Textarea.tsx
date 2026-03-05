import styles from "./Textarea.module.css";

export interface TextareaProps {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
}

export default function Textarea({
  name,
  label,
  required = false,
  maxLength,
}: TextareaProps) {
  return (
    <div className={styles.textareaField}>
      <label htmlFor={name} className={styles.textareaLabel}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        maxLength={maxLength}
        className={styles.textarea}
        rows={4}
      />
    </div>
  );
}
