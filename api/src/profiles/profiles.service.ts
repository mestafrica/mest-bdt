import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  create(doc: AnyKeys<Profile>) {
    return this.profileModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<Profile>) {
    return this.profileModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<Profile>) {
    return this.profileModel.find(filter);
  }

  findOne(filter: QueryFilter<Profile>) {
    return this.profileModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<Profile>, update: UpdateQuery<Profile>) {
    return this.profileModel.updateOne(filter, update);
  }

  deleteOne(filter: QueryFilter<Profile>) {
    return this.profileModel.deleteOne(filter);
  }
}
