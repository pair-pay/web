"use client";

import { AuthProvider } from "@/contexts/auth/presentation/providers/auth-provider/AuthProvider";

export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
