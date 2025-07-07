import { UserDTO } from '../../application/dto/user.dto';
import { UserRepository } from '../../application/ports/user.repository';

/**
 * Implementation of UserRepository using a REST API.
 */
export class UserApiRepository implements UserRepository {
  async findById(id: string): Promise<UserDTO | null> {
    let url = `/api/users/${id}`;

    const response = await fetch(url);
    const data: UserDTO = await response.json();

    return data;
  }

  async update(userData: Partial<UserDTO>): Promise<UserDTO> {
    let url = `/api/users/`;

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    const data: UserDTO = await response.json();

    return data;
  }
}
