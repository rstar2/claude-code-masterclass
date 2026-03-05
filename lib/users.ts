import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, userConverter, type User } from "@/types/firestore";

export async function getAllUsers(): Promise<User[]> {
  const usersRef = collection(db, COLLECTIONS.USERS).withConverter(userConverter);
  const snapshot = await getDocs(usersRef);
  return snapshot.docs
    .map((doc) => doc.data())
    .filter(
      (user): user is User =>
        user.id !== undefined && user.codeName !== undefined,
    );
}
