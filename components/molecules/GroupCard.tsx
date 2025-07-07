import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Users } from 'lucide-react';
import { GroupDTO } from '@/contexts/groups/application/dto/group.dto';

interface GroupCardProps {
  group: GroupDTO;
  onEdit?: (group: GroupDTO) => void;
  onDelete?: (groupId: string) => void;
  onClick?: (group: GroupDTO) => void;
  className?: string;
}

/**
 * GroupCard Molecule
 * Displays group information in a card format with actions
 */
export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onEdit,
  onDelete,
  onClick,
  className,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={() => onClick?.(group)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(group);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(group.id);
              }}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {group.description || 'No description provided'}
        </p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-xs">
            Created {formatDate(group.createdAt)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
