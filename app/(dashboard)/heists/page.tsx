"use client";

import { useHeists } from "@/lib/hooks";
import type { HeistFilter } from "@/lib/hooks/useHeists";
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
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p className={styles.error}>Error: {error.message}</p>;
  } else {
    content = (
      <ul className={styles.list}>
        {heists.map((h) => (
          <li key={h.id}>{h.title}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {content}
    </div>
  );
}
