import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { StorageProvider } from './storage.interface';
import { ConfigService } from '@nestjs/config';

export class S3StorageProvider implements StorageProvider {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow('AWS_S3_BUCKET');
    this.region = this.configService.getOrThrow('AWS_S3_REGION');
    this.s3Client = new S3Client({
      region: this.region,
    });
  }

  async upload(file: Express.Multer.File, filename: string): Promise<string> {
    const key = `images/${filename}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return this.getUrl(filename);
  }

  getUrl(filename: string): string {
    const key = `images/${filename}`;
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}
