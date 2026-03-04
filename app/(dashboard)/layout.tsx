"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useUser } from "@/lib/hooks/useUser";
import { RouteLoader } from "@/components/RouteLoader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <RouteLoader />;
  }

  if (!user) {
    // will redirect in the useEffect
    return <RouteLoader />;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
