
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid3X3 } from 'lucide-react';
import { UploadDialog } from '@/components/dialogs/UploadDialog';
import { NewFolderDialog } from '@/components/dialogs/NewFolderDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" disabled onClick={onSelectAll}>
            <Grid3X3 size={16} className="mr-2" />
            Select All
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select all files (coming soon)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
