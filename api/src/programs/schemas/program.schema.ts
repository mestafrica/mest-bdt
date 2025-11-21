import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProgramDocument = HydratedDocument<Program>;

@Schema({ collection: 'Program', timestamps: true })
export class Program {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
