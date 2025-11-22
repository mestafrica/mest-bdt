import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { Cohort } from './schemas/cohort.schema';

@Injectable()
export class CohortsService {
  constructor(@InjectModel(Cohort.name) private cohortModel: Model<Cohort>) {}

  create(doc: AnyKeys<Cohort>) {
    return this.cohortModel.insertOne(doc);
  }

  countDocuments(filter: RootFilterQuery<Cohort>) {
    return this.cohortModel.countDocuments(filter);
  }

  findAll(filter: RootFilterQuery<Cohort>) {
    return this.cohortModel.find(filter);
  }

  findOne(filter: RootFilterQuery<Cohort>) {
    return this.cohortModel.findOne(filter);
  }

  updateOne(filter: RootFilterQuery<Cohort>, update: UpdateQuery<Cohort>) {
    return this.cohortModel.updateOne(filter, update);
  }

  deleteOne(filter: RootFilterQuery<Cohort>) {
    return this.cohortModel.deleteOne(filter);
  }
}
