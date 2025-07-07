import { Auth } from "../../domain/entities/auth.entity";

export interface AuthRepository {
  findAll(): Promise<Auth[]>;
  findById(id: string): Promise<Auth | null>;
  findByUserId(userId: string): Promise<Auth | null>;
  findByEmail(email: string): Promise<Auth | null>;
  create(auth: Auth): Promise<Auth>;
  update(auth: Auth): Promise<Auth>;
  delete(auth: Auth): Promise<Auth>;
}
