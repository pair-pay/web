/**
 * Port for authentication actions.
 */
export interface AuthPort {
  signIn(provider: string, options?: any): Promise<void>;
  signOut(): Promise<void>;
  getSession(): Promise<any>;
  registerByEmail(
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }>;
}
