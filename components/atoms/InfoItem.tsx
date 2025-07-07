import * as React from "react";
import { cn } from "@/lib/utils";

export interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  copyable?: boolean;
}

/**
 * InfoItem component
 * Displays a label-value pair with consistent styling
 * @param label - The label text
 * @param value - The value to display
 * @param className - Additional CSS classes for container
 * @param labelClassName - Additional CSS classes for label
 * @param valueClassName - Additional CSS classes for value
 * @param copyable - Whether the value should be copyable (future feature)
 */
export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
  copyable = false,
}) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <dt
        className={cn(
          "text-sm font-medium text-muted-foreground",
          labelClassName
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "text-sm font-mono break-all",
          copyable &&
            "cursor-pointer hover:bg-muted/50 rounded px-1 transition-colors",
          valueClassName
        )}
      >
        {value}
      </dd>
    </div>
  );
};
