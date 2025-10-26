// tests/backend/userRoutes.test.js

const request = require('supertest');
const app = require('../backend/app');
const mongoose = require('mongoose');

describe('User Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /api/user/onboarding', async () => {
    const response = await request(app)
      .post('/api/user/onboarding')
      .set('Authorization', 'Bearer test_token')
      .send({ businessName: 'Test', goals: ['grow'], audience: ['youth'] });
    expect(response.status).toBe(401); // No valid token
  });
});