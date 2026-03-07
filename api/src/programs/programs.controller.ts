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
import { ProgramsService } from './programs.service';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './schemas/program.schema';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('programs')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new program' })
  @ApiCreatedResponse({
    description: 'The program has been successfully created.',
    type: Program,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiOkResponse({
    description: 'The programs have been successfully found.',
    type: [Program],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.programsService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total programs' })
  @ApiOkResponse({ description: 'The count of programs', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.programsService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a program by id' })
  @ApiOkResponse({
    description: 'The program has been successfully found.',
    type: Program,
  })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a program' })
  @ApiOkResponse({
    description: 'The program has been successfully updated.',
    type: Program,
  })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  updateOne(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.updateOne({ _id: id }, updateProgramDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program' })
  @ApiOkResponse({
    description: 'The program has been successfully deleted.',
    type: Program,
  })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteOne(@Param('id') id: string) {
    return this.programsService.deleteOne({ _id: id });
  }
}
