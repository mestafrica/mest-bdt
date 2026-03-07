import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CohortsController } from './cohorts.controller';
import { CohortsService } from './cohorts.service';
import { Cohort, CohortSchema } from './schemas/cohort.schema';
import { Company, CompanySchema } from '../companies/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cohort.name, schema: CohortSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CohortsController],
  providers: [CohortsService],
})
export class CohortsModule {}
