import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: 'The MongoDB ObjectId of the form being responded to',
    example: '507f1f77bcf86cd799439011',
  })
  form: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: 'The MongoDB ObjectId of the company submitting the response',
    example: '507f191e810c19729de860ea',
  })
  company: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A label or title for the response',
    example: 'Scale Readiness Assessment Q1 2024',
  })
  response: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'JSON string containing the form submission data',
    example:
      '{"enduringPurpose":{"compellingProblem":{"score":5,"notes":"..."}}}',
  })
  data: string;
}
