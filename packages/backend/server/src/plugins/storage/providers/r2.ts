import assert from 'node:assert';

import { Logger } from '@nestjs/common';

import type { R2StorageConfig } from '../config';
import { S3StorageProvider } from './s3';

export class R2StorageProvider extends S3StorageProvider {
  override readonly type = 'cloudflare-r2' as any /* cast 'r2' to 's3' */;

  constructor(config: R2StorageConfig, bucket: string) {
    assert(config.region, 'region is required for VK S3 storage provider');
    super(
      {
        ...config,
        endpoint: 'https://fine-app.hb.ru-msk.vkcloud-storage.ru',
        region: config.region,
      },
      bucket
    );
    this.logger = new Logger(`${R2StorageProvider.name}:${bucket}`);
  }
}
