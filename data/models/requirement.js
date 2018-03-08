const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  id: {type: Sequelize.STRING, primaryKey: true},
  node_id: Sequelize.STRING,
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

Requirement.updateById = (items) => {
  items.forEach( (item) => {
    Requirement.upsert(
      { id: item.id,
        node_id: item.node_id,
        description: item.description,
        requirement: item.requirement,
        node_order: item.node_order
      }
    )
  })    
}

Requirement.deleteById = (id) => {
  Requirement.destroy({
    where: { id: id }
  })
}

module.exports = Requirement