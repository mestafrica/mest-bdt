import { Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument} from './schemas/response.schema';

@Injectable()
export class ResponsesService {
  constructor(@InjectModel(Response.name) private responseModel: Model<ResponseDocument>) {}

  async create(createResponseDto: CreateResponseDto): Promise<ResponseDocument> {
    const newResponse = new this.responseModel(createResponseDto);
    return newResponse.save();
  }

  async findAll(): Promise<ResponseDocument[]> {
    return this.responseModel.find() .populate('form') .populate('company') .exec();
  }

  async findOne(id: string): Promise<ResponseDocument | null> {
    return this.responseModel.findById(id) .populate('form') .populate('company') .exec();
  }

  async update(id: string, updateResponseDto: UpdateResponseDto): Promise<ResponseDocument | null> {
    return this.responseModel .findByIdAndUpdate(id, updateResponseDto, { new: true }) .populate('form') .populate('company') .exec();
  }

  async remove(id: string): Promise<ResponseDocument | null> {
    return this.responseModel.findByIdAndDelete(id).exec();  
  }
}
