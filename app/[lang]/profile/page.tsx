"use client";

import { useAuth } from "@/contexts/auth/presentation/hooks/useAuth";
import { useUser } from "@/contexts/user/presentation/hooks/useUser";
import { ProfileCard } from "@/components/organisms/ProfileCard";
import React from "react";

/**
 * User Profile Page
 * Displays the user's profile information using modern, responsive components
 * Built with atomic design principles and shadcn/ui components
 */
const page = () => {
  const { user } = useAuth();
  const { data: userData, isLoading, isError } = useUser(user?.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-destructive">
            Error loading profile
          </h3>
          <p className="text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">No profile data found</h3>
          <p className="text-muted-foreground">
            Unable to load your profile information
          </p>
        </div>
      </div>
    );
  }

  return <ProfileCard user={userData} />;
};

export default page;
