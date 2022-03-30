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

describe('GET /api/users', () => {
  it('200: returns contents of users table', async () => {
    const {body} = await request(app).get('/api/users').expect(200);

    expect(body.users).toBeInstanceOf(Array);
    expect(body.users.length).toBe(4);
    body.users.forEach((user) => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    });
  });
});

describe('GET /api/articles', () => {
  it('200: returns an array of articles', async () => {
    const {body} = await request(app).get('/api/articles').expect(200);

    expect(body.articles).toBeInstanceOf(Array);
    expect(body.articles.length).toBe(12);
    body.articles.forEach((article) => {
      expect(article).toMatchObject({
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(String),
      });
    });
  });

  it('200: returns an array of articles sorted by created_by DESC by default', async () => {
    const {body} = await request(app).get('/api/articles').expect(200);

    expect(body.articles).toBeSortedBy('created_at', {descending: true});
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

  it('400: bad request when id is not a integer', async () => {
    const {body} = await request(app).get('/api/articles/badId').expect(400);

    expect(body.error).toBe('Bad request');
  });

  it('200: returns the comment count in relation to the requested article ', async () => {
    const {body} = await request(app).get('/api/articles/1').expect(200);

    expect(body.article.comment_count).toBe('11');
  });

  it('200: returns the comment count in relation to the requested article when the count is 0', async () => {
    const {body} = await request(app).get('/api/articles/4').expect(200);

    expect(body.article.comment_count).toBe('0');
  });
});

describe('POST /api/articles/:article_id/comment', () => {
  it('201: posts a comment and returns the newly added comment', async () => {
    const newComment = {
      username: 'butter_bridge',
      body: 'I have strong opinions for money',
    };

    const {body} = await request(app)
      .post('/api/articles/2/comment')
      .send(newComment)
      .expect(201);

    expect(body.comment.body).toBe(newComment.body);
  });

  it('400: responds with an error if the sent object does not contain a comment', async () => {
    const newComment = {
      username: 'butter_bridge',
    };

    const {body} = await request(app)
      .post('/api/articles/2/comment')
      .send(newComment)
      .expect(400);

    expect(body.error).toBe('Please provide a comment');
  });
  it('400: responds with an error if the sent object does not contain a valid username', async () => {
    const newComment = {
      username: 'some_clown',
      body: 'A worthless opinion',
    };

    const {body} = await request(app)
      .post('/api/articles/2/comment')
      .send(newComment)
      .expect(400);

    expect(body.error).toBe('Please provide a valid username');
  });

  it('404: responds with an error if the article id is not present', async () => {
    const newComment = {
      username: 'butter_bridge',
      body: 'I have strong opinions for money',
    };

    const {body} = await request(app)
      .post('/api/articles/99/comment')
      .send(newComment)
      .expect(404);

    expect(body.error).toBe('Article not found');
  });

  it('400: responds with an error if the article id is not valid', async () => {
    const newComment = {
      username: 'butter_bridge',
      body: 'I have strong opinions for money',
    };

    const {body} = await request(app)
      .post('/api/articles/badId/comment')
      .send(newComment)
      .expect(400);

    expect(body.error).toBe('Bad request');
  });
});

describe('PATCH /api/articles/:article_id', () => {
  it('200: patches the article and returns the article with updated votes', async () => {
    const vote = {inc_vote: 1};

    const {body} = await request(app)
      .patch('/api/articles/1')
      .send(vote)
      .expect(200);

    expect(body.article.votes).toBe(101);
  });

  it('200: patches the article and returns the article with updated votes when vote is a negative number', async () => {
    const vote = {inc_vote: -100};

    const {body} = await request(app)
      .patch('/api/articles/1')
      .send(vote)
      .expect(200);

    expect(body.article.votes).toBe(0);
  });

  it('404: return error if article does not exist on db', async () => {
    const vote = {inc_vote: 1};
    const {body} = await request(app)
      .patch('/api/articles/20000')
      .send(vote)
      .expect(404);

    expect(body.error).toBe('Article not found');
  });

  it('400: return error if req.body is empty', async () => {
    const vote = {};
    const {body} = await request(app)
      .patch('/api/articles/1')
      .send(vote)
      .expect(400);

    expect(body.error).toBe('Please provide vote information');
  });

  it('400: return error if req.body does not contain vote', async () => {
    const vote = {author: 'jonny'};
    const {body} = await request(app)
      .patch('/api/articles/1')
      .send(vote)
      .expect(400);

    expect(body.error).toBe('Please provide vote information');
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  it('204: responds with an empty response body', async () => {
    const {body} = await request(app).delete('/api/comment/1').expect(204);

    expect(body).toEqual({});

    const comments = await db.query('SELECT * FROM comments');
    expect(comments.rows.length).toBe(17);
  });

  it('404: should return an error if the comment is not found', async () => {
    const {body} = await request(app).delete('/api/comments/99').expect(404);

    expect(body.error).toBe('Comment not found');
  });
});

describe('General ERROR testing', () => {
  it('test for path not found', () => {
    return request(app)
      .get('/api/not_a_path')
      .expect(404)
      .then(({body}) => {
        expect(body.error).toBe('Path not found');
      });
  });
});
