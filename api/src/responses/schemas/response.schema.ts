import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Form } from '../../forms/schemas/form.schema';
import { Company } from '../../companies/schemas/company.schema';

export type ResponseDocument = HydratedDocument<Response>;

@Schema({ collection: 'Response', timestamps: true })
export class Response {
  @ApiProperty({
    description: 'The form the response belongs to.',
    type: () => Form,
  })
  @Prop({
    required: true,
    ref: Form.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  form: Form;

  @ApiProperty({
    description: 'The company that provided the response.',
    type: () => Company,
  })
  @Prop({
    required: true,
    ref: Company.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  company: Company;

  @ApiProperty({
    description: 'The data provided in the response.',
    example: '{"field1": "value1"}',
  })
  @Prop({ required: true })
  data: string;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
