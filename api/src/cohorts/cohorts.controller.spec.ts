import { Test, TestingModule } from '@nestjs/testing';
import { CohortsController } from './cohorts.controller';
import { CohortsService } from './cohorts.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';

describe('CohortsController', () => {
  let controller: CohortsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortsController],
      providers: [
        CohortsService,
        { provide: getModelToken('Cohort'), useValue: mockModel },
      ],
    }).compile();

    controller = module.get<CohortsController>(CohortsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
