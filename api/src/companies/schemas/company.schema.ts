import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cohort } from '../../cohorts/schemas/cohort.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ collection: 'Company', timestamps: true })
export class Company {
  @ApiProperty({
    description: 'The cohort the company belongs to.',
    type: () => Cohort,
  })
  @Prop({
    required: true,
    ref: Cohort.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  cohort: Cohort;

  @ApiProperty({ example: 'Acme Corporation' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'John Doe' })
  @Prop()
  mainPointOfContact: string;

  @ApiProperty({ example: 'Jane Doe' })
  @Prop()
  altPointOfContact: string;

  @ApiProperty({ example: 'Peter Pan' })
  @Prop()
  projectManager: string;

  @ApiProperty({ example: 3 })
  @Prop()
  keyOrgUnits: number;

  @ApiProperty({
    example: 'To provide high-quality products and services to our customers.',
  })
  @Prop()
  mission: string;

  @ApiProperty({ example: 'Technology' })
  @Prop()
  sector: string;

  @ApiProperty({ example: 'Software development' })
  @Prop()
  productOrService: string;

  @ApiProperty({ example: 1000000 })
  @Prop()
  annualRevenue: number;

  @ApiProperty({ example: 5 })
  @Prop()
  operationalYears: number;

  @ApiProperty({ example: 1000 })
  @Prop()
  totalUsers: number;

  @ApiProperty({ example: 50 })
  @Prop()
  totalEmployees: number;

  @ApiProperty({ example: 'To grow and expand our business.' })
  @Prop()
  expectation: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
