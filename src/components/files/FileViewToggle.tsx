
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid3X3, List, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface FileViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedFile: boolean;
  onClearSelection: () => void;
}

export const FileViewToggle: React.FC<FileViewToggleProps> = ({
  viewMode,
  onViewModeChange,
  selectedFile,
  onClearSelection,
}) => {
  return (
    <div className="flex space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3X3 size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Grid view</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onViewModeChange('list')}
          >
            <List size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>List view</p>
        </TooltipContent>
      </Tooltip>
      
      {selectedFile && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onClearSelection}
            >
              <X size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear selection</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
