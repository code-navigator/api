const connection = require('../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  id: {type: Sequelize.STRING, primaryKey: true},
  nodeId: Sequelize.STRING,
  nodeOrder: Sequelize.INTEGER,
  description: Sequelize.STRING,
  requirement: Sequelize.TEXT
})

Requirement.fetch = (id) => {
  var table = Requirement.findAll(
    { 
      where: {
        nodeId: id
      },
      order: [['nodeOrder', 'ASC']]
    }
  )
  .map(row => {
    return {
      id: row.id,
      nodeId: row.nodeId,
      nodeOrder: row.nodeOrder,
      description: row.description,
      requirement: row.requirement
    }
  })

  return table
}

Requirement.update = (items) => {
  items.forEach( (item) => {
    item.requirements.forEach( (requirement) => {
      Requirement.upsert(
        { id: requirement.id,
          nodeId: requirement.nodeId,
          description: requirement.description,
          requirement: requirement.requirement,
          nodeOrder: requirement.nodeOrder
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
      where: {nodeId: item.id}
    })
  })
}

module.exports = Requirement