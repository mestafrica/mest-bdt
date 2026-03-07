import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';
import { ConflictException } from '@nestjs/common';

const companyModelMock = { ...mockModel };
const responseModelMock = { ...mockModel };

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: getModelToken('Company'), useValue: companyModelMock },
        { provide: getModelToken('Response'), useValue: responseModelMock },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a company', async () => {
    const dto = { name: 'Company 1' };
    companyModelMock.insertOne.mockResolvedValue(dto);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(companyModelMock.insertOne).toHaveBeenCalledWith(dto);
  });

  it('should count companies', async () => {
    companyModelMock.countDocuments.mockResolvedValue(10);
    const result = await service.countDocuments({});
    expect(result).toEqual(10);
    expect(companyModelMock.countDocuments).toHaveBeenCalledWith({});
  });

  it('should find all companies', async () => {
    const companies = [{ name: 'Company 1' }];
    companyModelMock.find.mockResolvedValue(companies);
    const result = await service.findAll({});
    expect(result).toEqual(companies);
    expect(companyModelMock.find).toHaveBeenCalledWith({});
  });

  it('should find one company', async () => {
    const company = { name: 'Company 1' };
    companyModelMock.findOne.mockResolvedValue(company);
    const result = await service.findOne({ _id: '1' });
    expect(result).toEqual(company);
    expect(companyModelMock.findOne).toHaveBeenCalledWith({
      _id: '1',
    });
  });

  it('should update a company', async () => {
    const company = { name: 'Updated Company' };
    companyModelMock.updateOne.mockResolvedValue(company);
    const result = await service.updateOne({ _id: '1' }, company);
    expect(result).toEqual(company);
    expect(companyModelMock.updateOne).toHaveBeenCalledWith(
      { _id: '1' },
      company,
    );
  });

  describe('deleteOne', () => {
    it('should delete company if no responses exist', async () => {
      const company = { _id: 'cid1', name: 'Company 1' };
      companyModelMock.findOne.mockResolvedValue(company);
      responseModelMock.countDocuments.mockResolvedValue(0);
      companyModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await service.deleteOne({ _id: 'cid1' });
      expect(result).toEqual({ deletedCount: 1 });
    });

    it('should throw ConflictException if responses exist for company', async () => {
      const company = { _id: 'cid1', name: 'Company 1' };
      companyModelMock.findOne.mockResolvedValue(company);
      responseModelMock.countDocuments.mockResolvedValue(2);

      await expect(service.deleteOne({ _id: 'cid1' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should still delete if company not found', async () => {
      companyModelMock.findOne.mockResolvedValue(null);
      companyModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const result = await service.deleteOne({ _id: 'non-existent' });
      expect(result).toEqual({ deletedCount: 0 });
    });
  });
});
