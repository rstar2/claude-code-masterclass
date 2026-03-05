"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/types/firestore";
import { heistConverter, type Heist } from "@/types/firestore/heist";
import { useUser } from "./useUser";

export type HeistFilter = "active" | "assigned" | "expired";

interface UseHeistsResult {
  heists: Heist[];
  loading: boolean;
  error: Error | null;
}

export function useHeists(filter: HeistFilter): UseHeistsResult {
  const { user } = useUser();
  const [heists, setHeists] = useState<Heist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setHeists([]);
      setLoading(false);
      return;
    }

    // Build query based on filter
    const heistsRef = collection(db, COLLECTIONS.HEISTS).withConverter(
      heistConverter,
    );

    const now = new Date();

    let q;
    switch (filter) {
      case "active":
        // assignedTo === user.uid AND deadline > now
        q = query(
          heistsRef,
          where("assignedTo", "==", user.uid),
          where("deadline", ">", now),
        );
        break;
      case "assigned":
        // createdBy === user.uid AND deadline > now
        q = query(
          heistsRef,
          where("createdBy", "==", user.uid),
          where("deadline", ">", now),
        );
        break;
      case "expired":
        // deadline <= now AND finalStatus != null
        q = query(
          heistsRef,
          where("deadline", "<=", now),
          where("finalStatus", "!=", null),
        );
        break;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const heistsData = snapshot.docs.map((doc) => doc.data());
        setHeists(heistsData);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [filter, user?.uid]);

  return { heists, loading, error };
}
