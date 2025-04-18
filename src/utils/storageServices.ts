
import { StorageServiceInfo } from '@/types/files';

export const STORAGE_SERVICES: StorageServiceInfo[] = [
  {
    id: 'dropbox',
    name: 'Dropbox',
    connected: true,
    icon: 'dropbox.svg',
    usedSpace: 5 * 1024 * 1024 * 1024, // 5GB
    totalSpace: 10 * 1024 * 1024 * 1024, // 10GB
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    connected: true,
    icon: 'google-drive.svg',
    usedSpace: 3 * 1024 * 1024 * 1024, // 3GB
    totalSpace: 15 * 1024 * 1024 * 1024, // 15GB
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    connected: false,
    icon: 'onedrive.svg',
    usedSpace: 0,
    totalSpace: 5 * 1024 * 1024 * 1024, // 5GB
  },
  {
    id: 'local',
    name: 'Local Storage',
    connected: true,
    icon: 'local.svg',
    usedSpace: 10 * 1024 * 1024 * 1024, // 10GB
    totalSpace: 500 * 1024 * 1024 * 1024, // 500GB
  },
];

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
