import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Program } from './schemas/program.schema';
import { Cohort } from '../cohorts/schemas/cohort.schema';
import { Company } from '../companies/schemas/company.schema';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
    @InjectModel(Cohort.name) private cohortModel: Model<Cohort>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
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

  /**
   * Fetch a single program by id, enriched with:
   *  - `activeCohortsCount`: cohorts in the program currently active by date
   *    (`startDate <= now <= endDate`).
   *  - `participantsCount`: total companies across all of the program's
   *    cohorts (participants == companies).
   *
   * Returns `null` when not found so the controller mirrors the existing
   * not-found behaviour. Used by `GET /programs/:id`; list endpoints unchanged.
   */
  async findOneWithStats(id: string) {
    const program = await this.programModel.findOne({ _id: id });
    if (!program) {
      return null;
    }

    const now = new Date();
    const activeCohortsCount = await this.cohortModel.countDocuments({
      program: id as any,
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    const cohorts = await this.cohortModel.find({ program: id as any }, '_id');
    const cohortIds = cohorts.map((cohort) => cohort._id);
    const participantsCount =
      cohortIds.length === 0
        ? 0
        : await this.companyModel.countDocuments({
            cohort: { $in: cohortIds } as any,
          });

    const base =
      typeof (program as { toJSON?: () => unknown }).toJSON === 'function'
        ? (program as { toJSON: () => Record<string, unknown> }).toJSON()
        : (program as unknown as Record<string, unknown>);

    return { ...base, activeCohortsCount, participantsCount };
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
