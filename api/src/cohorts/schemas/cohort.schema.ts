import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cohort extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const CohortSchema = SchemaFactory.createForClass(Cohort);
