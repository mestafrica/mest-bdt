import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Response } from './schemas/response.schema';
import { mockModel } from '../common/mocks/model';

describe('ResponsesController', () => {
  let controller: ResponsesController;
  let service: ResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesController],
      providers: [
        ResponsesService,
        { provide: getModelToken('Response'), useValue: mockModel },
      ],
    }).compile();

    controller = module.get<ResponsesController>(ResponsesController);
    service = module.get<ResponsesService>(ResponsesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a response', async () => {
    const dto = { formId: 'f1' };
    jest.spyOn(service, 'create').mockResolvedValue(dto as any);
    const result = await controller.create(dto as any);
    expect(result).toEqual(dto);
    expect(service.create as jest.Mock).toHaveBeenCalledWith(dto);
  });

  it('should find all responses', async () => {
    const responses = [{ formId: 'f1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(responses as any);
    const result = await controller.findAll({ filter: '{}' });
    expect(result).toEqual(responses);
    expect(service.findAll as jest.Mock).toHaveBeenCalledWith({});
  });

  it('should count responses', async () => {
    jest.spyOn(service, 'countDocuments').mockResolvedValue(5 as any);
    const result = await controller.countDocuments({ filter: '{}' });
    expect(result).toEqual(5);
    expect(service.countDocuments as jest.Mock).toHaveBeenCalledWith({});
  });

  it('should find one response', async () => {
    const response = { formId: 'f1' };
    jest.spyOn(service, 'findOne').mockResolvedValue(response as any);
    const result = await controller.findOne('1');
    expect(result).toEqual(response);
  });

  it('should update a response', async () => {
    const dto = { formId: 'Updated' };
    jest.spyOn(service, 'updateOne').mockResolvedValue(dto as any);
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(dto);
  });

  it('should delete a response', async () => {
    jest
      .spyOn(service, 'deleteOne')
      .mockResolvedValue({ deletedCount: 1 } as any);
    const result = await controller.remove('1');
    expect(result).toEqual({ deletedCount: 1 });
  });
});
