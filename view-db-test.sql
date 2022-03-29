\c nc_news_test
\d

SELECT * FROM topics;

SELECT * FROM users;

SELECT * FROM articles;

SELECT * FROM comments;

SELECT name AS author, COUNT(comments.body) AS comment_count ,title, articles.article_id, articles.body, topic, articles.created_at, articles.votes
  FROM articles 
  JOIN users ON articles.author = users.username
  JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.article_id = 1
  GROUP BY articles.article_id, name, title, articles.article_id, articles.body, topic, articles.created_at, articles.votes;