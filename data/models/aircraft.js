const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Aircraft = connection.define('aircrafts', {
  name: Sequelize.STRING
})

Aircraft.fetch = () => {
  var table = Aircraft.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = Aircraft
