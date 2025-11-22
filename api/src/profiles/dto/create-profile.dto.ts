import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@email.com',
  })
  email: string;
}
