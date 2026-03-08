import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let companyId: string;

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

  it('crud operations on users', async () => {
    // 0. Create program and cohort required for company
    const programRes = await request(server)
      .post('/programs')
      .send({
        name: 'User Program',
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
        name: 'User Cohort',
        description: 'Test description',
        image: 'https://image.com/c.png',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:59.999Z',
      })
      .expect(201);

    // 1. Create a company first to satisfy user company ref
    const companyRes = await request(server)
      .post('/companies')
      .send({
        cohort: cohortRes.body._id,
        name: 'User Company',
        mainPointOfContact: 'John',
        keyOrgUnits: 3,
        mission: 'Mission setup',
      })
      .expect(201);

    companyId = companyRes.body._id;

    // 2. Array is initially empty
    let response = await request(server).get('/users').expect(200);
    expect(response.body).toEqual([]);

    // 3. Create a user
    const createDto = {
      name: 'Test User',
      email: 'user@test.com',
      company: companyId,
      phone: '1234567890',
      location: 'Accra',
      avatar: 'https://avatar.com/u.png',
      bio: 'A test user',
      access: 'READ',
    };
    response = await request(server).post('/users').send(createDto).expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const userId = response.body._id;

    // 4. Count documents
    response = await request(server).get('/users/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 5. Get one user by ID
    response = await request(server).get(`/users/${userId}`).expect(200);
    expect(response.body).toMatchObject(createDto);

    // 6. Update the user
    const updateDto = { name: 'Updated Test User', access: 'WRITE' };
    response = await request(server)
      .patch(`/users/${userId}`)
      .send(updateDto)
      .expect(200);

    // 7. Verify it was updated
    response = await request(server).get(`/users/${userId}`).expect(200);
    expect(response.body.name).toBe('Updated Test User');
    expect(response.body.access).toBe('WRITE');

    // 8. Delete the user
    await request(server).delete(`/users/${userId}`).expect(200);

    // 9. Array is empty again
    response = await request(server).get('/users').expect(200);
    expect(response.body).toEqual([]);
  });
});
