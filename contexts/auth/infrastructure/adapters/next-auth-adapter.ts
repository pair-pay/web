import { AuthPort } from "../../application/ports/auth.port";
import { getSession, signIn, signOut } from "next-auth/react";

/**
 * NextAuth adapter implementing AuthPort.
 */
export const nextAuthAdapter: AuthPort = {
  async signIn(provider: string, options?: any) {
    await signIn(provider, options);
  },
  async signOut() {
    await signOut();
  },
  async getSession() {
    return await getSession();
  },
  async registerByEmail(email: string, password: string) {
    const res = await fetch(`/api/auth/email/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || "Registration failed" };
    }
    return { success: true };
  },
};
