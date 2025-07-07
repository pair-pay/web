import { GroupRepository } from '../../ports/group.repository';

export function deleteGroup(groupRepository: GroupRepository) {
  return async (id: string): Promise<void> => {
    return groupRepository.delete(id);
  };
}
