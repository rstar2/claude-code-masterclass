import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export interface AuthError {
  code: string;
  message: string;
}

export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signup(
  email: string,
  password: string,
  displayName?: string,
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  return userCredential;
}
