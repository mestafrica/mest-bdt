import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProfilesService } from './profiles.service';
import { mockModel } from '../common/mocks/model';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        { provide: getModelToken('Profile'), useValue: mockModel },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profile', async () => {
    const dto = { name: 'Profile 1' };
    mockModel.insertOne.mockResolvedValue(dto);
    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockModel.insertOne).toHaveBeenCalledWith(dto);
  });

  it('should count profiles', async () => {
    mockModel.countDocuments.mockResolvedValue(10);
    const result = await service.countDocuments({});
    expect(result).toEqual(10);
    expect(mockModel.countDocuments).toHaveBeenCalledWith({});
  });

  it('should find all profiles', async () => {
    const profiles = [{ name: 'Profile 1' }];
    mockModel.find.mockResolvedValue(profiles);
    const result = await service.findAll({});
    expect(result).toEqual(profiles);
    expect(mockModel.find).toHaveBeenCalledWith({});
  });

  it('should find one profile', async () => {
    const profile = { name: 'Profile 1' };
    mockModel.findOne.mockResolvedValue(profile);
    const result = await service.findOne({ _id: '1' });
    expect(result).toEqual(profile);
    expect(mockModel.findOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should update a profile', async () => {
    const profile = { name: 'Updated Profile' };
    mockModel.updateOne.mockResolvedValue(profile);
    const result = await service.updateOne({ _id: '1' }, profile);
    expect(result).toEqual(profile);
    expect(mockModel.updateOne).toHaveBeenCalledWith({ _id: '1' }, profile);
  });

  it('should delete a profile', async () => {
    mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await service.deleteOne({ _id: '1' });
    expect(result).toEqual({ deletedCount: 1 });
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
  });
});
