import { Test, TestingModule } from '@nestjs/testing';
import { CohortsService } from './cohorts.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';

describe('CohortsService', () => {
  let service: CohortsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CohortsService,
        { provide: getModelToken('Cohort'), useValue: mockModel },
      ],
    }).compile();

    service = module.get<CohortsService>(CohortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
