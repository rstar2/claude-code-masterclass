"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { getAllUsers } from "@/lib/users";
import { createHeist } from "@/actions/heist";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import Select, { type SelectOption } from "@/components/Select/Select";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./page.module.css";

const DEADLINE_OPTIONS: SelectOption[] = [
  { value: "24h", label: "24 hours" },
  { value: "48h", label: "48 hours" },
  { value: "72h", label: "72 hours" },
  { value: "1w", label: "1 week" },
];

export default function CreateHeistPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [assigneeOptions, setAssigneeOptions] = useState<SelectOption[]>([]);

  const [state, formAction] = useActionState(createHeist, null);

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await getAllUsers();

        // Create assignee options (exclude current user)
        const options = allUsers
          .filter((u) => u.id !== user?.uid)
          .map((u) => ({ value: u.id, label: u.codeName }));
        setAssigneeOptions(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <div className="center-content">
        <div className="page-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // No other users to assign to
  if (assigneeOptions.length === 0) {
    return (
      <div className="center-content">
        <div className="page-content">
          <h2 className="form-title">Create a New Heist</h2>
          <p className="text-body mt-4">
            No other agents available. You cannot assign a heist to yourself.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="center-content">
      <div className="page-content">
        <h2 className="form-title">Create a New Heist</h2>

        <form action={formAction} className={styles.heistForm}>
          {/* Hidden field for creator's uid */}
          <input type="hidden" name="createdBy" value={user.uid} />

          <Input
            type="text"
            name="title"
            label="Mission Title"
            required
            maxLength={50}
            autoComplete="off"
          />

          <Textarea
            name="description"
            label="Mission Description"
            required
            maxLength={200}
          />

          <Select
            name="assignedTo"
            label="Assign To"
            options={assigneeOptions}
            required
          />

          <Select
            name="deadline"
            label="Deadline"
            options={DEADLINE_OPTIONS}
            required
            defaultValue="48h"
          />

          <SubmitButton>Create Heist</SubmitButton>

          {state?.error && (
            <div className="text-error text-sm mt-2">{state.error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
