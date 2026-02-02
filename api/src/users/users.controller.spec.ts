import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    countDocuments: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = { email: 'test@example.com', name: 'Test' } as any;

    it('should create a user if email does not exist', async () => {
      mockUsersService.countDocuments.mockResolvedValue(0);
      mockUsersService.create.mockResolvedValue({
        _id: '123',
        ...createUserDto,
      });

      const result = await controller.create(createUserDto);

      expect(service.countDocuments).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ _id: '123', ...createUserDto });
    });

    it('should throw ConflictException if email exists', async () => {
      mockUsersService.countDocuments.mockResolvedValue(1);

      await expect(controller.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with parsed filter', async () => {
      const filter = '{"role":"user"}';
      await controller.findAll({ filter });
      expect(service.findAll).toHaveBeenCalledWith({ role: 'user' });
    });

    it('should call service.findAll with default filter if none provided', async () => {
      await controller.findAll({ filter: undefined as any });
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('countDocuments', () => {
    it('should call service.countDocuments with parsed filter', async () => {
      const filter = '{"role":"user"}';
      await controller.countDocuments({ filter });
      expect(service.countDocuments).toHaveBeenCalledWith({ role: 'user' });
    });
  });

  describe('findCurrentUser', () => {
    const mockUser = { email: { address: 'test@example.com' } } as any;

    it('should return current user if exists', async () => {
      mockUsersService.countDocuments.mockResolvedValue(1);
      mockUsersService.findOne.mockResolvedValue({ email: 'test@example.com' });

      const result = await controller.findCurrentUser(mockUser);

      expect(service.countDocuments).toHaveBeenCalledWith({
        email: mockUser.email.address,
      });
      expect(service.findOne).toHaveBeenCalledWith({
        email: mockUser.email.address,
      });
      expect(result).toEqual({ email: 'test@example.com' });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUsersService.countDocuments.mockResolvedValue(0);

      await expect(controller.findCurrentUser(mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id', async () => {
      const id = '123';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('updateOne', () => {
    it('should call service.updateOne with id and dto', async () => {
      const id = '123';
      const updateUserDto = { name: 'Updated' } as any;
      await controller.updateOne(id, updateUserDto);
      expect(service.updateOne).toHaveBeenCalledWith(
        { _id: id },
        updateUserDto,
      );
    });
  });

  describe('deleteOne', () => {
    it('should call service.deleteOne with id', async () => {
      const id = '123';
      await controller.deleteOne(id);
      expect(service.deleteOne).toHaveBeenCalledWith({ _id: id });
    });
  });
});
