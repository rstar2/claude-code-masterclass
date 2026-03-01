"use client";

import { useAuthContext } from "@/components/AuthProvider";

export function useUser() {
  return useAuthContext();
}
