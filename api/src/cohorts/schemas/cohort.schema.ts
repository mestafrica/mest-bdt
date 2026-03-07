import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Program } from '../../programs/schemas/program.schema';

export type CohortDocument = HydratedDocument<Cohort>;

@Schema({ collection: 'Cohort', timestamps: true })
export class Cohort {
  @ApiProperty({
    description: 'The program the cohort belongs to.',
    type: () => Program,
  })
  @Prop({
    required: true,
    ref: Program.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  program: Program;

  @ApiProperty({ example: 'Cohort 1' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'The first cohort of the program.' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @Prop({ required: true })
  image: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({ example: '2021-12-31T23:59:59.999Z' })
  @Prop({ required: true })
  endDate: Date;
}

export const CohortSchema = SchemaFactory.createForClass(Cohort);
