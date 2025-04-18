
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search as SearchIcon,
  X,
  Calendar,
  FileType,
  HardDrive,
  Tag
} from 'lucide-react';
import { STORAGE_SERVICES } from '@/utils/storageServices';
import { SECTIONS } from '@/utils/fileSections';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement actual search functionality
  };

  return (
    <>
      <form onSubmit={handleSearch} className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search files..."
          className="pl-10 w-full pr-20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setSearchTerm('')}
            >
              <X size={14} />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => setIsAdvancedSearchOpen(true)}
          >
            Advanced
          </Button>
        </div>
      </form>

      <Dialog open={isAdvancedSearchOpen} onOpenChange={setIsAdvancedSearchOpen}>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Advanced Search</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="name">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="name" className="flex items-center gap-2">
                  <SearchIcon size={14} />
                  Name
                </TabsTrigger>
                <TabsTrigger value="type" className="flex items-center gap-2">
                  <FileType size={14} />
                  Type
                </TabsTrigger>
                <TabsTrigger value="date" className="flex items-center gap-2">
                  <Calendar size={14} />
                  Date
                </TabsTrigger>
                <TabsTrigger value="source" className="flex items-center gap-2">
                  <HardDrive size={14} />
                  Source
                </TabsTrigger>
                <TabsTrigger value="section" className="flex items-center gap-2">
                  <Tag size={14} />
                  Section
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Search Term</h4>
                  <Input 
                    placeholder="Enter search term..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">File Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Documents', 'Images', 'Spreadsheets', 'PDFs', 'Folders'].map(type => (
                      <div key={type} className="flex items-center gap-2">
                        <input type="checkbox" id={`type-${type}`} className="h-4 w-4" />
                        <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Storage Services</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {STORAGE_SERVICES.map(service => (
                      <div key={service.id} className="flex items-center gap-2">
                        <input type="checkbox" id={`service-${service.id}`} className="h-4 w-4" />
                        <label htmlFor={`service-${service.id}`} className="text-sm">{service.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Sections</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SECTIONS.map(section => (
                      <div key={section.id} className="flex items-center gap-2">
                        <input type="checkbox" id={`section-${section.id}`} className="h-4 w-4" />
                        <label htmlFor={`section-${section.id}`} className="text-sm">{section.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAdvancedSearchOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAdvancedSearchOpen(false)}>
                    Search
                  </Button>
                </div>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
