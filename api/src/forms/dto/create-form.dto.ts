import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty({ example: 'Business Diagnostic Form' })
  name: string;

  @ApiProperty({ example: 'A form used to assess business performance.' })
  description: string;

  @ApiProperty({
    example: '{"sections":[{"title":"Finance","fields":[]}]}',
    description: 'JSON string defining form structure',
  })
  schema: string;

  @ApiProperty({
    example: '{"sections":[{"title":"Finance","fields":[]}]}',
    description: 'JSON string defining form UI structure',
  })
  uiSchema: string;
}
