
import React from 'react';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SortAsc } from 'lucide-react';

interface FileSortMenuProps {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export const FileSortMenu: React.FC<FileSortMenuProps> = ({
  sortBy,
  sortDirection,
  onSort,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SortAsc size={16} className="mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onSort('name')}>
          Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('date')}>
          Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('size')}>
          Size {sortBy === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort('type')}>
          Type {sortBy === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
