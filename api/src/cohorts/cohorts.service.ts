import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cohort } from './schemas/cohort.schema';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@Injectable()
export class CohortsService {
  constructor(@InjectModel(Cohort.name) private cohortModel: Model<Cohort>) {}

  async findAll() {
    return this.cohortModel.find();
  }

  async findOne(id: string) {
    const cohort = await this.cohortModel.findById(id);
    if (!cohort) throw new NotFoundException('Cohort not found');
    return cohort;
  }

  async create(data: CreateCohortDto) {
    const newCohort = new this.cohortModel(data);
    return newCohort.save();
  }

  async update(id: string, data: UpdateCohortDto) {
    const updated = await this.cohortModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Cohort not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cohortModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Cohort not found');
    return { message: 'Cohort deleted successfully' };
  }
}
