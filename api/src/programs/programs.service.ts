import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Program } from './schemas/program.schema';
import { Cohort } from '../cohorts/schemas/cohort.schema';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
    @InjectModel(Cohort.name) private cohortModel: Model<Cohort>,
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

  async deleteOne(filter: QueryFilter<Program>) {
    const program = await this.programModel.findOne(filter);
    if (program) {
      const cohortCount = await this.cohortModel.countDocuments({
        program: program._id as any,
      });
      if (cohortCount > 0) {
        throw new ConflictException(
          'Cannot delete program with existing cohorts. Remove all cohorts first.',
        );
      }
    }
    return this.programModel.deleteOne(filter);
  }
}
