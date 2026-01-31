import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_PROVIDER, StorageProvider } from './storage/storage.interface';
import { generateFilename } from './upload.config';

@Injectable()
export class UploadService {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const filename = generateFilename(file);
    const url = await this.storageProvider.upload(file, filename);
    return { filename, url };
  }
}
