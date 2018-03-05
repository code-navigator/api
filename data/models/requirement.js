const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  node_id: Sequelize.INTEGER,
  node_order: Sequelize.INTEGER,
  description: Sequelize.STRING,
  requirement: Sequelize.TEXT
})

Requirement.findById = (id) => {
  var table = Requirement.findAll(
    { 
      where: {
        node_id: id
      }
    }
  )
  
  return table
}

Requirement.updateById = (id) => {
  Requirement.update(
    { description: 'Testing' },
    { where: { id: id } }
  )
    .then(result =>
      console.log("success")
    )
    .catch(err =>
      console.log("error")
    )
}

module.exports = Requirement