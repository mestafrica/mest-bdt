import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../common/guards/auth.guard';

describe('UploadsController', () => {
  let controller: UploadsController;
  let service: UploadsService;

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
    service = module.get<UploadsService>(UploadsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload an image', async () => {
    const mockFile = { originalname: 'test.png' } as Express.Multer.File;
    const mockResponse = { url: 'https://test.com' };
    mockUploadsService.uploadImage.mockResolvedValue(mockResponse);

    const result = await controller.uploadImage(mockFile);

    expect(result).toEqual(mockResponse);
    expect(service.uploadImage as jest.Mock).toHaveBeenCalledWith(mockFile);
  });
});
