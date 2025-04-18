
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Search as SearchIcon,
  Filter,
  FileType,
  Calendar as CalendarIcon,
  HardDrive,
  Tag
} from 'lucide-react';
import { STORAGE_SERVICES } from '@/utils/storageServices';
import { SECTIONS } from '@/utils/fileSections';
import { Badge } from '@/components/ui/badge';

interface SearchFilter {
  term: string;
  fileTypes: string[];
  services: string[];
  sections: string[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilter) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({
    term: '',
    fileTypes: [],
    services: [],
    sections: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const fileTypes = [
    { id: 'document', label: 'Documents' },
    { id: 'image', label: 'Images' },
    { id: 'spreadsheet', label: 'Spreadsheets' },
    { id: 'pdf', label: 'PDFs' },
    { id: 'folder', label: 'Folders' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActiveFilters: string[] = [];
    
    if (filters.term) newActiveFilters.push(`Term: ${filters.term}`);
    if (filters.fileTypes.length) newActiveFilters.push(`Types: ${filters.fileTypes.length}`);
    if (filters.services.length) newActiveFilters.push(`Services: ${filters.services.length}`);
    if (filters.sections.length) newActiveFilters.push(`Sections: ${filters.sections.length}`);
    if (filters.dateRange.from) newActiveFilters.push('Date Range');
    
    setActiveFilters(newActiveFilters);
    onSearch(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({
      term: '',
      fileTypes: [],
      services: [],
      sections: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
    });
    setActiveFilters([]);
    onSearch({
      term: '',
      fileTypes: [],
      services: [],
      sections: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
    });
  };

  const toggleFileType = (type: string) => {
    setFilters(prev => {
      if (prev.fileTypes.includes(type)) {
        return {
          ...prev,
          fileTypes: prev.fileTypes.filter(t => t !== type),
        };
      } else {
        return {
          ...prev,
          fileTypes: [...prev.fileTypes, type],
        };
      }
    });
  };

  const toggleService = (service: string) => {
    setFilters(prev => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter(s => s !== service),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, service],
        };
      }
    });
  };

  const toggleSection = (section: string) => {
    setFilters(prev => {
      if (prev.sections.includes(section)) {
        return {
          ...prev,
          sections: prev.sections.filter(s => s !== section),
        };
      } else {
        return {
          ...prev,
          sections: [...prev.sections, section],
        };
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search files..."
          className="pl-10 pr-24"
          value={filters.term}
          onChange={(e) => setFilters({ ...filters, term: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                <Filter size={14} />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="end">
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="filetype" className="w-full">
                  <div className="border-b px-3 py-2">
                    <TabsList className="grid grid-cols-5">
                      <TabsTrigger value="filetype" className="text-xs">
                        <FileType size={14} className="mr-1" />
                        Type
                      </TabsTrigger>
                      <TabsTrigger value="date" className="text-xs">
                        <CalendarIcon size={14} className="mr-1" />
                        Date
                      </TabsTrigger>
                      <TabsTrigger value="source" className="text-xs">
                        <HardDrive size={14} className="mr-1" />
                        Source
                      </TabsTrigger>
                      <TabsTrigger value="section" className="text-xs">
                        <Tag size={14} className="mr-1" />
                        Section
                      </TabsTrigger>
                      <TabsTrigger value="term" className="text-xs">
                        <SearchIcon size={14} className="mr-1" />
                        Term
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="p-4">
                    <TabsContent value="filetype" className="m-0">
                      <div className="grid grid-cols-2 gap-3">
                        {fileTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`type-${type.id}`}
                              checked={filters.fileTypes.includes(type.id)}
                              onCheckedChange={() => toggleFileType(type.id)}
                            />
                            <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="date" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <Label className="block mb-2">Date Range</Label>
                          <Calendar
                            mode="range"
                            selected={{
                              from: filters.dateRange.from,
                              to: filters.dateRange.to,
                            }}
                            onSelect={(range) => 
                              setFilters({
                                ...filters,
                                dateRange: {
                                  from: range?.from,
                                  to: range?.to,
                                },
                              })
                            }
                            className="border rounded-md"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="source" className="m-0">
                      <div className="grid grid-cols-2 gap-3">
                        {STORAGE_SERVICES.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`service-${service.id}`}
                              checked={filters.services.includes(service.id)}
                              onCheckedChange={() => toggleService(service.id)}
                            />
                            <Label htmlFor={`service-${service.id}`}>{service.name}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="section" className="m-0">
                      <div className="grid grid-cols-2 gap-3">
                        {SECTIONS.map((section) => (
                          <div key={section.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`section-${section.id}`}
                              checked={filters.sections.includes(section.id)}
                              onCheckedChange={() => toggleSection(section.id)}
                            />
                            <Label htmlFor={`section-${section.id}`}>{section.name}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="term" className="m-0">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="search-term" className="block mb-2">Search Term</Label>
                          <Input
                            id="search-term"
                            value={filters.term}
                            onChange={(e) => setFilters({ ...filters, term: e.target.value })}
                            placeholder="Enter search term..."
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </div>

                  <div className="flex items-center justify-between p-4 border-t">
                    <Button type="button" variant="ghost" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button type="submit">Apply Filters</Button>
                  </div>
                </Tabs>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="outline" className="gap-1">
              {filter}
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs px-2"
              onClick={handleReset}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
