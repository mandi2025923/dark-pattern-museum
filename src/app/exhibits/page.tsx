"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/lib/routes";

export default function LegacyExhibitsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(routes.archive);
  }, [router]);
  return null;
}
