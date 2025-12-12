import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ApiProperty()
  form: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ApiProperty()
  company: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  response: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  data: string;
}
