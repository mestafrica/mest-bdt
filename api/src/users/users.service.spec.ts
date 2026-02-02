import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userModel.insertOne on create', async () => {
    const doc = { email: 'test@example.com' };
    await service.create(doc);
    expect(mockModel.insertOne).toHaveBeenCalledWith(doc);
  });

  it('should call userModel.countDocuments on countDocuments', async () => {
    const filter = { email: 'test@example.com' };
    await service.countDocuments(filter);
    expect(mockModel.countDocuments).toHaveBeenCalledWith(filter);
  });

  it('should call userModel.find on findAll', async () => {
    const filter = { role: 'user' };
    await service.findAll(filter);
    expect(mockModel.find).toHaveBeenCalledWith(filter);
  });

  it('should call userModel.findOne on findOne', async () => {
    const filter = { _id: '123' };
    await service.findOne(filter);
    expect(mockModel.findOne).toHaveBeenCalledWith(filter);
  });

  it('should call userModel.updateOne on updateOne', async () => {
    const filter = { _id: '123' };
    const update = { name: 'Updated Name' };
    await service.updateOne(filter, update);
    expect(mockModel.updateOne).toHaveBeenCalledWith(filter, update);
  });

  it('should call userModel.deleteOne on deleteOne', async () => {
    const filter = { _id: '123' };
    await service.deleteOne(filter);
    expect(mockModel.deleteOne).toHaveBeenCalledWith(filter);
  });
});
