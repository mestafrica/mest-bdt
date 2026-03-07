import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from './forms.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';
import { ConflictException } from '@nestjs/common';

const formModelMock = { ...mockModel };
const responseModelMock = { ...mockModel };

describe('FormsService', () => {
  let service: FormsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormsService,
        { provide: getModelToken('Form'), useValue: formModelMock },
        { provide: getModelToken('Response'), useValue: responseModelMock },
      ],
    }).compile();

    service = module.get<FormsService>(FormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a form', async () => {
    const dto = { name: 'Form 1' };
    formModelMock.insertOne.mockResolvedValue(dto);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(formModelMock.insertOne).toHaveBeenCalledWith(dto);
  });

  it('should count forms', async () => {
    formModelMock.countDocuments.mockResolvedValue(10);
    const result = await service.countDocuments({});
    expect(result).toEqual(10);
    expect(formModelMock.countDocuments).toHaveBeenCalledWith({});
  });

  it('should find all forms', async () => {
    const forms = [{ name: 'Form 1' }];
    formModelMock.find.mockResolvedValue(forms);
    const result = await service.findAll({});
    expect(result).toEqual(forms);
    expect(formModelMock.find).toHaveBeenCalledWith({});
  });

  it('should find one form', async () => {
    const form = { name: 'Form 1' };
    formModelMock.findOne.mockResolvedValue(form);
    const result = await service.findOne({ _id: '1' });
    expect(result).toEqual(form);
    expect(formModelMock.findOne).toHaveBeenCalledWith({
      _id: '1',
    });
  });

  it('should update a form', async () => {
    const form = { name: 'Updated Form' };
    formModelMock.updateOne.mockResolvedValue(form);
    const result = await service.updateOne({ _id: '1' }, form);
    expect(result).toEqual(form);
    expect(formModelMock.updateOne).toHaveBeenCalledWith({ _id: '1' }, form);
  });

  describe('deleteOne', () => {
    it('should delete form if no responses exist', async () => {
      const form = { _id: 'fid1', name: 'Form 1' };
      formModelMock.findOne.mockResolvedValue(form);
      responseModelMock.countDocuments.mockResolvedValue(0);
      formModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await service.deleteOne({ _id: 'fid1' });
      expect(result).toEqual({ deletedCount: 1 });
    });

    it('should throw ConflictException if responses exist for form', async () => {
      const form = { _id: 'fid1', name: 'Form 1' };
      formModelMock.findOne.mockResolvedValue(form);
      responseModelMock.countDocuments.mockResolvedValue(5);

      await expect(service.deleteOne({ _id: 'fid1' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should still delete if form not found', async () => {
      formModelMock.findOne.mockResolvedValue(null);
      formModelMock.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const result = await service.deleteOne({ _id: 'non-existent' });
      expect(result).toEqual({ deletedCount: 0 });
    });
  });
});
