import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { CloudinaryImageProvider } from './cloudinary-image.provider';
import { OpeninaryImageProvider } from './openinary-image.provider';

@Module({
  controllers: [UploadsController],
  providers: [
    UploadsService,
    {
      provide: 'IMAGE_PROVIDER',
      useFactory: () => {
        const provider = process.env.UPLOAD_PROVIDER || 'openinary';
        if (provider === 'cloudinary') {
          return new CloudinaryImageProvider();
        }
        return new OpeninaryImageProvider();
      },
    },
  ],
})
export class UploadsModule {}
