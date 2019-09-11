const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const userModel = require('../model/users');
const jwtSignAsync = Promise.promisify(jwt.sign, jwt);

class UserHelper {
  static hashPassword(password) {
    if (password) {
      const salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
      const hash = bcrypt.hashSync(password, salt);
      return hash;
    }
    return null;
  }

  static comparePassword(userPassword, email, password) {
    if (!userPassword.length) {
      return false;
    }
    return bcrypt.compareSync(userPassword, password);
  }

  static findByEmail(dbContext, email) {
    return dbContext
      .execute(userModel.findActiveUserByEmailId(), [email])
      .then(results => {
        return Promise.resolve(results[0]);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  static sign(data) {
    // get all these from secret vars
    const secret = process.env.JWT_SECRET;
    const issuer = 'Admin';
    const expiration = 86400000 / 1000;
    return jwtSignAsync({ data }, secret, {
      issuer,
      expiresIn: expiration,
    });
  }

  static generateToken(user) {
    return this.sign({
      type: user.type,
      id: user.id,
      username: user.username,
      email: user.email,
    }).then(token => Promise.resolve(token), err => Promise.reject(err));
  }
}

module.exports = UserHelper;
