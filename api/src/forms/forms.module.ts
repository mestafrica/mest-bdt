import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { Form, FormSchema } from './schemas/form.schema';
import { Response, ResponseSchema } from '../responses/schemas/response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Form.name, schema: FormSchema },
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
