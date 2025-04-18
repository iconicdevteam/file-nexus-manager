
import React from 'react';
import { FileItem } from '@/types/files';
import { formatBytes } from '@/utils/storageServices';
import {
  ClockIcon,
  Calendar,
  HardDrive,
  Tag,
  Info,
  CheckCircle2,
  AlertCircle,
  Clock,
  WifiOff,
  Share2,
  Download,
  Trash2,
  Edit,
  Copy,
  FileIcon,
  Image,
  Table,
  File,
  Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SECTIONS } from '@/utils/fileSections';

interface FileDetailsProps {
  file: FileItem | null;
  onClose: () => void;
}

export const FileDetails: React.FC<FileDetailsProps> = ({ file, onClose }) => {
  if (!file) return null;

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
        return FileIcon;
      default:
        return File;
    }
  };
  
  const getSection = () => {
    return SECTIONS.find(section => section.id === file.section);
  };
  
  const getSyncStatusIcon = () => {
    switch (file.syncStatus) {
      case 'synced':
        return <CheckCircle2 size={16} className="text-status-synced" />;
      case 'syncing':
        return <Clock size={16} className="text-status-syncing" />;
      case 'error':
        return <AlertCircle size={16} className="text-status-error" />;
      case 'offline':
        return <WifiOff size={16} className="text-status-offline" />;
      default:
        return null;
    }
  };
  
  const getSyncStatusText = () => {
    switch (file.syncStatus) {
      case 'synced':
        return 'Synced';
      case 'syncing':
        return 'Syncing...';
      case 'error':
        return 'Sync error';
      case 'offline':
        return 'Offline';
      default:
        return '';
    }
  };
  
  const FileIconComponent = getFileIcon();
  const section = getSection();

  return (
    <div className="rounded-lg border shadow-sm bg-background p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{file.name}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-6 flex-shrink-0">
        {file.thumbnail ? (
          <img
            src={file.thumbnail}
            alt={file.name}
            className="w-32 h-32 object-contain mb-3"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center mb-3">
            <FileIconComponent className={`h-16 w-16 text-${file.section}`} />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {getSyncStatusIcon()}
          <span className="text-sm">{getSyncStatusText()}</span>
        </div>
      </div>
      
      <div className="flex justify-around mb-6">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Download size={16} />
          <span className="text-xs">Download</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Share2 size={16} />
          <span className="text-xs">Share</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Copy size={16} />
          <span className="text-xs">Copy</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Edit size={16} />
          <span className="text-xs">Rename</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-destructive">
          <Trash2 size={16} />
          <span className="text-xs">Delete</span>
        </Button>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="space-y-3 flex-1 overflow-auto">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Details</h4>
            <p className="text-sm text-muted-foreground">
              {file.isFolder ? 'Folder' : `${file.type.toUpperCase()} File`} • {!file.isFolder && formatBytes(file.size)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Calendar size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Created</h4>
            <p className="text-sm text-muted-foreground">
              {file.createdAt.toLocaleDateString()} at {file.createdAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <ClockIcon size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Modified</h4>
            <p className="text-sm text-muted-foreground">
              {file.modifiedAt.toLocaleDateString()} at {file.modifiedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <HardDrive size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Storage</h4>
            <p className="text-sm text-muted-foreground">
              {file.source.charAt(0).toUpperCase() + file.source.slice(1)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Tag size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Section</h4>
            <p className="text-sm text-muted-foreground">
              {section?.name || 'None'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
