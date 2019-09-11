const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User]
    user(email: String!): User
    me: User
  }
  type Response {
    success: Boolean!
    message: String!
    description: String!
  }

  extend type Mutation {
    makeUser(name: String!): User!
    removeUser(id: Int!): Boolean
    register(
      name: String!
      first_name: String!
      last_name: String!
      username: String!
      email: String!
      password: String!
    ): Response!
    login(email: String!, password: String!): Token!
  }

  type User {
    id: ID
    first_name: String
    last_name: String
    username: String!
    email: String!
    address: String
    type: String
  }

  type Token {
    token: String!
    success: Boolean!
    message: String!
    description: String!
  }
`;
