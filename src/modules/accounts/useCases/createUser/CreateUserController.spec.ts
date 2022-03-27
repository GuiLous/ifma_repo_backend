/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create User Controller', () => {
  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'testIntegration@test.com.br',
      password: '123',
      fullName: 'test-integration',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create an existing user', async () => {
    await request(app).post('/users').send({
      email: 'testIntegrationExisting@test.com.br',
      password: '123',
      fullName: 'test-integration-exist',
    });

    const response = await request(app).post('/users').send({
      email: 'testIntegrationExisting@test.com.br',
      password: '123',
      fullName: 'test-integration-exist',
    });

    expect(response.status).toBe(400);
  });
});
