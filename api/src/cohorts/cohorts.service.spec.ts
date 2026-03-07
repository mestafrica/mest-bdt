import { Test, TestingModule } from '@nestjs/testing';
import { CohortsService } from './cohorts.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';
import { ConflictException } from '@nestjs/common';

// Use separate mock instances per model so we can control them independently
const cohortModelMock = { ...mockModel };
const companyModelMock = { ...mockModel };

describe('CohortsService', () => {
  let service: CohortsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CohortsService,
        { provide: getModelToken('Cohort'), useValue: cohortModelMock },
        { provide: getModelToken('Company'), useValue: companyModelMock },
      ],
    }).compile();

    service = module.get<CohortsService>(CohortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cohort', async () => {
    const dto = { name: 'Cohort 1' };
    cohortModelMock.insertOne.mockResolvedValue(dto);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(cohortModelMock.insertOne).toHaveBeenCalledWith(dto);
  });

  it('should count cohorts', async () => {
    cohortModelMock.countDocuments.mockResolvedValue(10);
    const result = await service.countDocuments({});
    expect(result).toEqual(10);
    expect(cohortModelMock.countDocuments).toHaveBeenCalledWith({});
  });

  it('should find all cohorts', async () => {
    const cohorts = [{ name: 'Cohort 1' }];
    cohortModelMock.find.mockResolvedValue(cohorts);
    const result = await service.findAll({});
    expect(result).toEqual(cohorts);
    expect(cohortModelMock.find).toHaveBeenCalledWith({});
  });

  it('should find one cohort', async () => {
    const cohort = { name: 'Cohort 1' };
    cohortModelMock.findOne.mockResolvedValue(cohort);
    const result = await service.findOne({ _id: '1' });
    expect(result).toEqual(cohort);
    expect(cohortModelMock.findOne).toHaveBeenCalledWith({
      _id: '1',
    });
  });

  it('should update a cohort', async () => {
    const cohort = { name: 'Updated Cohort' };
    cohortModelMock.updateOne.mockResolvedValue(cohort);
    const result = await service.updateOne({ _id: '1' }, cohort);
    expect(result).toEqual(cohort);
    expect(cohortModelMock.updateOne).toHaveBeenCalledWith(
      { _id: '1' },
      cohort,
    );
  });

  describe('deleteOne', () => {
    it('should delete cohort if no companies exist', async () => {
      const cohort = { _id: 'cid1', name: 'Cohort 1' };
      cohortModelMock.findOne.mockResolvedValue(cohort);
      companyModelMock.countDocuments.mockResolvedValue(0);
      cohortModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await service.deleteOne({ _id: 'cid1' });
      expect(result).toEqual({ deletedCount: 1 });
    });

    it('should throw ConflictException if companies exist for cohort', async () => {
      const cohort = { _id: 'cid1', name: 'Cohort 1' };
      cohortModelMock.findOne.mockResolvedValue(cohort);
      companyModelMock.countDocuments.mockResolvedValue(3);

      await expect(service.deleteOne({ _id: 'cid1' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should still delete if cohort not found', async () => {
      cohortModelMock.findOne.mockResolvedValue(null);
      cohortModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const result = await service.deleteOne({ _id: 'non-existent' });
      expect(result).toEqual({ deletedCount: 0 });
    });
  });
});
