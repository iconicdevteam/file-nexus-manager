
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SECTIONS } from '@/utils/fileSections';
import { STORAGE_SERVICES, formatBytes } from '@/utils/storageServices';
import { 
  Cloud, 
  Home, 
  Building2, 
  LayoutGrid, 
  Briefcase,
  FileText,
  Clock,
  Star,
  Trash2,
  Plus,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const iconComponents = {
  Home,
  Building2,
  LayoutGrid,
  Briefcase
};

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const getIconComponent = (iconName: string) => {
    return iconComponents[iconName as keyof typeof iconComponents] || FileText;
  };

  return (
    <div className={`h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">FileNexus</h1>}
        <Button variant="ghost" size="sm" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </Button>
      </div>

      <Button variant="outline" className="mx-4 mb-6 flex gap-2 justify-center">
        <Plus size={18} />
        {!collapsed && <span>Add Storage</span>}
      </Button>

      <div className="px-3 mb-6">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {!collapsed && "SECTIONS"}
        </div>
        <nav className="space-y-1">
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
          >
            <FileText size={18} />
            {!collapsed && <span>All Files</span>}
          </Link>
          
          {SECTIONS.map((section) => {
            const IconComponent = getIconComponent(section.icon);
            return (
              <Link 
                key={section.id}
                to={`/section/${section.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === `/section/${section.id}` ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
              >
                <div className={`text-${section.color}`}>
                  <IconComponent size={18} />
                </div>
                {!collapsed && <span>{section.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 mb-6">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {!collapsed && "FILTERS"}
        </div>
        <nav className="space-y-1">
          <Link 
            to="/recent" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === '/recent' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
          >
            <Clock size={18} />
            {!collapsed && <span>Recent</span>}
          </Link>
          <Link 
            to="/favorites" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === '/favorites' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
          >
            <Star size={18} />
            {!collapsed && <span>Favorites</span>}
          </Link>
          <Link 
            to="/trash" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === '/trash' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
          >
            <Trash2 size={18} />
            {!collapsed && <span>Trash</span>}
          </Link>
        </nav>
      </div>

      <Separator />

      <div className="px-3 py-4 flex-1 overflow-auto">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {!collapsed && "STORAGE"}
        </div>
        <div className="space-y-4">
          {STORAGE_SERVICES.map((service) => (
            <div key={service.id} className={`${!service.connected && 'opacity-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Cloud size={18} />
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm">
                      <span>{service.name}</span>
                      {service.connected && (
                        <span className="text-xs text-muted-foreground">
                          {formatBytes(service.usedSpace)} / {formatBytes(service.totalSpace)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {!collapsed && service.connected && (
                <Progress 
                  value={(service.usedSpace / service.totalSpace) * 100} 
                  className="h-1" 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <Link 
          to="/settings" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === '/settings' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}`}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};
