import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'User', timestamps: true })
export class User {
  @ApiProperty({
    description: 'The company the user belongs to.',
    type: () => Company,
  })
  @Prop({
    required: true,
    ref: Company.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  company: Company;

  @ApiProperty({ example: 'johndoe@email.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @Prop()
  name: string;

  @ApiProperty({ example: '1234567890' })
  @Prop()
  phone: string;

  @ApiProperty({ example: 'New York' })
  @Prop()
  location: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  @Prop()
  avatar: string;

  @ApiProperty({ example: 'Tech enthusiast and frontend developer.' })
  @Prop()
  bio: string;

  @ApiProperty({ example: 'READ', enum: ['READ', 'WRITE'] })
  @Prop({ required: true, enum: ['READ', 'WRITE'] })
  access: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
