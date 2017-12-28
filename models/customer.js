const connection = require('./../data/connection').visual
const Sequelize = require('sequelize')

const Customer = connection.define('customer', {
  name: Sequelize.STRING
})

Customer.prototype.customerFilter = 'Boeing'

module.exports = Customer
