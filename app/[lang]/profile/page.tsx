'use client';

import { useAuth } from '@/contexts/auth/presentation/hooks/useAuth';
import { useUser } from '@/contexts/user/presentation/hooks/useUser';
import { ProfileCard } from '@/components/organisms/ProfileCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { User, AlertCircle, UserX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

/**
 * User Profile Page
 * Displays the user's profile information using modern, responsive components
 * Built with atomic design principles and shadcn/ui components
 */
const ProfilePage = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { data: userData, isLoading, isError } = useUser(user?.id);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('pages.profile.title')}</h1>
        </div>

        <Separator />

        {/* Loading State */}
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('pages.profile.title')}</h1>
        </div>

        <Separator />

        {/* Error State */}
        <div className="flex items-center justify-center min-h-[40vh]">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('pages.profile.errors.loadFailed')}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t('pages.profile.title')}</h1>
        </div>

        <Separator />

        {/* Empty State */}
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-2">
            <UserX className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">
              {t('pages.profile.errors.noData')}
            </h3>
            <p className="text-muted-foreground">
              {t('pages.profile.errors.noDataMessage')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{t('pages.profile.title')}</h1>
      </div>

      <Separator />

      {/* Profile Content */}
      <div className="max-w-4xl">
        <ProfileCard user={userData} />
      </div>
    </div>
  );
};

export default ProfilePage;
