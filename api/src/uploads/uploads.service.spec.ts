import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';
import { BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Mock Cloudinary
jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsService],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    const mockFile = {
      buffer: Buffer.from('test-image'),
      mimetype: 'image/jpeg',
    } as Express.Multer.File;

    it('should upload image successfully and return URL', async () => {
      const mockUploadResponse: Partial<UploadApiResponse> = {
        secure_url:
          'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
      };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (options, callback: (error: any, result: any) => void) => {
          callback(null, mockUploadResponse);
          return {
            end: jest.fn().mockImplementation(() => {
              return true;
            }),
          };
        },
      );

      const result = await service.uploadImage(mockFile);
      expect(result).toEqual({ url: mockUploadResponse.secure_url });
      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        { resource_type: 'image' },
        expect.any(Function),
      );
    });

    it('should throw BadRequestException if no file is provided', async () => {
      await expect(
        service.uploadImage(null as unknown as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if invalid mime type', async () => {
      const invalidFile = {
        ...mockFile,
        mimetype: 'application/pdf',
      } as Express.Multer.File;
      await expect(service.uploadImage(invalidFile)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if Cloudinary upload fails', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (options, callback: (error: any, result: any) => void) => {
          callback(new Error('Upload failed'), null);
          return { end: jest.fn() };
        },
      );

      await expect(service.uploadImage(mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
