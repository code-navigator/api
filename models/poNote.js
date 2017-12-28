const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const PoNote = connection.define('poNotes', {
  type: Sequelize.STRING,
  category: Sequelize.INTEGER,
  text: Sequelize.STRING,
  indexNo: Sequelize.INTEGER,
  filter: Sequelize.STRING
})

module.exports = PoNote
