"use client";

import { useHeists } from "@/lib/hooks";
import type { HeistFilter } from "@/lib/hooks/useHeists";
import HeistCard from "@/components/HeistCard";
import HeistCardSkeleton from "@/components/HeistCardSkeleton";
import ExpiredHeistCard, {
  type HeistStatus,
} from "@/components/ExpiredHeistCard";
import ExpiredHeistCardSkeleton from "@/components/ExpiredHeistCardSkeleton";
import styles from "./page.module.css";

export default function HeistsPage() {
  return (
    <div className="page-content">
      <HeistSection title="Your Active Heists" filter="active" />
      <HeistSection title="Heists You've Assigned" filter="assigned" />
      <HeistSection title="All Expired Heists" filter="expired" />
    </div>
  );
}

function getExpiredStatus(finalStatus: string | null): HeistStatus {
  if (finalStatus === "failure") return "failed";
  if (finalStatus === "success") return "success";
  console.warn(
    `Unexpected finalStatus: ${finalStatus}, defaulting to "failed"`,
  );
  return "failed";
}

function HeistSection({
  title,
  filter,
}: {
  title: string;
  filter: HeistFilter;
}) {
  const { heists, loading, error } = useHeists(filter);
  const isExpired = filter === "expired";
  const SkeletonComponent = isExpired
    ? ExpiredHeistCardSkeleton
    : HeistCardSkeleton;

  let content;
  if (loading) {
    content = (
      <div className={styles.grid} aria-live="polite" aria-busy="true">
        <span className="sr-only">Loading heists...</span>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    );
  } else if (error) {
    content = <p className={styles.error}>Error: {error.message}</p>;
  } else if (heists.length === 0) {
    content = <p className={styles.empty}>No heists found</p>;
  } else {
    content = (
      <div className={styles.grid}>
        {heists.map((h) => {
          const CardComponent: React.ComponentType = isExpired ? ExpiredHeistCard : HeistCard;
          const cardProps = {
            id: h.id,
            title: h.title,
            targetUser: `@${h.assignedToCodename}`,
            createdBy: `@${h.createdByCodename}`,
            deadline: formatDeadline(h.deadline),
            status: isExpired ? getExpiredStatus(h.finalStatus) : filter,
          };

          return <CardComponent key={h.id} {...cardProps} />;
        })}
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {content}
    </div>
  );
}

function formatDeadline(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
