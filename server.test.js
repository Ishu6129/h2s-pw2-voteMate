const request = require('supertest');
const app = require('./server');

describe('VoteMate API & Security Endpoints', () => {
  
  test('GET /health should return 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('POST /api/chat should return 400 if message is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ lang: 'en' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Message is required');
  });

  test('POST /api/chat should return 400 if message is not a string', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 123 });
    expect(res.statusCode).toEqual(400);
  });

  test('Security Headers should be present (Helmet)', async () => {
    const res = await request(app).get('/');
    expect(res.headers).toHaveProperty('x-content-type-options');
    expect(res.headers).toHaveProperty('x-frame-options');
    expect(res.headers).toHaveProperty('content-security-policy');
  });

  test('Rate Limiting should return headers', async () => {
    const res = await request(app).get('/api/chat'); // Note: GET not allowed but middleware should still set headers or 404
    // Rate limit is on /api/
    const res2 = await request(app).post('/api/chat').send({ message: 'test' });
    expect(res2.headers).toHaveProperty('x-ratelimit-limit');
  });

  test('GET / should return index.html', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('VoteMate');
    expect(res.text).toContain('application/ld+json');
  });

});
