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
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('responses')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'The response has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The responses have been successfully found.',
  })
  findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.responsesService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.responsesService.countDocuments(JSON.parse(filter) as object);
  }

  @Get('company/:companyId')
  @ApiOkResponse({
    description: 'The responses for the company have been successfully found.',
  })
  findByCompany(@Param('companyId') companyId: string) {
    return this.responsesService.findByCompany(companyId);
  }

  @Get('form/:formId')
  @ApiOkResponse({
    description: 'The responses for the form have been successfully found.',
  })
  findByForm(@Param('formId') formId: string) {
    return this.responsesService.findByForm(formId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The response has been successfully found.' })
  @ApiNotFoundResponse({
    description: 'The response with the given id was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.responsesService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The response has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'The response with the given id was not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  updateOne(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    return this.responsesService.updateOne({ _id: id }, updateResponseDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The response has been successfully deleted.' })
  @ApiNotFoundResponse({
    description: 'The response with the given id was not found.',
  })
  deleteOne(@Param('id') id: string) {
    return this.responsesService.deleteOne({ _id: id });
  }
}
