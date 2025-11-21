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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll(@Query() filter: JSON) {
    return this.companiesService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne({ _id: id });
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.updateOne({ _id: id }, updateCompanyDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.companiesService.deleteOne({ _id: id });
  }
}
