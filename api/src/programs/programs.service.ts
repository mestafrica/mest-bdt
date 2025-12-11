import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Program } from './schemas/program.schema';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  create(doc: AnyKeys<Program>) {
    return this.programModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Program>) {
    return this.programModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Program>) {
    return this.programModel.find(filter);
  }

  findOne(filter: QueryFilter<Program>) {
    return this.programModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Program>, update: UpdateQuery<Program>) {
    return this.programModel.updateOne(filter, update);
  }

  deleteOne(filter: QueryFilter<Program>) {
    return this.programModel.deleteOne(filter);
  }
}
