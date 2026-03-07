import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ConflictException,
  UseGuards,
  NotFoundException,
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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { CurrentUser, HankoUser } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('profiles')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({
    description: 'The profile has been successfully created.',
    type: Profile,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createProfileDto: CreateProfileDto) {
    // Ensure profile with email does not exist
    const count = await this.profilesService.countDocuments({
      email: createProfileDto.email,
    });
    if (count) throw new ConflictException('Profile with email already exist!');
    // Proceed to create new profile
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiOkResponse({
    description: 'The profiles have been successfully found.',
    type: [Profile],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.profilesService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total profiles' })
  @ApiOkResponse({ description: 'The count of profiles', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.profilesService.countDocuments(JSON.parse(filter) as object);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'The current user profile has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: 'The profile for the current user was not found.',
  })
  async findCurrentUser(@CurrentUser() user: HankoUser) {
    // Ensure profile with email exist
    const count = await this.profilesService.countDocuments({
      email: user.email.address,
    });
    if (!count)
      throw new NotFoundException('Profile with email does not exist!');
    // Proceed to find and return profile
    return this.profilesService.findOne({ email: user.email.address });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a profile by id' })
  @ApiOkResponse({
    description: 'The profile has been successfully found.',
    type: Profile,
  })
  @ApiNotFoundResponse({
    description: 'The profile with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a profile' })
  @ApiOkResponse({
    description: 'The profile has been successfully updated.',
    type: Profile,
  })
  @ApiNotFoundResponse({
    description: 'The profile with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async updateOne(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profilesService.findOne({ _id: id });
    if (!profile)
      throw new NotFoundException('Profile for user does not exist!');
    return this.profilesService.updateOne({ _id: id }, updateProfileDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiOkResponse({
    description: 'The profile has been successfully deleted.',
    type: Profile,
  })
  @ApiNotFoundResponse({
    description: 'The profile with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async deleteOne(@Param('id') id: string) {
    const profile = await this.profilesService.findOne({ _id: id });
    if (!profile)
      throw new NotFoundException('Profile for user does not exist!');
    return this.profilesService.deleteOne({ _id: id });
  }
}
