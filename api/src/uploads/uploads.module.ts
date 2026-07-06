import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { OpeninaryImageProvider } from './openinary-image.provider';

@Module({
  controllers: [UploadsController],
  providers: [
    UploadsService,
    {
      provide: 'IMAGE_PROVIDER',
      useClass: OpeninaryImageProvider,
    },
  ],
})
export class UploadsModule {}
