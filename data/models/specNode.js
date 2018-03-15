const connection = require('./../connection').cygnus
const Sequelize = require('sequelize')

const SpecNode = connection.define('specNode', {
  id: {type: Sequelize.STRING, primaryKey: true},
  title: Sequelize.STRING,
  parentId: Sequelize.STRING,
  open: Sequelize.BOOLEAN,
  readOnly: Sequelize.BOOLEAN
})

SpecNode.fetchNodes = () => {
  var table = SpecNode.findAll()

  nodeArray = table.map(row => {
    return {
      id: row.id,
      parentId: row.parentId,
      title: row.title,
      open: false,
      readOnly: true,
      children:[]
    }
  })

  return nodeArray
}

module.exports = SpecNode