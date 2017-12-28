
const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const PoType = connection.define('poTypes', {
  name: Sequelize.STRING
})

module.exports = PoType

