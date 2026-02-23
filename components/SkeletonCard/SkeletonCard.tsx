import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.avatar} />
        <div className={styles.titleLines}>
          <div className={styles.titleLinePrimary} />
          <div className={styles.titleLineSecondary} />
        </div>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.bodyLinePrimary} />
        <div className={styles.bodyLinePrimary} />
        <div className={styles.bodyLineTruncated} />
      </div>
    </div>
  );
}
