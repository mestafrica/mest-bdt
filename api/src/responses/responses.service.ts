import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, AnyKeys, QueryFilter, UpdateQuery, Types } from 'mongoose';
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
    return this.responseModel.find(filter).populate('form').populate('company');
  }

  findOne(filter: QueryFilter<Response>) {
    return this.responseModel
      .findOne(filter)
      .populate('form')
      .populate('company');
  }

  findByCompany(companyId: string) {
    const filter: QueryFilter<Response> = {
      company: new Types.ObjectId(companyId) as any,
    };
    return this.responseModel.find(filter).populate('form').populate('company');
  }

  findByForm(formId: string) {
    const filter: QueryFilter<Response> = {
      form: new Types.ObjectId(formId) as any,
    };
    return this.responseModel.find(filter).populate('form').populate('company');
  }

  updateOne(filter: QueryFilter<Response>, update: UpdateQuery<Response>) {
    return this.responseModel.findOneAndUpdate(filter, update, { new: true });
  }

  deleteOne(filter: QueryFilter<Response>) {
    return this.responseModel.deleteOne(filter);
  }
}
