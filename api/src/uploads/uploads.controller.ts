import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('uploads')
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(AuthGuard)
  @Post('image')
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://res.cloudinary.com/...' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadImage(file);
  }
}
