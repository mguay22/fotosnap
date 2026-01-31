export interface StorageProvider {
  upload(file: Express.Multer.File, filename: string): Promise<string>;
  getUrl(filename: string): string;
}

export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';
