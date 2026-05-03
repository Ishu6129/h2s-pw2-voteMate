const request = require('supertest');
const app = require('./server');

describe('VoteMate API Endpoints', () => {
  
  test('GET /health should return 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  test('POST /api/chat should return 400 if message is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ lang: 'en' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Message is required');
  });

  test('GET / (Static files) should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

});
