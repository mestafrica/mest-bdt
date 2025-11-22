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
import { CohortsService } from './cohorts.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @Post()
  create(@Body() createCohortDto: CreateCohortDto) {
    return this.cohortsService.create(createCohortDto);
  }

  @Get()
  findAll(@Query() filter: JSON) {
    return this.cohortsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohortsService.findOne({ _id: id });
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
    return this.cohortsService.updateOne({ _id: id }, updateCohortDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.cohortsService.deleteOne({ _id: id });
  }
}
