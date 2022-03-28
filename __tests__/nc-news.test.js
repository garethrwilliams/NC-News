const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('testing server works', () => {
  test('it works', () => {});
});

describe('GET /api/topics', () => {
  it('200: return contents of topics table', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body}) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe('ERROR testing', () => {
  it('test for path not found', () => {
    return request(app)
      .get('/api/not_a_path')
      .expect(404)
      .then(({body}) => {
        expect(body.error).toBe('Path not found');
      });
  });
});
