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
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  async create(@Body() createResponseDto: CreateResponseDto) {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  async findAll(@Query() { filter = '{}' }: { filter: string }) {
    return this.responsesService.findAll(JSON.parse(filter) as object);
  }

  @Get('count')
  countDocuments(@Query() { filter = '{}' }: { filter: string }) {
    return this.responsesService.countDocuments(JSON.parse(filter) as object);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.responsesService.findOne({ _id: id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    return this.responsesService.updateOne({ _id: id }, updateResponseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.responsesService.deleteOne({ _id: id });
  }
}
