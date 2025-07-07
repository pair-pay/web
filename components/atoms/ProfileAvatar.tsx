import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
};

/**
 * ProfileAvatar component
 * Displays user avatar with fallback support and customizable sizes
 * @param src - Image source URL
 * @param alt - Alternative text for accessibility
 * @param fallback - Fallback text when image fails to load
 * @param size - Avatar size variant
 * @param className - Additional CSS classes
 */
export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  alt = "Profile",
  fallback = "U",
  size = "xl",
  className,
}) => {
  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        "ring-2 ring-border ring-offset-4",
        className
      )}
    >
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback className="text-lg font-semibold bg-muted">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};
