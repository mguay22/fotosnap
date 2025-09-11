import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File) {
    return { filename: file.filename };
  }
}
