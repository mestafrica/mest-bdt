import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema({ collection: 'Form', timestamps: true })
export class Form {
  @ApiProperty({ example: 'Business Diagnostic Form' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ example: 'A form used to assess business performance.' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: '{"sections":[{"title":"Finance","fields":[]}]}',
    description: 'JSON string defining form structure',
  })
  @Prop({ required: true })
  schema: string;

  @ApiProperty({
    example: '{"sections":[{"title":"Finance","fields":[]}]}',
    description: 'JSON string defining form UI structure',
  })
  @Prop({ required: true })
  uiSchema: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
