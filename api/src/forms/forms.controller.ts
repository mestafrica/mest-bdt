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
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './schemas/form.schema';
import { AuthGuard } from '../common/guards/auth.guard';
import { TemporarilyBlockedGuard } from '../common/guards/temporarily-blocked.guard';

@ApiTags('forms')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(TemporarilyBlockedGuard, AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new form' })
  @ApiCreatedResponse({
    description: 'The form has been successfully created.',
    type: Form,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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
  @ApiOperation({ summary: 'Get all forms' })
  @ApiOkResponse({ description: 'Forms retrieved successfully.', type: [Form] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.formsService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total forms' })
  @ApiOkResponse({ description: 'The count of forms', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.formsService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a form by id' })
  @ApiOkResponse({
    description: 'The form has been successfully found.',
    type: Form,
  })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.formsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a form' })
  @ApiOkResponse({
    description: 'The form has been successfully updated.',
    type: Form,
  })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  updateOne(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.updateOne({ _id: id }, updateFormDto);
  }

  @UseGuards(TemporarilyBlockedGuard, AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a form' })
  @ApiOkResponse({
    description: 'The form has been successfully deleted.',
    type: Form,
  })
  @ApiNotFoundResponse({ description: 'Form with the given ID not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteOne(@Param('id') id: string) {
    return this.formsService.deleteOne({ _id: id });
  }
}
