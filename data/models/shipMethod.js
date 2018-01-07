const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const ShipMethod = connection.define('shipMethod', {
  name: Sequelize.STRING
})

ShipMethod.listOfNames = () => {
  var table = ShipMethod.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = ShipMethod

