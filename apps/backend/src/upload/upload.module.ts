import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './upload.config';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [MulterModule.register(multerConfig), StorageModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
