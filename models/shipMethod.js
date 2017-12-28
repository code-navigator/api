const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const ShipMethod = connection.define('shipMethod', {
  name: Sequelize.STRING
})

module.exports = ShipMethod
