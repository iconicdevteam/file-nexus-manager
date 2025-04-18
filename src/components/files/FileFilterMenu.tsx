
import React from 'react';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, FilterX } from 'lucide-react';
import { StorageService } from '@/types/files';

interface FileFilterMenuProps {
  filterService: StorageService | null;
  onFilterChange: (service: StorageService | null) => void;
}

export const FileFilterMenu: React.FC<FileFilterMenuProps> = ({
  filterService,
  onFilterChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onFilterChange('dropbox')}>
          Dropbox {filterService === 'dropbox' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('google-drive')}>
          Google Drive {filterService === 'google-drive' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('onedrive')}>
          OneDrive {filterService === 'onedrive' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('local')}>
          Local Storage {filterService === 'local' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange(null)}>
          <FilterX size={16} className="mr-2" />
          Clear Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
