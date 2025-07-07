/**
 * Application service for authentication use cases.
 */
import { AuthPort } from "../ports/auth.port";

export class AuthService {
  constructor(private readonly authPort: AuthPort) {}

  async loginWithProvider(provider: string, options?: any) {
    await this.authPort.signIn(provider, options);
  }

  async logout() {
    await this.authPort.signOut();
  }

  async getCurrentSession() {
    return await this.authPort.getSession();
  }

  async registerByEmail(email: string, password: string) {
    return await this.authPort.registerByEmail(email, password);
  }
}
