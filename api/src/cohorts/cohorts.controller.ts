import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CohortsService } from './cohorts.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @Get()
  getAll() {
    return this.cohortsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.cohortsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCohortDto) {
    return this.cohortsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCohortDto) {
    return this.cohortsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohortsService.remove(id);
  }
}
