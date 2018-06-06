const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  id: {type: Sequelize.STRING, primaryKey: true},
  node_id: Sequelize.STRING,
  node_order: Sequelize.INTEGER,
  description: Sequelize.STRING,
  requirement: Sequelize.TEXT
})

Requirement.fetch = (id) => {
  var table = Requirement.findAll(
    { 
      where: {
        node_id: id
      }
    }
  )
  return table
}

Requirement.update = (items) => {
  items.forEach( (item) => {
    item.requirements.forEach( (requirement) => {
      Requirement.upsert(
        { id: requirement.id,
          node_id: requirement.node_id,
          description: requirement.description,
          requirement: requirement.requirement,
          node_order: requirement.node_order
        }
      )
    })
  })    
}

Requirement.delete = (items) => {
  items.forEach( (item) => {
    Requirement.destroy({
      where: { id: item.id }
    })
  })
}

Requirement.deleteByNodeId = (items) => {
  items.forEach( (item) => {
    Requirement.destroy({
      where: {node_id: item.id}
    })
  })
}

module.exports = Requirement