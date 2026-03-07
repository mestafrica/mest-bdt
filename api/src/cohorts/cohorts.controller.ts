import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
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
import { CohortsService } from './cohorts.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import { Cohort } from './schemas/cohort.schema';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('cohorts')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new cohort' })
  @ApiCreatedResponse({
    description: 'The cohort has been successfully created.',
    type: Cohort,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createCohortDto: CreateCohortDto) {
    return this.cohortsService.create(createCohortDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cohorts' })
  @ApiOkResponse({
    description: 'The cohorts have been successfully found.',
    type: [Cohort],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.cohortsService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total cohorts' })
  @ApiOkResponse({ description: 'The count of cohorts', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.cohortsService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cohort by id' })
  @ApiOkResponse({
    description: 'The cohort has been successfully found.',
    type: Cohort,
  })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.cohortsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a cohort' })
  @ApiOkResponse({
    description: 'The cohort has been successfully updated.',
    type: Cohort,
  })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  updateOne(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
    return this.cohortsService.updateOne({ _id: id }, updateCohortDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cohort' })
  @ApiOkResponse({
    description: 'The cohort has been successfully deleted.',
    type: Cohort,
  })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteOne(@Param('id') id: string) {
    return this.cohortsService.deleteOne({ _id: id });
  }
}
