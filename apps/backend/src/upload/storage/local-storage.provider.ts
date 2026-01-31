import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.interface';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir = './uploads/images';

  async upload(file: Express.Multer.File, filename: string): Promise<string> {
    await mkdir(this.uploadDir, { recursive: true });
    const filePath = join(this.uploadDir, filename);
    await writeFile(filePath, file.buffer);
    return this.getUrl(filename);
  }

  getUrl(filename: string): string {
    return `/uploads/images/${filename}`;
  }
}
