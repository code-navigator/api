const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const Aircraft = connection.define('aircrafts', {
  name: Sequelize.STRING
})

module.exports = Aircraft
