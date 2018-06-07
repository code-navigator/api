const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const ShipMethod = connection.define('shipMethod', {
  name: Sequelize.STRING
})

ShipMethod.fetch = () => {
  var table = ShipMethod.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = ShipMethod

