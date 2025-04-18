
import { FileItem, FileSection, StorageService } from '@/types/files';

// Generate mock files for demonstration
export const generateMockFiles = (count: number): FileItem[] => {
  const fileTypes = ['docx', 'pdf', 'jpg', 'png', 'xlsx', 'pptx', 'txt'];
  const sections: FileSection[] = ['residential', 'commercial', 'marketing', 'realestate'];
  const sources: StorageService[] = ['dropbox', 'google-drive', 'onedrive', 'local'];
  const syncStatuses: Array<'synced' | 'syncing' | 'error' | 'offline'> = ['synced', 'syncing', 'error', 'offline'];

  const getRandomFromArray = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomSize = (): number => {
    return Math.floor(Math.random() * 10 * 1024 * 1024); // Random size up to 10MB
  };

  const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const files: FileItem[] = [];

  // Add a few folders first
  for (let i = 0; i < 5; i++) {
    const section = getRandomFromArray(sections);
    const source = getRandomFromArray(sources);
    files.push({
      id: `folder-${i}`,
      name: `Folder ${i + 1}`,
      type: 'folder',
      size: 0,
      createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      modifiedAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      source: source,
      section: section,
      syncStatus: 'synced',
      path: `/home/folder-${i}`,
      isFolder: true,
    });
  }

  // Add files
  for (let i = 0; i < count; i++) {
    const fileType = getRandomFromArray(fileTypes);
    const section = getRandomFromArray(sections);
    const source = getRandomFromArray(sources);
    const parentIndex = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : -1;
    const parentFolder = parentIndex >= 0 ? files[parentIndex] : null;

    files.push({
      id: `file-${i}`,
      name: `File ${i + 1}.${fileType}`,
      type: fileType,
      size: getRandomSize(),
      createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      modifiedAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      source: source,
      section: section,
      syncStatus: getRandomFromArray(syncStatuses),
      path: parentFolder ? `${parentFolder.path}/file-${i}` : `/home/file-${i}`,
      thumbnail: fileType === 'jpg' || fileType === 'png' ? `https://source.unsplash.com/random/100x100?sig=${i}` : undefined,
      isFolder: false,
      parentId: parentFolder ? parentFolder.id : undefined,
    });
  }

  return files;
};

export const MOCK_FILES = generateMockFiles(50);
