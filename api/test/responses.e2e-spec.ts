import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('ResponsesController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let companyId: string;
  let formId: string;

  beforeAll(async () => {
    await connectMongoMemoryDB();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await clearMongoMemoryDB();
  });

  afterAll(async () => {
    await app.close();
    await closeMongoMemoryDB();
  });

  it('crud operations on responses', async () => {
    // 0. Create program and cohort required for company
    const programRes = await request(server)
      .post('/programs')
      .send({
        name: 'Response Program',
        description: 'Test description',
        image: 'https://image.com/p.png',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:59.999Z',
      })
      .expect(201);

    const cohortRes = await request(server)
      .post('/cohorts')
      .send({
        program: programRes.body._id,
        name: 'Response Cohort',
        description: 'Test description',
        image: 'https://image.com/c.png',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:59.999Z',
      })
      .expect(201);

    // 1. Create a company
    const companyRes = await request(server)
      .post('/companies')
      .send({
        cohort: cohortRes.body._id,
        name: 'Response Company',
        mainPointOfContact: 'John',
        keyOrgUnits: 3,
        mission: 'Mission setup',
      })
      .expect(201);

    companyId = companyRes.body._id;

    // 2. Create a form
    const formRes = await request(server)
      .post('/forms')
      .send({
        name: 'Response Form',
        description: 'Test description',
        schema: '{"sections":[]}',
        uiSchema: '{"sections":[]}',
      })
      .expect(201);

    formId = formRes.body._id;

    // 3. Array is initially empty
    let response = await request(server).get('/responses').expect(200);
    expect(response.body).toEqual([]);

    // 4. Create a response
    const createDto = {
      form: formId,
      company: companyId,
      data: '{"field1": "value1"}',
    };
    response = await request(server)
      .post('/responses')
      .send(createDto)
      .expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const responseId = response.body._id;

    // 5. Count documents
    response = await request(server).get('/responses/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 6. Get one response by ID
    response = await request(server)
      .get(`/responses/${responseId}`)
      .expect(200);
    expect(response.body).toMatchObject(createDto);

    // 7. Update the response
    const updateDto = { data: '{"field1": "updated_value"}' };
    response = await request(server)
      .patch(`/responses/${responseId}`)
      .send(updateDto)
      .expect(200);

    // 8. Verify it was updated
    response = await request(server)
      .get(`/responses/${responseId}`)
      .expect(200);
    expect(response.body.data).toBe('{"field1": "updated_value"}');

    // 9. Delete the response
    await request(server).delete(`/responses/${responseId}`).expect(200);

    // 10. Array is empty again
    response = await request(server).get('/responses').expect(200);
    expect(response.body).toEqual([]);
  });
});
