import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';

describe('FormsController', () => {
  let controller: FormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        FormsService,
        { provide: getModelToken('Form'), useValue: mockModel },
      ],
    }).compile();

    controller = module.get<FormsController>(FormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
