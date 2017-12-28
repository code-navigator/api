const connection = require('./../data/connection').cygnus
const Sequelize = require('sequelize')

const Prime = connection.define('prime', {
  name: Sequelize.STRING
})

module.exports = Prime
