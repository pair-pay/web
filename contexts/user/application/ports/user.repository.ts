import { UserDTO } from '../dto/user.dto';

export interface UserRepository {
  findById(id: string): Promise<UserDTO | null>;
  update(userData: Partial<UserDTO>): Promise<UserDTO>;
}
