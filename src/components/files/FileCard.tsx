
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileItem } from '@/types/files';
import { formatBytes } from '@/utils/storageServices';
import {
  MoreHorizontal,
  FileText,
  Image,
  File as FileIcon,
  Table,
  File,
  Folder,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileCardProps {
  file: FileItem;
  onSelect?: (file: FileItem) => void;
  selected?: boolean;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onSelect, selected = false }) => {
  // Initialize icon component variable
  let IconComponent;
  
  const getFileIcon = () => {
    if (file.isFolder) return Folder;
    
    switch (file.type) {
      case 'pdf':
        return FileIcon;
      case 'jpg':
      case 'png':
      case 'gif':
        return Image;
      case 'xlsx':
      case 'csv':
        return Table;
      case 'docx':
      case 'txt':
        return FileText;
      default:
        return File;
    }
  };
  
  const getSyncStatusIcon = () => {
    switch (file.syncStatus) {
      case 'synced':
        return <CheckCircle2 size={14} className="text-status-synced" />;
      case 'syncing':
        return <Clock size={14} className="text-status-syncing" />;
      case 'error':
        return <AlertCircle size={14} className="text-status-error" />;
      case 'offline':
        return <WifiOff size={14} className="text-status-offline" />;
      default:
        return null;
    }
  };

  const getStorageIcon = () => {
    return <Cloud size={14} className="text-muted-foreground" />;
  };

  // Get the icon component before using it
  IconComponent = getFileIcon();

  // Convert fileSection to className string
  const getSectionColor = () => {
    return `text-${file.section}`;
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(file);
    }
  };

  return (
    <Card 
      className={cn(
        "flex flex-col h-44 cursor-pointer border hover:border-primary transition-colors group relative overflow-hidden",
        selected && "ring-2 ring-primary border-primary"
      )}
      onClick={handleClick}
    >
      {/* Preview/Icon */}
      <div className="flex items-center justify-center flex-1 py-4 bg-muted/30">
        {file.thumbnail ? (
          <img
            src={file.thumbnail}
            alt={file.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <IconComponent className={cn("h-10 w-10", getSectionColor())} />
        )}
      </div>
      
      {/* File Info */}
      <div className="p-3 border-t bg-background">
        <div className="flex justify-between items-start">
          <div className="truncate flex-1">
            <p className="font-medium text-sm truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {!file.isFolder && formatBytes(file.size)} • {file.modifiedAt.toLocaleDateString()}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal size={16} />
          </Button>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center gap-2 mt-1">
          {getSyncStatusIcon()}
          {getStorageIcon()}
        </div>
      </div>
    </Card>
  );
};
