import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';
import { BadRequestException } from '@nestjs/common';
import { ImageProvider } from './image-provider.interface';

describe('UploadsService', () => {
  let service: UploadsService;
  let mockImageProvider: jest.Mocked<ImageProvider>;

  beforeEach(async () => {
    mockImageProvider = {
      uploadImage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsService,
        {
          provide: 'IMAGE_PROVIDER',
          useValue: mockImageProvider,
        },
      ],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should successfully upload an image', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
        originalname: 'test.jpg',
      } as Express.Multer.File;

      const mockResponse = { url: 'https://example.com/image.jpg' };
      mockImageProvider.uploadImage.mockResolvedValue(mockResponse);

      const result = await service.uploadImage(mockFile);
      expect(result).toEqual(mockResponse);
      expect(mockImageProvider.uploadImage).toHaveBeenCalledWith(mockFile);
    });

    it('should throw BadRequestException if no file is provided', async () => {
      await expect(service.uploadImage(null)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if invalid mime type', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'text/plain',
      } as Express.Multer.File;

      await expect(service.uploadImage(mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if image provider fails', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      mockImageProvider.uploadImage.mockRejectedValue(new Error('Upload failed'));

      await expect(service.uploadImage(mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
