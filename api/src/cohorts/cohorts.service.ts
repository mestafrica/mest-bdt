import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Cohort } from './schemas/cohort.schema';
import { Company } from '../companies/schemas/company.schema';

@Injectable()
export class CohortsService {
  constructor(
    @InjectModel(Cohort.name) private cohortModel: Model<Cohort>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  create(doc: AnyKeys<Cohort>) {
    return this.cohortModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Cohort>) {
    return this.cohortModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Cohort>) {
    return this.cohortModel.find(filter);
  }

  findOne(filter: QueryFilter<Cohort>) {
    return this.cohortModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Cohort>, update: UpdateQuery<Cohort>) {
    return this.cohortModel.updateOne(filter, update);
  }

  async deleteOne(filter: QueryFilter<Cohort>) {
    const cohort = await this.cohortModel.findOne(filter);
    if (cohort) {
      const companyCount = await this.companyModel.countDocuments({
        cohort: cohort._id as any,
      });
      if (companyCount > 0) {
        throw new ConflictException(
          'Cannot delete cohort with existing companies. Remove all companies first.',
        );
      }
    }
    return this.cohortModel.deleteOne(filter);
  }
}
