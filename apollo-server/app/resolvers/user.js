const { ApolloError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { GraphQLScalarType } = require('graphql');
const Database = require('../dao/MysqlDao');
const userController = require('../services/controllers/userController');
const Response = require('../global/template/response');

const createToken = (user, secret, expiresIn) => {
  const { id, name, username, photo } = user;
  return jwt.sign({ id, name, username, photo }, secret, { expiresIn });
};
const resolvers = {
  Query: {
    users: (parent, args, { dbContext }) => {
      return userController.getAllUsers(dbContext);
    },
    user: (parent, { email }, { dbContext }) => {
      return userController.getUserByEmail(dbContext, email);
    },
    me: (parent, args, { me }) => me,
  },
  Mutation: {
    // eslint-disable-next-line camelcase
    register: (parent, { name, first_name, last_name, username, email, password }, { dbContext }) => {
      const user = {
        name,
        first_name,
        last_name,
        email,
        username,
        password,
        is_active: true,
      };
      return userController
        .registerUser(dbContext, user)
        .then(() => Response.successMessage())
        .catch(err => {
          if (err.ErrorID === 1001) {
            return new ApolloError('user already exists in system', '1001');
          }
          return new ApolloError('user already exists in system', '1001');
        });
    },
    login: (parent, { email, password }, { dbContext }) => {
      const authPayload = {
        email,
        password,
      };
      return userController
        .loginUser(dbContext, authPayload)
        .then(token => Response.loginMessage(token))
        .catch(err => {
          return new ApolloError('user email, password not valid', '1001', err);
        });
    },
  },
};

module.exports = resolvers;
