const Sequelize = require('sequelize');
const conn = require('../database/database');

const Perguntas = conn.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pergunta: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Perguntas
  .sync({ force: false })
  .then(() => {});

module.exports = Perguntas;