import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from './schemas/program.schema';
import { Cohort, CohortSchema } from '../cohorts/schemas/cohort.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Program.name, schema: ProgramSchema },
      { name: Cohort.name, schema: CohortSchema },
    ]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
