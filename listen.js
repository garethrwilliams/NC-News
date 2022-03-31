const app = require('./app');

const PORT = process.env.PORT || 8000;
//  const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
