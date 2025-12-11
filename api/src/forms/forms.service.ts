import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { Form } from './schemas/form.schema';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<Form>,
  ) {}

  create(doc: AnyKeys<Form>) {
    return this.formModel.insertOne(doc);
  }

  countDocuments(filter: RootFilterQuery<Form>) {
    return this.formModel.countDocuments(filter);
  }

  findAll(filter: RootFilterQuery<Form>) {
    return this.formModel.find(filter);
  }

  findOne(filter: RootFilterQuery<Form>) {
    return this.formModel.findOne(filter);
  }

  updateOne(filter: RootFilterQuery<Form>, update: UpdateQuery<Form>) {
    return this.formModel.updateOne(filter, update);
  }

  deleteOne(filter: RootFilterQuery<Form>) {
    return this.formModel.deleteOne(filter);
  }
}
