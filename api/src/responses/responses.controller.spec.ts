import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Response } from './schemas/response.schema';
import { mockModel } from '../common/mocks/model';

describe('ResponsesController', () => {
  let controller: ResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesController],
      providers: [
        ResponsesService,
        {
          provide: getModelToken(Response.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<ResponsesController>(ResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
