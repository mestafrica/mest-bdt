import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ collection: 'Company', timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  mainPointOfContact: string;

  @Prop()
  altPointOfContact: string;

  @Prop()
  projectManager: string;

  @Prop()
  keyOrgUnits: number;

  @Prop()
  mission: string;

  @Prop()
  sector: string;

  @Prop()
  productOrService: string;

  @Prop()
  annualRevenue: number;

  @Prop()
  operationalYears: number;

  @Prop()
  totalUsers: number;

  @Prop()
  totalEmployees: number;

  @Prop()
  expectation: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
