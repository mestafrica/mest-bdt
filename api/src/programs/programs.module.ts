import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from './schemas/program.schema';
import { Cohort, CohortSchema } from '../cohorts/schemas/cohort.schema';
import { Company, CompanySchema } from '../companies/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Program.name, schema: ProgramSchema },
      { name: Cohort.name, schema: CohortSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
