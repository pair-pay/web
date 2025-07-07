'use client';

import React from 'react';
import { GroupList } from '@/components/organisms/GroupList';
import { useGroup } from '@/contexts/groups/presentation/hooks/useGroup';
import { GroupDTO } from '@/contexts/groups/application/dto/group.dto';

/**
 * Groups Page
 * Main page for managing groups using the GroupList organism
 * Built with atomic design principles and clean architecture
 */
const GroupsPage = () => {
  const {
    groups,
    isLoadingGroups,
    groupsError,
    createGroupMutation,
    updateGroupMutation,
    deleteGroupMutation,
  } = useGroup();

  const handleCreateGroup = (
    groupData: Omit<GroupDTO, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    // Generate a temporary ID for the new group
    const newGroup: GroupDTO = {
      id: '', // This will be set by the backend
      ...groupData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createGroupMutation.mutate(newGroup);
  };

  const handleUpdateGroup = (group: GroupDTO) => {
    updateGroupMutation.mutate(group);
  };

  const handleDeleteGroup = (groupId: string) => {
    deleteGroupMutation.mutate(groupId);
  };

  const handleGroupClick = (group: GroupDTO) => {
    // TODO: Navigate to group detail page or implement desired action
    console.log('Group clicked:', group);
  };

  return (
    <GroupList
      groups={groups}
      isLoading={isLoadingGroups}
      error={groupsError}
      onCreateGroup={handleCreateGroup}
      onUpdateGroup={handleUpdateGroup}
      onDeleteGroup={handleDeleteGroup}
      onGroupClick={handleGroupClick}
      isCreating={createGroupMutation.isPending}
      isUpdating={updateGroupMutation.isPending}
    />
  );
};

export default GroupsPage;
