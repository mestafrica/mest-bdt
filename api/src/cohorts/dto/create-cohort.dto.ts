import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCohortDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
