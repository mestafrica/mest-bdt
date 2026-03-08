import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('ProgramsController (e2e)', () => {
  let app: INestApplication;
  let server: any;

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

  it('crud operations on programs', async () => {
    // 1. Array is initially empty
    let response = await request(server).get('/programs').expect(200);
    expect(response.body).toEqual([]);

    // 2. Create a program
    const createDto = {
      name: 'Test Program',
      description: 'Test description',
      image: 'https://image.com/p.png',
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    };

    response = await request(server)
      .post('/programs')
      .send(createDto)
      .expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const programId = response.body._id;

    // 3. Count documents
    response = await request(server).get('/programs/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 4. Get one program by ID
    response = await request(server).get(`/programs/${programId}`).expect(200);
    expect(response.body).toMatchObject(createDto);

    // 5. Update the program
    const updateDto = { name: 'Updated Test Program' };
    response = await request(server)
      .patch(`/programs/${programId}`)
      .send(updateDto)
      .expect(200);

    // 6. Verify it was updated
    response = await request(server).get(`/programs/${programId}`).expect(200);
    expect(response.body.name).toBe('Updated Test Program');

    // 7. Delete the program
    await request(server).delete(`/programs/${programId}`).expect(200);

    // 8. Array is empty again
    response = await request(server).get('/programs').expect(200);
    expect(response.body).toEqual([]);
  });
});
