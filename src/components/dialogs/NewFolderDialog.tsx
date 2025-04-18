
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FolderPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileSection } from '@/types/files';

const formSchema = z.object({
  name: z.string().min(1, "Folder name is required").max(50, "Folder name is too long")
})

interface NewFolderDialogProps {
  parentFolderId?: string;
}

export function NewFolderDialog({ parentFolderId }: NewFolderDialogProps) {
  const { toast } = useToast();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const folderDetails = {
      name: values.name,
      section: currentSection,
      parentFolderId: parentFolderId,
    };
    
    console.log('Creating folder with details:', folderDetails);
    
    toast({
      title: "Please connect Supabase",
      description: "This feature requires Supabase to be connected for file storage functionality.",
    });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <FolderPlus size={16} />
          <span>New Folder</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder {parentFolderId ? "inside the current folder" : "in " + (currentSection || "root")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Folder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Folder</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
