import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GroupDTO } from '@/contexts/groups/application/dto/group.dto';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (group: Omit<GroupDTO, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingGroup?: GroupDTO | null;
  isLoading?: boolean;
}

/**
 * CreateGroupDialog Molecule
 * Dialog for creating and editing groups
 */
export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  editingGroup,
  isLoading = false,
}) => {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Reset form when dialog opens/closes or editing group changes
  useEffect(() => {
    if (open) {
      if (editingGroup) {
        setName(editingGroup.name);
        setDescription(editingGroup.description);
      } else {
        setName('');
        setDescription('');
      }
    }
  }, [open, editingGroup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
    });

    // Reset form
    setName('');
    setDescription('');
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingGroup
              ? t('components.createGroupDialog.titleEdit')
              : t('components.createGroupDialog.titleCreate')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {t('components.createGroupDialog.nameLabel')}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('components.createGroupDialog.namePlaceholder')}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              {t('components.createGroupDialog.descriptionLabel')}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(
                'components.createGroupDialog.descriptionPlaceholder',
              )}
              rows={3}
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t('components.createGroupDialog.cancel')}
            </Button>
            <Button type="submit" disabled={!isValid || isLoading}>
              {isLoading
                ? t('components.createGroupDialog.saving')
                : editingGroup
                ? t('components.createGroupDialog.update')
                : t('components.createGroupDialog.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
