const mysql = require('mysql2');
const logger = require('./logger');
const eventEmitter = require('../events/processEvent');
/* eslint func-names: ["error", "never"] */
const config = global.configuration.db;
logger.info(config);

let connection;
try {
  connection = mysql.createConnection(config);
} catch (err) {
  logger.error('Cannot establish a connection with the database');
  /** To Prevent sensitive info leak, not raising  actual error */
  throw new Error('Mysql connection failed (config)', 1);
}
connection.connect(err => {
  // in case of error
  if (err) throw new Error('Mysql connection failed (connect)', 1);
  else {
    logger.info(`MysqlClient connected to port ${config.port || 3306} and ${config.host} host`);
    eventEmitter.emit('dbReady', connection);
  }
});
connection.on('error', err => {
  logger.error('Cannot establish a connection with the database');
  /** To Prevent sensitive info leak, not raising  actual error */
  throw new Error('Mysql connection failed (event)', 1);
});
module.exports = connection;
