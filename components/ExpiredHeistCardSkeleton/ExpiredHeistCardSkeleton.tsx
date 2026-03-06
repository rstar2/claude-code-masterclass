import styles from "./ExpiredHeistCardSkeleton.module.css";

export default function ExpiredHeistCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.statusBadge} />
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
        </div>
      </div>
    </div>
  );
}
