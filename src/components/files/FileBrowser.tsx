
import React, { useState } from 'react';
import { FileGrid } from './FileGrid';
import { FileDetails } from './FileDetails';
import { FileItem, FileSection, StorageService } from '@/types/files';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_FILES } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Grid3X3, 
  List, 
  SortAsc, 
  FileUp,
  FolderUp,
  Trash2,
  FilterX,
  Filter,
  X
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '@/utils/fileSections';

interface FileBrowserProps {
  initialSection?: FileSection;
}

export const FileBrowser: React.FC<FileBrowserProps> = ({ initialSection }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterService, setFilterService] = useState<StorageService | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const location = useLocation();
  
  // Determine current section based on route
  const getCurrentSection = (): FileSection | null => {
    if (location.pathname.startsWith('/section/')) {
      const sectionId = location.pathname.split('/')[2];
      const isValidSection = SECTIONS.some(s => s.id === sectionId);
      if (isValidSection) {
        return sectionId as FileSection;
      }
    }
    return initialSection || null;
  };

  const currentSection = getCurrentSection();
  
  // Filter files based on section and service
  const filteredFiles = MOCK_FILES.filter(file => {
    // Filter by section if specified
    if (currentSection && file.section !== currentSection) {
      return false;
    }
    
    // Filter by service if specified
    if (filterService && file.source !== filterService) {
      return false;
    }
    
    return true;
  });
  
  // Sort files
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = a.modifiedAt.getTime() - b.modifiedAt.getTime();
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Group files by folders and regular files
  const folders = sortedFiles.filter(file => file.isFolder);
  const files = sortedFiles.filter(file => !file.isFolder);
  
  const allFiles = [...folders, ...files];

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  return (
    <div className="space-y-4">
      {/* File Details Sidebar */}
      {selectedFile && (
        <div className="fixed inset-y-0 right-0 w-80 bg-background border-l border-border z-10 overflow-auto">
          <FileDetails file={selectedFile} onClose={() => setSelectedFile(null)} />
        </div>
      )}

      <div className={`transition-all duration-300 ${selectedFile ? 'mr-80' : ''}`}>
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Grid3X3 size={16} className="mr-2" />
              Select All
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc size={16} className="mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort('name')}>
                  Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('date')}>
                  Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('size')}>
                  Size {sortBy === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('type')}>
                  Type {sortBy === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setFilterService('dropbox')}>
                  Dropbox {filterService === 'dropbox' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterService('google-drive')}>
                  Google Drive {filterService === 'google-drive' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterService('onedrive')}>
                  OneDrive {filterService === 'onedrive' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterService('local')}>
                  Local Storage {filterService === 'local' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterService(null)}>
                  <FilterX size={16} className="mr-2" />
                  Clear Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
            {selectedFile && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedFile(null)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Files */}
        <div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {allFiles.length > 0 ? (
                <FileGrid files={allFiles} onFileSelect={handleFileSelect} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FolderUp size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No files found</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    {filterService ? 
                      `No files found in ${filterService} for this section.` : 
                      'Drag and drop files here to upload them.'}
                  </p>
                  <Button>
                    <FileUp size={16} className="mr-2" />
                    Upload Files
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="images" className="mt-4">
              <FileGrid 
                files={allFiles.filter(file => ['jpg', 'png', 'gif'].includes(file.type))}
                onFileSelect={handleFileSelect}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-4">
              <FileGrid 
                files={allFiles.filter(file => ['docx', 'pdf', 'txt'].includes(file.type))}
                onFileSelect={handleFileSelect}
              />
            </TabsContent>
            
            <TabsContent value="other" className="mt-4">
              <FileGrid 
                files={allFiles.filter(file => !['jpg', 'png', 'gif', 'docx', 'pdf', 'txt'].includes(file.type))}
                onFileSelect={handleFileSelect}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
