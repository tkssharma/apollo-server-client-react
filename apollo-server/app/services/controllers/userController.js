const userModel = require('../model/users');
const userHelper = require('../helper/userHelper');
const APIError = require('../../global/template/apiError');

class UserController {
  static getAllUsers(dbContext) {
    return dbContext
      .query(userModel.getAllUsers())
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  static getUserByEmail(dbContext, email) {
    return dbContext
      .execute(userModel.getUserByEmail(), [email])
      .then(data => {
        return data[0];
      })
      .catch(err => {
        return err;
      });
  }

  static registerUser(dbContext, payload) {
    return userHelper
      .findByEmail(dbContext, payload.email)
      .then(user => {
        if (!user) {
          const data = { ...payload, password: userHelper.hashPassword(payload.password) };
          return dbContext.query(userModel.createUser(data)).then(() => {
            return Promise.resolve(null);
          });
        }
        return Promise.reject(new APIError('User already exist in System with same email', 1001));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  static loginUser(dbContext, payload) {
    return userHelper
      .findByEmail(dbContext, payload.email)
      .then(user => {
        if (!user) {
          return Promise.reject(new APIError('incorrect email address provided', 1001));
        }
        if (user && userHelper.comparePassword(payload.password, payload.email, user.password)) {
          return userHelper.generateToken(user).then(token => {
            return Promise.resolve(token);
          });
        }
        return Promise.reject(new APIError('incorrect password provided', 1002));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

module.exports = UserController;
