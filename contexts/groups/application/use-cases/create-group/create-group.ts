import { GroupRepository } from '../../ports/group.repository';
import { GroupDTO } from '../../dto/group.dto';

export function createGroup(groupRepository: GroupRepository) {
  return async (group: GroupDTO): Promise<void> => {
    return groupRepository.create(group);
  };
}
