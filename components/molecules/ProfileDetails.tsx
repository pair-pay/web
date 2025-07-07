import * as React from 'react';
import { useTranslations } from 'next-intl';
import { InfoItem } from '@/components/atoms/InfoItem';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ProfileDetailsProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  className?: string;
}

/**
 * ProfileDetails component
 * Displays detailed user information in an organized layout
 * @param id - User's unique identifier
 * @param createdAt - Account creation date
 * @param updatedAt - Last update date
 * @param className - Additional CSS classes
 */
export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  id,
  createdAt,
  updatedAt,
  className,
}) => {
  const t = useTranslations();

  // Format dates for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const createdDate = formatDate(createdAt);
  const updatedDate = formatDate(updatedAt);

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {t('components.profileDetails.accountDetails')}
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <InfoItem
            label={t('components.profileDetails.userId')}
            value={id}
            copyable
          />

          <InfoItem
            label={t('components.profileDetails.accountCreated')}
            value={
              <div className="space-y-1">
                <div>{createdDate.date}</div>
                <div className="text-xs text-muted-foreground">
                  {createdDate.time}
                </div>
              </div>
            }
          />

          <InfoItem
            label={t('components.profileDetails.lastUpdated')}
            value={
              <div className="space-y-1">
                <div>{updatedDate.date}</div>
                <div className="text-xs text-muted-foreground">
                  {updatedDate.time}
                </div>
              </div>
            }
          />

          <InfoItem
            label={t('components.profileDetails.status')}
            value={
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {t('components.profileDetails.active')}
              </span>
            }
          />
        </dl>
      </div>
    </div>
  );
};
