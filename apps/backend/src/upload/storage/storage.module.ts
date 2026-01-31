import { Module } from '@nestjs/common';
import { STORAGE_PROVIDER } from './storage.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3StorageProvider } from './s3-storage.provider';
import { LocalStorageProvider } from './local-storage.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: STORAGE_PROVIDER,
      useFactory: (configService: ConfigService) => {
        const storageType = configService.getOrThrow('STORAGE_TYPE');

        if (storageType === 's3') {
          return new S3StorageProvider(configService);
        }

        return new LocalStorageProvider();
      },
      inject: [ConfigService],
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
