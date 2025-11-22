import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCohortDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the cohort.',
    example: 'Cohort 1',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the cohort.',
    example: 'The first cohort of the program.',
  })
  description?: string;
}
