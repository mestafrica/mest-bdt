import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { Program } from './schemas/program.schema';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  create(doc: AnyKeys<Program>) {
    return this.programModel.insertOne(doc);
  }

  countDocuments(filter: RootFilterQuery<Program>) {
    return this.programModel.countDocuments(filter);
  }

  findAll(filter: RootFilterQuery<Program>) {
    return this.programModel.find(filter);
  }

  findOne(filter: RootFilterQuery<Program>) {
    return this.programModel.findOne(filter);
  }

  updateOne(filter: RootFilterQuery<Program>, update: UpdateQuery<Program>) {
    return this.programModel.updateOne(filter, update);
  }

  deleteOne(filter: RootFilterQuery<Program>) {
    return this.programModel.deleteOne(filter);
  }
}
