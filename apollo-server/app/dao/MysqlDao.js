const logger = require('../lib/logger');
/* eslint func-names: ["error", "never"] */
/* eslint class-methods-use-this: 0 */

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  query(sql, id = null) {
    return new Promise((resolve, reject) => {
      logger.info(sql);
      this.connection.query(sql, id, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  execute(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.execute(sql, args, (err, data) => {
        logger.info(sql);
        if (err) {
          logger.info(err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  close() {
    /* istanbul ignore next */
    /* this is not being executed */
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  beginTransaction() {
    const promise = new Promise((resolve, reject) => {
      this.connection.beginTransaction(err => {
        if (err) {
          reject(err);
        }
        resolve(this.connection);
      });
    });
    return promise;
  }

  rollback(connection, error) {
    /* istanbul ignore next */
    /* this is not being executed */
    const promise = new Promise((resolve, reject) => {
      connection.rollback(() => {
        resolve({});
      });
    });
    return promise;
  }

  commit(connection) {
    const promise = new Promise((resolve, reject) => {
      connection.commit(errors => {
        if (errors) {
          reject(errors);
        }
        resolve(null);
      });
    });
    return promise;
  }
}
module.exports = Database;
