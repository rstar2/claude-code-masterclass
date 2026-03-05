import styles from "./HeistCardSkeleton.module.css";

export default function HeistCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.menuIcon} />
      </div>

      <div className={styles.metadata}>
        <div className={styles.row}>
          <div className={styles.icon} />
          <div className={styles.label} />
          <div className={styles.value} />
        </div>

        <div className={styles.row}>
          <div className={styles.icon} />
          <div className={styles.label} />
          <div className={styles.value} />
        </div>

        <div className={styles.row}>
          <div className={styles.icon} />
          <div className={styles.deadline} />
          <div className={styles.status} />
        </div>
      </div>
    </div>
  );
}
