const UserFields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_active', 'password'];
const QueryBuilder = require('../../dao/queryBuilder/index');

module.exports = {
  getUserByEmail() {
    return `SELECT ${UserFields} FROM User WHERE email = ?`;
  },
  findActiveUserByEmailId() {
    return `SELECT  ${UserFields}, password FROM User WHERE email = ?`;
  },
  getUserById() {
    return `SELECT ${UserFields} FROM User where id = ?`;
  },
  getAllUsers() {
    return `SELECT ${UserFields} FROM User`;
  },
  createUser(payload) {
    return QueryBuilder.insertQuery(UserFields, payload, 'User');
  },
};
