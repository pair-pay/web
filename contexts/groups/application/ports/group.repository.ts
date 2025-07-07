import { GroupDTO } from '../dto/group.dto';

export interface GroupRepository {
  findAll(): Promise<GroupDTO[]>;
  findById(id: string): Promise<GroupDTO | null>;
  create(group: GroupDTO): Promise<void>;
  update(group: GroupDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
