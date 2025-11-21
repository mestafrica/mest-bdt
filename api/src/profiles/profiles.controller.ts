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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser, HankoUser } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
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
  findAll(@Query() filter: JSON) {
    return this.profilesService.findAll(filter);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async findCurrentUser(@CurrentUser() user: HankoUser) {
    // Ensure profile with email exist
    const count = await this.profilesService.countDocuments({
      email: user.email.address,
    });
    if (!count)
      throw new NotFoundException('Profile with email does not exist!');
    // Proceed to create new profile
    return this.profilesService.findOne({ email: user.email.address });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ _id: id });
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateOne({ _id: id }, updateProfileDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.profilesService.deleteOne({ _id: id });
  }
}
