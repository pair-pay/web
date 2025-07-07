import { GroupRepository } from '../../ports/group.repository';
import { GroupDTO } from '../../dto/group.dto';

export function updateGroup(groupRepository: GroupRepository) {
  return async (group: GroupDTO): Promise<void> => {
    return groupRepository.update(group);
  };
}
