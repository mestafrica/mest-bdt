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
  ConflictException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'The form has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async create(@Body() createFormDto: CreateFormDto) {
    // Ensure form does not already exist
    const formExists = await this.formsService.findOne({
      name: createFormDto.name,
    });
    if (formExists) {
      throw new ConflictException('Form already exists');
    }
    return this.formsService.create(createFormDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Forms retrieved successfully.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.formsService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.formsService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The form has been successfully found.' })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  findOne(@Param('id') id: string) {
    return this.formsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The form has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.updateOne({ _id: id }, updateFormDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The form has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  deleteOne(@Param('id') id: string) {
    return this.formsService.deleteOne({ _id: id });
  }
}
