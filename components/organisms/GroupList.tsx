import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { GroupSearchInput } from '@/components/atoms/GroupSearchInput';
import { GroupCard } from '@/components/molecules/GroupCard';
import { CreateGroupDialog } from '@/components/molecules/CreateGroupDialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Plus, Users, AlertCircle } from 'lucide-react';
import { GroupDTO } from '@/contexts/groups/application/dto/group.dto';

interface GroupListProps {
  groups?: GroupDTO[];
  isLoading: boolean;
  error?: Error | null;
  onCreateGroup: (
    group: Omit<GroupDTO, 'id' | 'createdAt' | 'updatedAt'>,
  ) => void;
  onUpdateGroup: (group: GroupDTO) => void;
  onDeleteGroup: (groupId: string) => void;
  onGroupClick?: (group: GroupDTO) => void;
  isCreating?: boolean;
  isUpdating?: boolean;
  className?: string;
}

/**
 * GroupList Organism
 * Complete group management interface with search, create, edit, and delete functionality
 */
export const GroupList: React.FC<GroupListProps> = ({
  groups = [],
  isLoading,
  error,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  onGroupClick,
  isCreating = false,
  isUpdating = false,
  className,
}) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<GroupDTO | null>(null);

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;

    const query = searchQuery.toLowerCase();
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.description.toLowerCase().includes(query),
    );
  }, [groups, searchQuery]);

  const handleCreateGroup = (
    groupData: Omit<GroupDTO, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    onCreateGroup(groupData);
  };

  const handleUpdateGroup = (
    groupData: Omit<GroupDTO, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    if (editingGroup) {
      onUpdateGroup({
        ...editingGroup,
        ...groupData,
      });
      setEditingGroup(null);
    }
  };

  const handleEditGroup = (group: GroupDTO) => {
    setEditingGroup(group);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (window.confirm(t('components.groupList.deleteConfirm'))) {
      onDeleteGroup(groupId);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center min-h-[40vh] ${className}`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center min-h-[40vh] ${className}`}
      >
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('pages.groups.errors.loadFailed')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`w-full mx-auto space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('pages.groups.title')}</h1>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('pages.groups.create')}
        </Button>
      </div>

      <Separator />

      {/* Search */}
      <GroupSearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t('pages.groups.searchPlaceholder')}
        className="max-w-md"
      />

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="text-center space-y-2">
            <Users className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">
              {searchQuery
                ? t('pages.groups.noResults')
                : t('pages.groups.empty')}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? t('pages.groups.noResultsMessage')
                : t('pages.groups.emptyMessage')}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                {t('pages.groups.create')}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEdit={handleEditGroup}
              onDelete={handleDeleteGroup}
              onClick={onGroupClick}
            />
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <CreateGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateGroup}
        isLoading={isCreating}
      />

      {/* Edit Dialog */}
      <CreateGroupDialog
        open={!!editingGroup}
        onOpenChange={(open) => !open && setEditingGroup(null)}
        onSubmit={handleUpdateGroup}
        editingGroup={editingGroup}
        isLoading={isUpdating}
      />
    </div>
  );
};
