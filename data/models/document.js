const connection = require('./../connection').filebound
const Sequelize = require('sequelize')

const Document = connection.define('documents', {
  documentId: {type: Sequelize.INTEGER, primaryKey: true},
  fileId: Sequelize.INTEGER,
  dividerName: Sequelize.STRING,
  extension: Sequelize.STRING
})

module.exports = Document