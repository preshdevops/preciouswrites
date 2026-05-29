"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState("loading");
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      if (data.authenticated) {
        setStatus("authenticated");
      } else {
        router.replace("/admin");
      }
    } catch {
      router.replace("/admin");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-sans text-sm text-foreground/60">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
