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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './schemas/company.schema';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('companies')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiCreatedResponse({
    description: 'The company has been successfully created.',
    type: Company,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({
    description: 'The companies have been successfully found.',
    type: [Company],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.companiesService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total companies' })
  @ApiOkResponse({ description: 'The count of companies', type: Number })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.companiesService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiOkResponse({
    description: 'The company has been successfully found.',
    type: Company,
  })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiOkResponse({
    description: 'The company has been successfully updated.',
    type: Company,
  })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  updateOne(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.updateOne({ _id: id }, updateCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiOkResponse({
    description: 'The company has been successfully deleted.',
    type: Company,
  })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteOne(@Param('id') id: string) {
    return this.companiesService.deleteOne({ _id: id });
  }
}
