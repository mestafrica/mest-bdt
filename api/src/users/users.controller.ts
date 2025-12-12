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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser, HankoUser } from '../common/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
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
  @ApiOkResponse({
    description: 'The users have been successfully found.',
  })
  findAll(@Query() filter: JSON) {
    return this.usersService.findAll(filter);
  }

  @Get('count')
  countDocuments(@Query() filter: JSON) {
    return this.usersService.countDocuments(filter);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOkResponse({
    description: 'The current user profile has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: 'The profile for the current user was not found.',
  })
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
  @ApiOkResponse({ description: 'The user has been successfully found.' })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The user has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne({ _id: id }, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The user has been successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'The user with the given id was not found.',
  })
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne({ _id: id });
  }
}
