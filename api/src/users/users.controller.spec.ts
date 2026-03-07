import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { mockModel } from '../common/mocks/model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HankoUser } from '../common/decorators/user.decorator';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockModel },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateUserDto = { email: 'test@test.com' } as any;

    it('should create a user if they do not exist', async () => {
      jest.spyOn(service, 'countDocuments').mockResolvedValue(0);
      jest.spyOn(service, 'create').mockResolvedValue(dto as any);

      const result = await controller.create(dto);

      expect(result).toEqual(dto);
      expect(service.countDocuments).toHaveBeenCalledWith({ email: dto.email });
      expect(service.create as jest.Mock).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if user exists', async () => {
      jest.spyOn(service, 'countDocuments').mockResolvedValue(1);

      await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users = [{ email: 'test@test.com' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      const result = await controller.findAll({ filter: '{"role":"admin"}' });

      expect(result).toEqual(users);
      expect(service.findAll as jest.Mock).toHaveBeenCalledWith({
        role: 'admin',
      });
    });
  });

  describe('countDocuments', () => {
    it('should count users', async () => {
      jest.spyOn(service, 'countDocuments').mockResolvedValue(5);

      const result = await controller.countDocuments({ filter: '{}' });

      expect(result).toEqual(5);
    });
  });

  describe('findCurrentUser', () => {
    const hankoUser: HankoUser = { email: { address: 'me@test.com' } } as any;

    it('should find current user', async () => {
      jest.spyOn(service, 'countDocuments').mockResolvedValue(1);
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ email: 'me@test.com' } as any);

      const result = await controller.findCurrentUser(hankoUser);

      expect(result).toEqual({ email: 'me@test.com' });
    });

    it('should throw NotFoundException if current user not found', async () => {
      jest.spyOn(service, 'countDocuments').mockResolvedValue(0);

      await expect(controller.findCurrentUser(hankoUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOne', () => {
    it('should find one user by id', async () => {
      const user = { _id: '1' };
      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      const result = await controller.findOne('1');

      expect(result).toEqual(user);
      expect(service.findOne as jest.Mock).toHaveBeenCalledWith({ _id: '1' });
    });
  });

  describe('updateOne', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { name: 'Updated' };
      jest.spyOn(service, 'updateOne').mockResolvedValue(dto as any);

      const result = await controller.updateOne('1', dto);

      expect(result).toEqual(dto);
      expect(service.updateOne as jest.Mock).toHaveBeenCalledWith(
        { _id: '1' },
        dto,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete a user', async () => {
      jest
        .spyOn(service, 'deleteOne')
        .mockResolvedValue({ deletedCount: 1 } as any);

      const result = await controller.deleteOne('1');

      expect(result).toEqual({ deletedCount: 1 });
      expect(service.deleteOne as jest.Mock).toHaveBeenCalledWith({ _id: '1' });
    });
  });
});
