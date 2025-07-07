import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import { ProfileHeader } from '@/components/molecules/ProfileHeader';
import { ProfileDetails } from '@/components/molecules/ProfileDetails';
import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  onUpdateUser?: (userData: { id: string; name: string }) => void;
  isUpdating?: boolean;
  className?: string;
}

/**
 * ProfileCard component
 * Complete user profile layout without card wrapper
 * @param user - User data object
 * @param onUpdateUser - Function to update user data
 * @param isUpdating - Loading state for updates
 * @param className - Additional CSS classes
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onUpdateUser,
  isUpdating = false,
  className,
}) => {
  return (
    <div className={cn('w-full max-w-4xl mx-auto p-8 space-y-8', className)}>
      <ProfileHeader
        name={user.name}
        id={user.id}
        image={user.image}
        onUpdateName={
          onUpdateUser
            ? (name: string) => onUpdateUser({ id: user.id, name })
            : undefined
        }
        isUpdating={isUpdating}
      />

      <Separator />

      <ProfileDetails
        id={user.id}
        createdAt={user.createdAt}
        updatedAt={user.updatedAt}
      />
    </div>
  );
};
