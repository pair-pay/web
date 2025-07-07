import { SessionProvider } from "next-auth/react";

/**
 * AuthProvider component to wrap the app and provide authentication context.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
