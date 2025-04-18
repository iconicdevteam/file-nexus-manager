
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User,
  Bell,
  Upload,
  FolderPlus
} from 'lucide-react';
import { SECTIONS } from '@/utils/fileSections';
import { AdvancedSearch } from '../search/AdvancedSearch';

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Get current section name
  const getSectionName = () => {
    if (pathname === '/') return 'All Files';
    if (pathname === '/recent') return 'Recent Files';
    if (pathname === '/favorites') return 'Favorites';
    if (pathname === '/trash') return 'Trash';
    if (pathname === '/settings') return 'Settings';
    
    if (pathname.startsWith('/section/')) {
      const sectionId = pathname.split('/')[2];
      const section = SECTIONS.find(s => s.id === sectionId);
      return section ? section.name : 'Section';
    }
    
    return 'Files';
  };

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Here you would implement the actual search functionality
  };

  return (
    <header className="h-auto min-h-16 bg-background border-b border-border px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold mr-4">{getSectionName()}</h2>
      </div>
      
      <div className="flex flex-1 max-w-md mx-0 md:mx-4 order-3 md:order-2">
        <AdvancedSearch onSearch={handleSearch} />
      </div>
      
      <div className="flex items-center gap-2 order-2 md:order-3">
        <Button variant="outline" size="sm" className="flex gap-2">
          <Upload size={16} />
          <span>Upload</span>
        </Button>
        <Button variant="outline" size="sm" className="flex gap-2">
          <FolderPlus size={16} />
          <span>New Folder</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <User size={18} />
        </Button>
      </div>
    </header>
  );
};
