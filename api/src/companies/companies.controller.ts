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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The company has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The companies have been successfully found.',
  })
  findAll(@Query() filter: JSON) {
    return this.companiesService.findAll(filter);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The company has been successfully found.' })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne({ _id: id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The company has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.updateOne({ _id: id }, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The company has been successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'The company with the given id was not found.',
  })
  deleteOne(@Param('id') id: string) {
    return this.companiesService.deleteOne({ _id: id });
  }
}
