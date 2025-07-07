import { UserRepository } from "../../ports/user.repository";
import { UserDTO } from "../../dto/user.dto";

export function getUserById(userRepository: UserRepository) {
  return async (id: string): Promise<UserDTO | null> => {
    return userRepository.findById(id);
  };
}
