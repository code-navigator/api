const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const Requirement = connection.define('requirement', {
  node_id: Sequelize.BIGINT,
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
    Requirement.update(
      { description: item.description,
        requirement: item.requirement,
        node_order: item.node_order
      },
      {
        where: { id: item.id }
      }
    )
  })    
}

module.exports = Requirement