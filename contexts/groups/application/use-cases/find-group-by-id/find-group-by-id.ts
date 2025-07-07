import { GroupRepository } from '../../ports/group.repository';
import { GroupDTO } from '../../dto/group.dto';

export function findGroupById(groupRepository: GroupRepository) {
  return async (id: string): Promise<GroupDTO | null> => {
    return groupRepository.findById(id);
  };
}
