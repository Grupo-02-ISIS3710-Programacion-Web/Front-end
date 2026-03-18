"use client";

import AuthRequiredCard from "@/components/auth/AuthRequiredCard";
import { useSearchParams } from "next/navigation";

export default function NotLoggedPage() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/community";

  return <AuthRequiredCard redirectPath={redirectPath} />;
}
