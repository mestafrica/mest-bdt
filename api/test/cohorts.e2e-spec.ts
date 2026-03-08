import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('CohortsController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let programId: string;

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

  it('crud operations on cohorts', async () => {
    // 1. Create a program first to satisfy cohort program ref
    const programRes = await request(server)
      .post('/programs')
      .send({
        name: 'Cohort Program',
        description: 'Test description',
        image: 'https://image.com/p.png',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:59.999Z',
      })
      .expect(201);

    programId = programRes.body._id;

    // 2. Array is initially empty
    let response = await request(server).get('/cohorts').expect(200);
    expect(response.body).toEqual([]);

    // 3. Create a cohort
    const createDto = {
      program: programId,
      name: 'Test Cohort',
      description: 'Test description',
      image: 'https://image.com/c.png',
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    };
    response = await request(server)
      .post('/cohorts')
      .send(createDto)
      .expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const cohortId = response.body._id;

    // 4. Count documents
    response = await request(server).get('/cohorts/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 5. Get one cohort by ID
    response = await request(server).get(`/cohorts/${cohortId}`).expect(200);
    expect(response.body).toMatchObject(createDto);

    // 6. Update the cohort
    const updateDto = { name: 'Updated Test Cohort' };
    response = await request(server)
      .patch(`/cohorts/${cohortId}`)
      .send(updateDto)
      .expect(200);

    // 7. Verify it was updated
    response = await request(server).get(`/cohorts/${cohortId}`).expect(200);
    expect(response.body.name).toBe('Updated Test Cohort');

    // 8. Delete the cohort
    await request(server).delete(`/cohorts/${cohortId}`).expect(200);

    // 9. Array is empty again
    response = await request(server).get('/cohorts').expect(200);
    expect(response.body).toEqual([]);
  });
});
