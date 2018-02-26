const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  node_id: Sequelize.INTEGER,
  description: Sequelize.STRING,
  requirement: Sequelize.TEXT
})

Requirement.findById = (id) => {
  var table = Requirement.findAll(
    { where: {
      node_id: id
    }}
  )

  var listOfRequirements = table.map(row => {
    return {
      node_id: row.node_id,
      description: row.description,
      requirement: row.requirement,
    }
  })
  
  return listOfRequirements
}

module.exports = Requirement