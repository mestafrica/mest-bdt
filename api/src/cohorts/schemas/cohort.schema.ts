import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CohortDocument = HydratedDocument<Cohort>;

@Schema({ collection: 'Cohort', timestamps: true })
export class Cohort {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const CohortSchema = SchemaFactory.createForClass(Cohort);
