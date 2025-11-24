import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@email.com',
  })
  email: string;

  @IsMongoId()
  @ApiProperty({
    description: 'The company the user belongs to.',
    example: '60f1b9b3b3b3b3b3b3b3b3b3',
  })
  company: string;

  @IsEnum(['READ', 'WRITE'])
  @ApiProperty({
    description: 'The access level of the user.',
    example: 'READ',
  })
  access: string;
}
