import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProgramDocument = HydratedDocument<Program>;

@Schema({ collection: 'Program', timestamps: true })
export class Program {
  @ApiProperty({ example: 'Business Development Program' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'A program to help businesses grow.' })
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

export const ProgramSchema = SchemaFactory.createForClass(Program);
