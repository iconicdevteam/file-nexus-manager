
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { FileItem, FileSection, StorageService } from '@/types/files';

interface DragContextType {
  draggedFile: FileItem | null;
  setDraggedFile: (file: FileItem | null) => void;
  isDragging: boolean;
  startDrag: (file: FileItem) => void;
  endDrag: () => void;
  handleFileDrop: (targetSection: FileSection, targetService: StorageService) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [draggedFile, setDraggedFile] = useState<FileItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = (file: FileItem) => {
    setDraggedFile(file);
    setIsDragging(true);
  };

  const endDrag = () => {
    setDraggedFile(null);
    setIsDragging(false);
  };

  const handleFileDrop = (targetSection: FileSection, targetService: StorageService) => {
    if (!draggedFile) return;

    // Here you would implement the actual logic to move the file
    console.log(`Moving file ${draggedFile.name} to section ${targetSection} and service ${targetService}`);
    
    // In a real application, you would call an API to move the file
    // and then update your local state accordingly

    // For now, we'll just end the drag operation
    endDrag();
  };

  return (
    <DragContext.Provider
      value={{
        draggedFile,
        setDraggedFile,
        isDragging,
        startDrag,
        endDrag,
        handleFileDrop,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = (): DragContextType => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};
