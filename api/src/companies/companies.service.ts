import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  create(doc: AnyKeys<Company>) {
    return this.companyModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Company>) {
    return this.companyModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Company>) {
    return this.companyModel.find(filter);
  }

  findOne(filter: QueryFilter<Company>) {
    return this.companyModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Company>, update: UpdateQuery<Company>) {
    return this.companyModel.updateOne(filter, update);
  }

  deleteOne(filter: QueryFilter<Company>) {
    return this.companyModel.deleteOne(filter);
  }
}
