import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Firebase Auth
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({ appName: "mockFirebaseApp" })),
  onAuthStateChanged: vi.fn(),
}));

// Mock Firebase App
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "mockFirebaseApp" })),
  getApps: vi.fn(() => []),
}));

// Mock Firebase Firestore
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({ appName: "mockFirebaseApp" })),
}));
