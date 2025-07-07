"use client";
import { useAuth } from "@/contexts/auth/presentation/hooks/useAuth";

export default function AuthTestComponent() {
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    loginWithProvider,
    logout,
  } = useAuth();

  return (
    <div
      style={{
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
        margin: 24,
      }}
    >
      <h2>Auth Test Component</h2>
      <p>
        Auth status:{" "}
        <b>{isAuthenticated ? "Authenticated" : "Not authenticated"}</b>
      </p>
      <p>
        User ID: <b>{user?.id ?? "No user id"}</b>
      </p>
      <p>
        User Email: <b>{user?.email ?? "No user email"}</b>
      </p>
      <p>
        User Role: <b>{user?.role ?? "No user role"}</b>
      </p>
      <p>
        User Access Token: <b>{accessToken ?? "No user access token"}</b>
      </p>
      <p>
        User Refresh Token: <b>{refreshToken ?? "No user refresh token"}</b>
      </p>

      {!isAuthenticated ? (
        <button onClick={() => loginWithProvider("google")}>
          Login with Google
        </button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}
