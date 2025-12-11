import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, AnyKeys, QueryFilter, UpdateQuery } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(doc: AnyKeys<User>) {
    return this.userModel.insertOne(doc);
  }

  countDocuments(filter: QueryFilter<User>) {
    return this.userModel.countDocuments(filter);
  }

  findAll(filter: QueryFilter<User>) {
    return this.userModel.find(filter);
  }

  findOne(filter: QueryFilter<User>) {
    return this.userModel.findOne(filter);
  }

  updateOne(filter: QueryFilter<User>, update: UpdateQuery<User>) {
    return this.userModel.updateOne(filter, update);
  }

  deleteOne(filter: QueryFilter<User>) {
    return this.userModel.deleteOne(filter);
  }
}
