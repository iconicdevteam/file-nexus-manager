
import React, { useState } from 'react';
import { FileCard } from './FileCard';
import { FileItem, FileSection, StorageService } from '@/types/files';
import { useDrag } from '@/context/DragContext';
import { cn } from '@/lib/utils';

interface DraggableFileCardProps {
  file: FileItem;
  onSelect?: (file: FileItem) => void;
  selected?: boolean;
}

export const DraggableFileCard: React.FC<DraggableFileCardProps> = ({
  file,
  onSelect,
  selected = false,
}) => {
  const { startDrag, endDrag, isDragging, draggedFile } = useDrag();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  
  const isBeingDragged = isDragging && draggedFile?.id === file.id;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(file));
    startDrag(file);
  };

  const handleDragEnd = () => {
    endDrag();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (file.isFolder && !isBeingDragged) {
      setIsDraggedOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(false);
    
    if (!file.isFolder) return;
    
    try {
      const droppedFileData = JSON.parse(e.dataTransfer.getData('application/json')) as FileItem;
      console.log(`Dropped ${droppedFileData.name} onto ${file.name}`);
      
      // In a real application, you would update the file structure here
    } catch (error) {
      console.error('Error processing dropped file:', error);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'file-card-hover transition-all duration-300',
        isBeingDragged && 'opacity-50 cursor-grabbing',
        isDraggedOver && 'ring-2 ring-primary bg-primary/10 scale-105'
      )}
    >
      <FileCard file={file} onSelect={onSelect} selected={selected} />
    </div>
  );
};
