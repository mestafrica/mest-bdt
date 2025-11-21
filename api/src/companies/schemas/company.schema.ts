import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ collection: 'Company', timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  email: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
