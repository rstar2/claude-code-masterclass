"use server";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function createUserDocument(
  uid: string,
  codeName: string,
): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    id: uid,
    codeName,
  });
}
