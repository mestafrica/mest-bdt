import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../common/guards/auth.guard';

describe('UploadsController', () => {
  let controller: UploadsController;

  const mockUploadsService = {
    uploadImage: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [
        {
          provide: UploadsService,
          useValue: mockUploadsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UploadsController>(UploadsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should call uploadsService.uploadImage and return the result', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
      } as Express.Multer.File;
      const expectedResult = { url: 'http://example.com/image.jpg' };
      mockUploadsService.uploadImage.mockResolvedValue(expectedResult);

      const result = await controller.uploadImage(mockFile);
      expect(result).toEqual(expectedResult);
    });
  });
});
