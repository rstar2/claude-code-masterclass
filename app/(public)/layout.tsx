"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { RouteLoader } from "@/components/RouteLoader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/heists");
    }
  }, [user, router]);

  if (loading) {
    return <RouteLoader />;
  }

  if (user) {
    // will redirect in the useEffect
    return <RouteLoader />;
  }

  return <main className="public">{children}</main>;
}
