
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileSection } from '@/types/files';

interface UploadDialogProps {
  parentFolderId?: string;
}

export function UploadDialog({ parentFolderId }: UploadDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  
  // Extract current section from URL
  const getCurrentSection = (): FileSection | null => {
    if (location.pathname.startsWith('/section/')) {
      const sectionId = location.pathname.split('/')[2] as FileSection;
      return sectionId;
    }
    return null;
  };

  const currentSection = getCurrentSection();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadDetails = {
        files: Array.from(files),
        section: currentSection,
        parentFolderId: parentFolderId,
      };
      
      console.log('Uploading files with details:', uploadDetails);
      
      toast({
        title: "Please connect Supabase",
        description: "This feature requires Supabase to be connected for file storage functionality.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <Upload size={16} />
          <span>Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload files {parentFolderId ? "to the current folder" : "to " + (currentSection || "root")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                Click to select files or drag and drop
              </span>
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
