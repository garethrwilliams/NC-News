\c nc_news_test
\d

SELECT * FROM topics;

SELECT * FROM users;

SELECT * FROM articles;

SELECT * FROM comments;

SELECT comment_id, comments.votes, comments.created_at, users.username, comments.body
  FROM comments
  LEFT JOIN articles ON comments.article_id = articles.article_id
  LEFT JOIN users ON articles.author = users.username
  WHERE articles.article_id = 1;