import styles from "./HeistCard.module.css";
import { Clock, Clock8, User } from "lucide-react";
import Link from "next/link";

export interface HeistCardProps {
  id: string;
  title: string;
  targetUser: string;
  createdBy: string;
  deadline: string;
  status: "active" | "assigned" | "expired";
}

export default function HeistCard({
  id,
  title,
  targetUser,
  createdBy,
  deadline,
  status,
}: HeistCardProps) {
  const statusText =
    status === "expired"
      ? "Overdue"
      : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Link href={`/heists/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <button className={styles.menuButton} aria-label="More options">
          <Clock8 size={16} />
        </button>
      </div>

      <div className={styles.metadata}>
        <div className={styles.row}>
          <User size={12} className={styles.icon} />
          <span className={styles.label}>To:</span>
          <span className={styles.valuePrimary}>{targetUser}</span>
        </div>

        <div className={styles.row}>
          <User size={12} className={styles.icon} />
          <span className={styles.label}>By:</span>
          <span className={styles.valueSecondary}>{createdBy}</span>
        </div>

        <div className={styles.row}>
          <Clock size={12} className={styles.icon} />
          <span className={styles.label}>{deadline}</span>
          <span className={`${styles.status} ${styles[status]}`}>
            {statusText}
          </span>
        </div>
      </div>
    </article>
  );
}
