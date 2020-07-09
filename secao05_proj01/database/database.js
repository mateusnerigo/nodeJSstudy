const Sequelize = require('sequelize');
const conn = new Sequelize('node001', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = conn;