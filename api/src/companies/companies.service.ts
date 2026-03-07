import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Company } from './schemas/company.schema';
import { Response } from '../responses/schemas/response.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Response.name) private responseModel: Model<Response>,
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

  async deleteOne(filter: QueryFilter<Company>) {
    const company = await this.companyModel.findOne(filter);
    if (company) {
      const responseCount = await this.responseModel.countDocuments({
        company: company._id as any,
      });
      if (responseCount > 0) {
        throw new ConflictException(
          'Cannot delete company with existing responses. Remove all responses first.',
        );
      }
    }
    return this.companyModel.deleteOne(filter);
  }
}
