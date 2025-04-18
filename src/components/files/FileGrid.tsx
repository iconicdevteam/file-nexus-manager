
import React, { useState } from 'react';
import { DraggableFileCard } from './DraggableFileCard';
import { FileItem } from '@/types/files';

interface FileGridProps {
  files: FileItem[];
  onFileSelect?: (file: FileItem) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file.id);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {files.map((file) => (
        <DraggableFileCard 
          key={file.id} 
          file={file} 
          onSelect={handleFileSelect}
          selected={selectedFile === file.id}
        />
      ))}
    </div>
  );
};
