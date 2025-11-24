import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId } from 'class-validator';

export class CreateCohortDto {
  @IsMongoId()
  @ApiProperty({
    description: 'The program the cohort belongs to.',
    example: '60f1b9b3b3b3b3b3b3b3b3b3',
  })
  program: string;

  @ApiProperty({
    description: 'The name of the cohort.',
    example: 'Cohort 1',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the cohort.',
    example: 'The first cohort of the program.',
  })
  description: string;

  @ApiProperty({
    description: 'The image of the cohort.',
    example: 'https://example.com/image.png',
  })
  image: string;

  @IsDateString()
  @ApiProperty({
    description: 'The start date of the cohort.',
    example: '2021-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @IsDateString()
  @ApiProperty({
    description: 'The end date of the cohort.',
    example: '2021-12-31T23:59:59.999Z',
  })
  endDate: Date;
}
