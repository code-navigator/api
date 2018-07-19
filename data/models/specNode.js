const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const SpecNode = connection.define('specNode', {
  id: {type: Sequelize.STRING, primaryKey: true},
  title: Sequelize.STRING,
  parentId: Sequelize.STRING,
  open: Sequelize.BOOLEAN,
  readOnly: Sequelize.BOOLEAN
})

SpecNode.fetch = (id) => {
  var table = SpecNode.findAll(
    { 
      where: {
        id: id
      }
    }
  )
  .map(row => {
    return {
      id: row.id,
      parentId: row.parentId,
      title: row.title,
      open: false,
      readOnly: true,
      children:[],
      requirements: []
    }
  })
  
  return table
}

SpecNode.fetchAll = () => {
  var table = SpecNode.findAll()
  .map(row => {
    return {
      id: row.id,
      parentId: row.parentId,
      title: row.title,
      open: false,
      readOnly: true,
      children:[],
      requirements: []
    }
  })

  return table
}

SpecNode.update = (items) => {
  items.forEach( (item) => {
    SpecNode.upsert(
      { id: item.id,
        parentId: item.parentId,
        title: item.title
      }
    )
  })    
}

SpecNode.delete = (items) => {
  items.forEach( (item) => {
    SpecNode.destroy({
      where: { id: item.id }
    })
  })
}

module.exports = SpecNode