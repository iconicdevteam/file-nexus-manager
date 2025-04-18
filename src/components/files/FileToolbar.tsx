
import React from 'react';
import { Button } from "@/components/ui/button"
import { Grid3X3 } from 'lucide-react';
import { UploadDialog } from '@/components/dialogs/UploadDialog';
import { NewFolderDialog } from '@/components/dialogs/NewFolderDialog';

interface FileToolbarProps {
  parentFolderId?: string;
  onSelectAll: () => void;
}

export const FileToolbar: React.FC<FileToolbarProps> = ({
  parentFolderId,
  onSelectAll,
}) => {
  return (
    <div className="flex space-x-2">
      <UploadDialog parentFolderId={parentFolderId} />
      <NewFolderDialog parentFolderId={parentFolderId} />
      <Button variant="outline" size="sm" disabled onClick={onSelectAll}>
        <Grid3X3 size={16} className="mr-2" />
        Select All
      </Button>
    </div>
  );
};
