import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth types to include id, role, accessToken, refreshToken
// See: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.BACKEND_API_URL}/auth/email/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) return null;
        const data = await res.json();
        return {
          id: data.user?.id ?? "",
          email: data.email ?? "",
          role: typeof data.role === "string" ? data.role : undefined,
          accessToken:
            typeof data.accessToken === "string" ? data.accessToken : undefined,
          refreshToken:
            typeof data.refreshToken === "string"
              ? data.refreshToken
              : undefined,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Type assertion para campos personalizados
        const customUser = user as {
          id: string;
          email: string;
          role?: string;
          accessToken?: string;
          refreshToken?: string;
        };
        token.id = customUser.id;
        token.email = customUser.email;
        token.role = customUser.role;
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: typeof token.id === "string" ? token.id : "",
          email: typeof token.email === "string" ? token.email : "",
          role: typeof token.role === "string" ? token.role : undefined,
        };
        session.accessToken =
          typeof token.accessToken === "string" ? token.accessToken : undefined;
        session.refreshToken =
          typeof token.refreshToken === "string"
            ? token.refreshToken
            : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
