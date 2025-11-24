import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the program.',
    example: 'Business Development Program',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the program.',
    example: 'A program to help businesses grow.',
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The image of the program.',
    example: 'https://example.com/image.png',
  })
  image: string;

  @IsDateString()
  @ApiProperty({
    description: 'The start date of the program.',
    example: '2021-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @IsDateString()
  @ApiProperty({
    description: 'The end date of the program.',
    example: '2021-12-31T23:59:59.999Z',
  })
  endDate: Date;
}
