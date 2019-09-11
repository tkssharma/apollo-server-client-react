global.env = 'dev';
global.configuration = require(`../config/environments/${global.env}`);

const express = require('express');
const { ApolloError } = require('apollo-server');

const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
global.connection = require('./lib/mysql');
const jwt = require('jsonwebtoken');
const eventEmitter = require('./events/processEvent');
const ErrorHandler = require('./shutdown');
const Database = require('./dao/MysqlDao');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

app.use(cors());

const getLoggedInUser = req => {
  const token = req.headers['x-auth-token'];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return payload.data;
    } catch (error) {
      throw new ApolloError('unauthorised session error, login again');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    dbContext: new Database(global.connection),
    me: getLoggedInUser(req),
  }),
});
server.applyMiddleware({ app });

if (!module.parent) {
  eventEmitter.on('dbReady', connection => {
    // global.connection = connection;
    app.listen({ port: process.env.PORT || 3000 }, () =>
      // eslint-disable-next-line no-console
      console.log(`🚀 🚀 🚀 🚀  Server ready at http://localhost:3000${server.graphqlPath} 🚀 🚀 🚀 `),
    );
  });
}
// Do graceful shutdown on Ctrl + C or PM2 Restart
process.on('SIGINT', ErrorHandler.shutdown);
// Recover server from Any other errors
process.on('unhandledRejection', ErrorHandler.unhandledRejection);
process.on('uncaughtException', ErrorHandler.onError);
