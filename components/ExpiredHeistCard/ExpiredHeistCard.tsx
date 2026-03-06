import styles from "./ExpiredHeistCard.module.css";
import { Clock, User, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export type HeistStatus = "success" | "failed";

export interface ExpiredHeistCardProps {
  id: string;
  title: string;
  targetUser: string;
  createdBy: string;
  deadline: string;
  status: HeistStatus;
}

export default function ExpiredHeistCard({
  id,
  title,
  targetUser,
  createdBy,
  deadline,
  status,
}: ExpiredHeistCardProps) {
  const isFailed = status === "failed";
  const StatusIcon = isFailed ? XCircle : CheckCircle2;
  const statusText = isFailed ? "Failed" : "Success";

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Link href={`/heists/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <div className={`${styles.statusBadge} ${styles[status]}`}>
          <StatusIcon
            size={12}
            className={styles.statusIcon}
            aria-hidden="true"
          />
          <span>{statusText}</span>
        </div>
      </div>

      <div className={styles.metadata}>
        <div className={styles.row}>
          <User size={12} className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>To:</span>
          <span className={styles.valuePrimary}>{targetUser}</span>
        </div>

        <div className={styles.row}>
          <User size={12} className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>By:</span>
          <span className={styles.valueSecondary}>{createdBy}</span>
        </div>

        <div className={styles.row}>
          <Clock size={12} className={styles.icon} aria-hidden="true" />
          <span className={styles.deadline}>{deadline}</span>
        </div>
      </div>
    </article>
  );
}
