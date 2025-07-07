import { GroupDTO } from '../../application/dto/group.dto';
import { GroupRepository } from '../../application/ports/group.repository';

/**
 * Implementation of GroupRepository using a REST API.
 */
export class GroupApiRepository implements GroupRepository {
  async findAll(): Promise<GroupDTO[]> {
    let url = `/api/groups`;

    const response = await fetch(url);
    const data: GroupDTO[] = await response.json();

    return data;
  }

  async findById(id: string): Promise<GroupDTO | null> {
    let url = `/api/groups/${id}`;

    const response = await fetch(url);
    const data: GroupDTO = await response.json();

    return data;
  }

  async create(group: GroupDTO): Promise<void> {
    let url = `/api/groups`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(group),
    });
  }

  async update(group: GroupDTO): Promise<void> {
    let url = `/api/groups/${group.id}`;
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(group),
    });
  }

  async delete(id: string): Promise<void> {
    let url = `/api/groups/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
  }
}
