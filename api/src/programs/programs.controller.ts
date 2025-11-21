import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  findAll(@Query() filter: JSON) {
    return this.programsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne({ _id: id });
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.updateOne({ _id: id }, updateProgramDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.programsService.deleteOne({ _id: id });
  }
}
