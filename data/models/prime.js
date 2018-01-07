const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Prime = connection.define('prime', {
  name: Sequelize.STRING
})

Prime.listOfNames = () => {
  var table = Prime.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = Prime

