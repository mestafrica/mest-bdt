import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CohortsService } from './cohorts.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@ApiTags('cohorts')
@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The cohort has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  create(@Body() createCohortDto: CreateCohortDto) {
    return this.cohortsService.create(createCohortDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The cohorts have been successfully found.',
  })
  findAll(@Query() filter: JSON) {
    return this.cohortsService.findAll(filter);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The cohort has been successfully found.' })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.cohortsService.findOne({ _id: id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The cohort has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
    return this.cohortsService.updateOne({ _id: id }, updateCohortDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The cohort has been successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'The cohort with the given id was not found.',
  })
  deleteOne(@Param('id') id: string) {
    return this.cohortsService.deleteOne({ _id: id });
  }
}
