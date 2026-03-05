"use server";

import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, userConverter } from "@/types/firestore";
import { serverTimestamp } from "firebase/firestore";
import { redirect } from "next/navigation";
import type { CreateHeistInput } from "@/types/firestore";

interface CreateHeistFormState {
  error?: string;
}

const DEADLINE_HOURS: Record<string, number> = {
  "24h": 24,
  "48h": 48,
  "72h": 72,
  "1w": 168,
};

export async function createHeist(
  prevState: CreateHeistFormState | null,
  formData: FormData,
): Promise<CreateHeistFormState> {
  // Extract form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assignedTo = formData.get("assignedTo") as string;
  const deadlineKey = formData.get("deadline") as string;
  const createdBy = formData.get("createdBy") as string;

  // Validation
  if (!title || !description || !assignedTo || !deadlineKey || !createdBy) {
    return { error: "All fields are required" };
  }

  if (title.length > 50) {
    return { error: "Title must be 50 characters or less" };
  }

  if (description.length > 200) {
    return { error: "Description must be 200 characters or less" };
  }

  // Validate deadline option
  const hours = DEADLINE_HOURS[deadlineKey];
  if (!hours) {
    return { error: "Invalid deadline option" };
  }

  // Get creator's codename
  const creatorRef = doc(db, "users", createdBy).withConverter(userConverter);
  const creatorSnap = await getDoc(creatorRef);
  if (!creatorSnap.exists()) {
    return { error: "Creator not found" };
  }
  const creatorData = creatorSnap.data();
  if (!creatorData.codeName) {
    return { error: "Creator codename not found" };
  }
  const createdByCodename = creatorData.codeName;

  // Get assignee's codename
  const assigneeRef = doc(db, "users", assignedTo).withConverter(userConverter);
  const assigneeSnap = await getDoc(assigneeRef);
  if (!assigneeSnap.exists()) {
    return { error: "Assignee not found" };
  }
  const assigneeData = assigneeSnap.data();
  if (!assigneeData.codeName) {
    return { error: "Assignee codename not found" };
  }
  const assignedToCodename = assigneeData.codeName;

  // Calculate deadline
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + hours);

  // Create heist document
  const heistData: Omit<CreateHeistInput, "createdAt"> & {
    createdAt: ReturnType<typeof serverTimestamp>;
  } = {
    title,
    description,
    createdBy,
    createdByCodename,
    assignedTo,
    assignedToCodename,
    deadline,
    finalStatus: null,
    createdAt: serverTimestamp(),
  };

  try {
    const heistsRef = collection(db, COLLECTIONS.HEISTS);
    await addDoc(heistsRef, heistData);
  } catch (error) {
    console.error("Error creating heist:", error);
    return { error: "Failed to create heist. Please try again." };
  }

  redirect("/heists");
}
