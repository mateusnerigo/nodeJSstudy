const Sequelize = require('sequelize');
const conn = require('../database/database');

const Respostas = conn.define('respostas', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pergunta_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Respostas.sync({ force: false });

module.exports = Respostas;