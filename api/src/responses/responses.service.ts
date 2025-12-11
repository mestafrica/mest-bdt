import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, AnyKeys, QueryFilter, UpdateQuery } from 'mongoose';
import { Response } from './schemas/response.schema';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<Response>,
  ) {}

  create(doc: AnyKeys<Response>) {
    return this.responseModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Response>) {
    return this.responseModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Response>) {
    return this.responseModel.find(filter);
  }

  findOne(filter: QueryFilter<Response>) {
    return this.responseModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Response>, update: UpdateQuery<Response>) {
    return this.responseModel.updateOne(filter, update);
  }

  deleteOne(filter: QueryFilter<Response>) {
    return this.responseModel.deleteOne(filter);
  }
}
