const connection = require('./../connection').visual
const Sequelize = require('sequelize')

const Customer = connection.define('customer', {
  name: Sequelize.STRING
})

Customer.prototype.customerFilter = 'Boeing'

Customer.fetch = () => {
  var table = Customer.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = Customer
