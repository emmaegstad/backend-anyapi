const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Neopet = require('../lib/models/Neopet');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a neopet', async () => {
    const expected = {
      name: 'Levi',
      type: 'Gelert',
      age: 8,
      color: 'Black and White',
    };
    const res = await request(app).post('/api/v1/neopets').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of neopets', async () => {
    const expected = await Neopet.findAll();
    const res = await request(app).get('/api/v1/neopets');

    expect(res.body).toEqual(expected);
  });

  it('gets a neopet by id', async () => {
    const expected = await Neopet.findById(1);
    const res = await request(app).get(`/api/v1/neopets/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a neopet by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Michelle',
      type: 'Jubjub',
      age: 5,
      color: 'White',
    };
    const res = await request(app)
      .patch('/api/v1/neopets/1')
      .send({ color: 'White' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a dog by id', async () => {
    const expected = await Neopet.findById(1);
    const res = await request(app).delete(`/api/v1/neopets/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
