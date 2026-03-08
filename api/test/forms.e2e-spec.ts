import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  closeMongoMemoryDB,
  connectMongoMemoryDB,
  clearMongoMemoryDB,
} from './mongo-memory.setup';

describe('FormsController (e2e)', () => {
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

  it('crud operations on forms', async () => {
    // 1. Array is initially empty
    let response = await request(server).get('/forms').expect(200);
    expect(response.body).toEqual([]);

    // 2. Create a form
    const createDto = {
      name: 'Test Form',
      description: 'Test description',
      schema: '{"sections":[{"title":"Finance","fields":[]}]}',
      uiSchema: '{"sections":[{"title":"Finance","fields":[]}]}',
    };

    response = await request(server).post('/forms').send(createDto).expect(201);

    expect(response.body).toMatchObject(createDto);
    expect(response.body).toHaveProperty('_id');
    const formId = response.body._id;

    // 3. Count documents
    response = await request(server).get('/forms/count').expect(200);
    expect(parseInt(response.text)).toBe(1);

    // 4. Get one form by ID
    response = await request(server).get(`/forms/${formId}`).expect(200);
    expect(response.body).toMatchObject(createDto);

    // 5. Update the form
    const updateDto = { name: 'Updated Test Form' };
    response = await request(server)
      .patch(`/forms/${formId}`)
      .send(updateDto)
      .expect(200);

    // 6. Verify it was updated
    response = await request(server).get(`/forms/${formId}`).expect(200);
    expect(response.body.name).toBe('Updated Test Form');

    // 7. Delete the form
    await request(server).delete(`/forms/${formId}`).expect(200);

    // 8. Array is empty again
    response = await request(server).get('/forms').expect(200);
    expect(response.body).toEqual([]);
  });
});
