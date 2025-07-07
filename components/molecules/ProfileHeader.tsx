import * as React from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProfileAvatar } from '@/components/atoms/ProfileAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProfileHeaderProps {
  name: string;
  id: string;
  image: string;
  onUpdateName?: (name: string) => void;
  isUpdating?: boolean;
  className?: string;
}

/**
 * ProfileHeader component
 * Displays user's main profile information (avatar, name, ID) in a header layout
 * @param name - User's display name
 * @param id - User's unique identifier
 * @param image - User's profile image URL
 * @param onUpdateName - Function to update user name
 * @param isUpdating - Loading state for updates
 * @param className - Additional CSS classes
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  id,
  image,
  onUpdateName,
  isUpdating = false,
  className,
}) => {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  // Generate fallback from name
  const fallback = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSave = () => {
    if (editedName.trim() && onUpdateName) {
      onUpdateName(editedName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left',
        className,
      )}
    >
      <ProfileAvatar src={image} alt={name} fallback={fallback} size="xl" />

      <div className="flex flex-col gap-3 flex-1">
        <div>
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('components.profileHeader.namePlaceholder')}
                className="text-2xl sm:text-3xl font-bold h-auto p-2"
                disabled={isUpdating}
                autoFocus
              />
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editedName.trim() || isUpdating}
                  className="gap-1"
                >
                  <Check className="h-3 w-3" />
                  {t('components.profileHeader.saveName')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="gap-1"
                >
                  <X className="h-3 w-3" />
                  {t('components.profileHeader.cancelEdit')}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                {t('components.profileHeader.editMode')}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {name}
              </h1>
              {onUpdateName && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="gap-1 opacity-60 hover:opacity-100"
                  disabled={isUpdating}
                >
                  <Edit className="h-3 w-3" />
                  {t('components.profileHeader.editName')}
                </Button>
              )}
            </div>
          )}

          {!isEditing && (
            <p className="text-muted-foreground text-sm mt-1">
              {t('components.profileHeader.profileInformation')}
            </p>
          )}
        </div>

        <Badge variant="outline" className="w-fit mx-auto sm:mx-0">
          {t('components.profileHeader.id')}: {id.slice(0, 8)}...
        </Badge>
      </div>
    </div>
  );
};
