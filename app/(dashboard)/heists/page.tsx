"use client";

import { useHeists } from "@/lib/hooks";
import type { HeistFilter } from "@/lib/hooks/useHeists";
import HeistCard from "@/components/HeistCard";
import HeistCardSkeleton from "@/components/HeistCardSkeleton";
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

function HeistSection({
  title,
  filter,
}: {
  title: string;
  filter: HeistFilter;
}) {
  const { heists, loading, error } = useHeists(filter);

  let content;
  if (loading) {
    content = (
      <div className={styles.grid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <HeistCardSkeleton key={i} />
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
        {heists.map((h) => (
          <HeistCard
            key={h.id}
            id={h.id}
            title={h.title}
            targetUser={`@${h.assignedToCodename}`}
            createdBy={`@${h.createdByCodename}`}
            deadline={formatDeadline(h.deadline)}
            status={filter}
          />
        ))}
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
