import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Form } from './schemas/form.schema';
import { Response } from '../responses/schemas/response.schema';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<Form>,
    @InjectModel(Response.name) private readonly responseModel: Model<Response>,
  ) {}

  create(doc: AnyKeys<Form>) {
    return this.formModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Form>) {
    return this.formModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Form>) {
    return this.formModel.find(filter);
  }

  findOne(filter: QueryFilter<Form>) {
    return this.formModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Form>, update: UpdateQuery<Form>) {
    return this.formModel.updateOne(filter, update);
  }

  async deleteOne(filter: QueryFilter<Form>) {
    const form = await this.formModel.findOne(filter);
    if (form) {
      const responseCount = await this.responseModel.countDocuments({
        form: form._id as any,
      });
      if (responseCount > 0) {
        throw new ConflictException(
          'Cannot delete form with existing responses. Remove all responses first.',
        );
      }
    }
    return this.formModel.deleteOne(filter);
  }
}
