
export type StorageService = 'dropbox' | 'google-drive' | 'onedrive' | 'local';

export type FileSection = 'residential' | 'commercial' | 'marketing' | 'realestate';

export type SyncStatus = 'synced' | 'syncing' | 'error' | 'offline';

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  source: StorageService;
  section: FileSection;
  syncStatus: SyncStatus;
  path: string;
  thumbnail?: string;
  isFolder: boolean;
  parentId?: string;
}

export interface StorageServiceInfo {
  id: StorageService;
  name: string;
  connected: boolean;
  icon: string;
  usedSpace: number;
  totalSpace: number;
}

export interface Section {
  id: FileSection;
  name: string;
  icon: string;
  color: string;
  lightColor: string;
  darkColor: string;
}
