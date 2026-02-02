import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  @ApiProperty({
    description: 'The company the user belongs to.',
    example: '60f1b9b3b3b3b3b3b3b3b3b3',
  })
  company: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The phone of the user.',
    example: '1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'The location of the user.',
    example: 'New York',
  })
  location: string;

  @ApiProperty({
    description: 'The avatar of the user.',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string;

  @ApiProperty({
    description: 'The bio of the user.',
    example: 'Tech enthusiast and frontend developer.',
  })
  bio: string;

  @IsEnum(['READ', 'WRITE'])
  @ApiProperty({
    description: 'The access level of the user.',
    example: 'READ',
  })
  access: string;
}
