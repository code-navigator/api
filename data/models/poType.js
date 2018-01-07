
const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const PoType = connection.define('poTypes', {
  name: Sequelize.STRING
})

PoType.listOfNames = () => {
  var table = PoType.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = PoType

