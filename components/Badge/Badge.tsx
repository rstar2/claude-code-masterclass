
interface BadgeProps {
  children?: string;
}

export default function Badge({ children = "Badge" }: BadgeProps) {
  return (
    <span role="status" className={styles.badge}>
      {children}
    </span>
  );
}
