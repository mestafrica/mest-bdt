import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let cohortId: string;

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
  }, 10000);

  it('crud operations on companies', async () => {
    // 0. Create program and cohort required for company
    const programRes = await request(server)
      .post('/programs')
      .send({
        name: 'Company Program',
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
        name: 'Company Cohort',
        description: 'Test description',
        image: 'https://image.com/c.png',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:59.999Z',
      })
      .expect(201);

    cohortId = cohortRes.body._id;

    // 1. Array is initially empty
    let response = await request(server).get('/companies').expect(200);
    expect(response.body).toEqual([]);

    // 2. Create a company
    const createDto = {
      cohort: cohortId,
      name: 'Test Company',
      mainPointOfContact: 'John',
      keyOrgUnits: 3,
      mission: 'Mission setup',
    };
    response = await request(server)
      .post('/companies')
      .send(createDto)
      .expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const companyId = response.body._id;

    // 3. Count documents
    response = await request(server).get('/companies/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 4. Get one company by ID
    response = await request(server).get(`/companies/${companyId}`).expect(200);
    expect(response.body).toMatchObject(createDto);

    // 5. Update the company
    const updateDto = { name: 'Updated Test Company' };
    response = await request(server)
      .patch(`/companies/${companyId}`)
      .send(updateDto)
      .expect(200);

    // 6. Verify it was updated
    response = await request(server).get(`/companies/${companyId}`).expect(200);
    expect(response.body.name).toBe('Updated Test Company');

    // 7. Delete the company
    await request(server).delete(`/companies/${companyId}`).expect(200);

    // 8. Array is empty again
    response = await request(server).get('/companies').expect(200);
    expect(response.body).toEqual([]);
  });
});
