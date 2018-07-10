const connection = require('./../connection').filebound
const Document = require('./document')
const Sequelize = require('sequelize')

const File = connection.define('files', {
  fileId: {type: Sequelize.INTEGER, primaryKey: true},
  projectId: Sequelize.INTEGER,
  field1: Sequelize.STRING
})

File.hasMany(Document, {foreignKey: 'fileId'})

File.fetchSpec = (title) => {
  return connection.query(
    `SELECT * FROM files
     INNER JOIN documents on files.fileId = documents.fileId
     WHERE replace(field1, ' ', '') = :title
     AND dividername = 'SPECIFICATION'
     ORDER BY datefiled DESC`,
    {
      replacements: {title: title.replace(' ', '')},
      type: connection.QueryTypes.SELECT
    }
  )
}

File.fetchProc = (title) => {
  return connection.query(
    `SELECT * FROM files
     INNER JOIN documents on files.fileId = documents.fileId
     WHERE replace(field3, ' ', '') = :title`,
    {
      replacements: {title: title.replace(' ', '')},
      type: connection.QueryTypes.SELECT
    }
  )
}

module.exports = File