import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HankoUser } from '../common/decorators/user.decorator';

describe('UsersController', () => {
  let controller: UsersController;

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
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test',
      company: '60f1b9b3b3b3b3b3b3b3b3b3',
      phone: '1234567890',
      location: 'New York',
      avatar: 'https://example.com/avatar.jpg',
      bio: 'Tech enthusiast',
      access: 'READ',
    };

    it('should create a user if email does not exist', async () => {
      mockUsersService.countDocuments.mockResolvedValue(0);
      mockUsersService.create.mockResolvedValue({
        _id: '123',
        ...createUserDto,
      });

      const result = await controller.create(createUserDto);

      expect(mockUsersService.countDocuments).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
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
      expect(mockUsersService.findAll).toHaveBeenCalledWith({ role: 'user' });
    });

    it('should call service.findAll with default filter if none provided', async () => {
      await controller.findAll({ filter: undefined as any });
      expect(mockUsersService.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('countDocuments', () => {
    it('should call service.countDocuments with parsed filter', async () => {
      const filter = '{"role":"user"}';
      await controller.countDocuments({ filter });
      expect(mockUsersService.countDocuments).toHaveBeenCalledWith({
        role: 'user',
      });
    });
  });

  describe('findCurrentUser', () => {
    const mockUser: HankoUser = {
      email: { address: 'test@example.com' },
    } as HankoUser;

    it('should return current user if exists', async () => {
      mockUsersService.countDocuments.mockResolvedValue(1);
      mockUsersService.findOne.mockResolvedValue({ email: 'test@example.com' });

      const result = await controller.findCurrentUser(mockUser);

      expect(mockUsersService.countDocuments).toHaveBeenCalledWith({
        email: mockUser.email.address,
      });
      expect(mockUsersService.findOne).toHaveBeenCalledWith({
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
      expect(mockUsersService.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('updateOne', () => {
    it('should call service.updateOne with id and dto', async () => {
      const id = '123';
      const updateUserDto: UpdateUserDto = { name: 'Updated' };
      await controller.updateOne(id, updateUserDto);
      expect(mockUsersService.updateOne).toHaveBeenCalledWith(
        { _id: id },
        updateUserDto,
      );
    });
  });

  describe('deleteOne', () => {
    it('should call service.deleteOne with id', async () => {
      const id = '123';
      await controller.deleteOne(id);
      expect(mockUsersService.deleteOne).toHaveBeenCalledWith({ _id: id });
    });
  });
});
