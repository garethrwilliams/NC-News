const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

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

describe('GET /api/articles/:article_id', () => {
  it('200: return article by given Id', async () => {
    const {body} = await request(app).get('/api/articles/1').expect(200);

    expect(body.article).toBeInstanceOf(Object);
    expect(body.article).toMatchObject({
      author: 'jonny',
      title: 'Living in the shadow of a great man',
      article_id: 1,
      body: 'I find this existence challenging',
      topic: 'mitch',
      created_at: '2020-07-09T20:11:00.000Z',
      votes: 100,
    });

    expect(body.article.author).toBe('jonny');
  });

  it('404: return error if article does not exist on db', async () => {
    const {body} = await request(app).get('/api/articles/20000').expect(404);

    expect(body.error).toBe('Article not found');
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
