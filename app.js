const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');

const app = express();

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: true,
  }),
);
module.exports = app;
