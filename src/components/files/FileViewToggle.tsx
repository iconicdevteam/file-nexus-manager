
import React from 'react';
import { Button } from "@/components/ui/button"
import { Grid3X3, List, X } from 'lucide-react';

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
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('grid')}
      >
        <Grid3X3 size={16} />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('list')}
      >
        <List size={16} />
      </Button>
      {selectedFile && (
        <Button
          variant="outline"
          size="icon"
          onClick={onClearSelection}
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};
