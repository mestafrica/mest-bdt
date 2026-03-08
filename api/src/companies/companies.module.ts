import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { Response, ResponseSchema } from '../responses/schemas/response.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Response.name, schema: ResponseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
