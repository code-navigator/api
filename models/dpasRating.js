const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const DpasRating = connection.define('dpasRating', {
  name: Sequelize.STRING
})

module.exports = DpasRating
