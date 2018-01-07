const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const DpasRating = connection.define('dpasRating', {
  name: Sequelize.STRING
})

DpasRating.listOfNames = () => {
  var table = DpasRating.findAll()

  var listOfNames = table.map(row => {
    return row.name
  })
  
  return listOfNames
}

module.exports = DpasRating
