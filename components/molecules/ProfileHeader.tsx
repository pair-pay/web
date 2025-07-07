import * as React from "react";
import { ProfileAvatar } from "@/components/atoms/ProfileAvatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProfileHeaderProps {
  name: string;
  id: string;
  image: string;
  className?: string;
}

/**
 * ProfileHeader component
 * Displays user's main profile information (avatar, name, ID) in a header layout
 * @param name - User's display name
 * @param id - User's unique identifier
 * @param image - User's profile image URL
 * @param className - Additional CSS classes
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  id,
  image,
  className,
}) => {
  // Generate fallback from name
  const fallback = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left",
        className
      )}
    >
      <ProfileAvatar src={image} alt={name} fallback={fallback} size="xl" />

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Profile Information
          </p>
        </div>

        <Badge variant="outline" className="w-fit mx-auto sm:mx-0">
          ID: {id.slice(0, 8)}...
        </Badge>
      </div>
    </div>
  );
};
