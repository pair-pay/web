'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { GroupApiRepository } from '../../infrastructure/api/group-api.repository';
import { GroupDTO } from '../../application/dto/group.dto';

/**
 * Custom hook to fetch group data by ID and manage group operations.
 */
export function useGroup(groupId?: string) {
  const groupRepository = new GroupApiRepository();

  // Query for all groups
  const {
    data: groups,
    isLoading: isLoadingGroups,
    error: groupsError,
    refetch: refetchGroups,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      return await groupRepository.findAll();
    },
  });

  // Query for individual group
  const {
    data: group,
    isLoading: isLoadingGroup,
    error: groupError,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      if (!groupId) return null;
      return await groupRepository.findById(groupId);
    },
    enabled: !!groupId,
  });

  const createGroupMutation = useMutation({
    mutationFn: async (group: GroupDTO) => {
      return await groupRepository.create(group);
    },
    onSuccess: () => {
      refetchGroups();
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: async (group: GroupDTO) => {
      return await groupRepository.update(group);
    },
    onSuccess: () => {
      refetchGroups();
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: async (id: string) => {
      return await groupRepository.delete(id);
    },
    onSuccess: () => {
      refetchGroups();
    },
  });

  return {
    // Groups queries
    groups,
    isLoadingGroups,
    groupsError,
    refetchGroups,
    // Individual group queries
    group,
    isLoadingGroup,
    groupError,
    // Mutations
    createGroupMutation,
    updateGroupMutation,
    deleteGroupMutation,
  };
}
