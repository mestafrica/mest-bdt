import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import type { ImageProvider } from './image-provider.interface';

@Injectable()
export class UploadsService {
  constructor(@Inject('IMAGE_PROVIDER') private imageProvider: ImageProvider) {}

  async uploadImage(file: Express.Multer.File): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Allowed: jpg, jpeg, png, gif, webp',
      );
    }

    try {
      return await this.imageProvider.uploadImage(file);
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload image: ${error.message || 'Unknown error'}`,
      );
    }
  }
}
