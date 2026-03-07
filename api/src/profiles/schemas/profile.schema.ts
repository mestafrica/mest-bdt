import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ collection: 'Profile', timestamps: true })
export class Profile {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@email.com',
  })
  @Prop({ required: true, unique: true })
  email: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
