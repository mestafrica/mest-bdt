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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The program has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The programs have been successfully found.',
  })
  findAll(@Query() filter: JSON) {
    return this.programsService.findAll(filter);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The program has been successfully found.' })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne({ _id: id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The program has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.updateOne({ _id: id }, updateProgramDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The program has been successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'The program with the given id was not found.',
  })
  deleteOne(@Param('id') id: string) {
    return this.programsService.deleteOne({ _id: id });
  }
}
