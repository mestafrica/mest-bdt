import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ImageProvider, ImageUploadResponse } from './image-provider.interface';

@Injectable()
export class CloudinaryImageProvider implements ImageProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<ImageUploadResponse> {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(new Error(error.message));
          else resolve(result as UploadApiResponse);
        })
        .end(file.buffer);
    });

    return { url: result.secure_url };
  }
}
