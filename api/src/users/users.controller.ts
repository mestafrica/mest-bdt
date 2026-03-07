import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser, HankoUser } from '../common/decorators/user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {
    // Ensure user with email does not exist
    const count = await this.usersService.countDocuments({
      email: createUserDto.email,
    });
    if (count) throw new ConflictException('User with email already exist!');
    // Proceed to create new user
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'The users have been successfully found.',
    type: [User],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.usersService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total users' })
  @ApiOkResponse({ description: 'The count of users', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.usersService.countDocuments(JSON.parse(filter) as object);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'The current user profile has been successfully found.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'The profile for the current user was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async findCurrentUser(@CurrentUser() user: HankoUser) {
    // Ensure user with email exist
    const count = await this.usersService.countDocuments({
      email: user.email.address,
    });
    if (!count) throw new NotFoundException('User with email does not exist!');
    // Proceed to find and return user
    return this.usersService.findOne({ email: user.email.address });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({
    description: 'The user has been successfully found.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne({ _id: id }, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne({ _id: id });
  }
}
