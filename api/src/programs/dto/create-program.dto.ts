import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({
    description: 'The name of the program.',
    example: 'Business Development Program',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the program.',
    example: 'A program to help businesses grow.',
  })
  description: string;
}
