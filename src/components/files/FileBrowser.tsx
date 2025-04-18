import React, { useState } from 'react';
import { FileGrid } from './FileGrid';
import { FileDetails } from './FileDetails';
import { FileItem, FileSection, StorageService } from '@/types/files';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_FILES } from '@/utils/mockData';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '@/utils/fileSections';
import { FileToolbar } from './FileToolbar';
import { FileViewToggle } from './FileViewToggle';
import { FileSortMenu } from './FileSortMenu';
import { FileFilterMenu } from './FileFilterMenu';
import { Button } from "@/components/ui/button";
import { FolderUp, FileUp } from 'lucide-react';

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
  
  const filteredFiles = MOCK_FILES.filter(file => {
    if (currentSection && file.section !== currentSection) {
      return false;
    }
    
    if (filterService && file.source !== filterService) {
      return false;
    }
    
    return true;
  });
  
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

  const getCurrentFolderId = () => {
    if (selectedFile && selectedFile.isFolder) {
      return selectedFile.id;
    }
    return undefined;
  };

  return (
    <div className="space-y-4">
      {selectedFile && (
        <div className="fixed inset-y-0 right-0 w-80 bg-background border-l border-border z-10 overflow-auto">
          <FileDetails file={selectedFile} onClose={() => setSelectedFile(null)} />
        </div>
      )}

      <div className={`transition-all duration-300 ${selectedFile ? 'mr-80' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <FileToolbar 
              parentFolderId={getCurrentFolderId()} 
              onSelectAll={() => {}} 
            />
            <FileSortMenu
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <FileFilterMenu
              filterService={filterService}
              onFilterChange={setFilterService}
            />
          </div>
          
          <FileViewToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedFile={!!selectedFile}
            onClearSelection={() => setSelectedFile(null)}
          />
        </div>

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
