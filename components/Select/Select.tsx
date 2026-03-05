import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  required?: boolean;
  defaultValue?: string;
}

export default function Select({
  name,
  label,
  options,
  required = false,
  defaultValue,
}: SelectProps) {
  return (
    <div className={styles.selectField}>
      <label htmlFor={name} className={styles.selectLabel}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
