import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface GroupSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * GroupSearchInput Atom
 * Reusable search input component for filtering groups
 */
export const GroupSearchInput: React.FC<GroupSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search groups...',
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
