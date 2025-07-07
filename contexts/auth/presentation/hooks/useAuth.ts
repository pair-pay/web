"use client";
import { useSession } from "next-auth/react";
import { AuthService } from "../../application/services/auth.service";
import { nextAuthAdapter } from "../../infrastructure/adapters/next-auth-adapter";

/**
 * Custom hook to expose authentication actions and state to the UI.
 */
type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export function useAuth() {
  const { data: session, status } = useSession();
  // Inyecta el adaptador aquí
  const authService = new AuthService(nextAuthAdapter);

  const user = session?.user as SessionUser | undefined;
  const accessToken = session?.accessToken as string | undefined;
  const refreshToken = session?.refreshToken as string | undefined;

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: status === "authenticated",
    loginWithProvider: authService.loginWithProvider.bind(authService),
    logout: authService.logout.bind(authService),
    registerByEmail: authService.registerByEmail.bind(authService),
  };
}
