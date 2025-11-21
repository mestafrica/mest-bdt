import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mainPointOfContact: string;

  @ApiProperty()
  altPointOfContact: string;

  @ApiProperty()
  projectManager: string;

  @ApiProperty()
  keyOrgUnits: number;

  @ApiProperty()
  mission: string;

  @ApiProperty()
  sector: string;

  @ApiProperty()
  productOrService: string;

  @ApiProperty()
  annualRevenue: number;

  @ApiProperty()
  operationalYears: number;

  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  totalEmployees: number;

  @ApiProperty()
  expectation: string;
}
