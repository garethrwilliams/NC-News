# NC News API

## https://gareths-nc-news.herokuapp.com/api/

<hr>

## Background

This API for the purpose of accessing application data programmatically. The API creates a real world backend service which has the functionality to pass information to frontend architecture

- The API is build using the `node.js` backend runtime environment with `JavaScript` used to implement functionality
- The database is `PQSL` and interaction takes place using `node-postgres`
- The server application is built using `Express`
- The API conforms to the constraints of `REST` architecture style and implements the `MVC` pattern

---

## Install repo

```
git clone https://github.com/garethrwilliams/NC-News
```

---

## Install dependencies

```
npm i
```

---

## Seed the database

The `package.json` file contains the script

```
"seed": "node ./db/seeds/run-seed.js"
```

Run the script with CLI command

```
npm run seed
```

---

## Testing responses and errors

The package comes complete with a suite of comprehensive tests build upon the `Jest` package.
Documentation can be found [here](https://jestjs.io/docs/getting-started)

```
npm test
```

Runs the tests

---

## .ENV

Please create **.env** files locally in order to access the database

- .env.development should contain

```
PGDATABASE=nc_news
```

- .env.test should contain:

```
PGDATABASE=nc_news_test
```

Please ensure that the `.env` files are added to .gitignore

```
>>> .gitignore

.env.*
```

---

#### Recommended Version Requirements For Node & Postgres

This app was made on Node Version:

```
node -v | v17.7.1
```

Postgres Version:

```
psql -V | 12.9
```

To find out what version you're running you can use `node -v` and `psql -V`

---

...and relax
![pier](https://cdn.pixabay.com/photo/2014/09/09/19/10/pier-440339_1280.jpg)
