const connection = require('./../connection').filebound
const Document = require('./document')
const Sequelize = require('sequelize')

const SPEC_PROJECT_ID = 20
const SPEC_DIVIDER_NAME = 'SPECIFICATION'

const File = connection.define('files', {
  fileId: {type: Sequelize.INTEGER, primaryKey: true},
  projectId: Sequelize.INTEGER,
  field1: Sequelize.STRING
})

File.hasMany(Document, {foreignKey: 'fileId'})

File.fetch = (title) => {
  // table = File.findAll(
  //   { 
  //     where: {
  //       field1: title,
  //       projectId: SPEC_PROJECT_ID
  //     },
  //     include: [{
  //       model: Document,
  //       where: {
  //         dividerName: SPEC_DIVIDER_NAME
  //       }
  //     }]
  //   }
  // )
  connection.query(
    `SELECT * FROM files
     INNER JOIN documents on files.fileId = documents.fileId
     WHERE replace(field1, ' ', '') = :title`,
    {
      replacements: {title: title.replace(' ', '')},
      type: connection.QueryTypes.SELECT
    }
  )
  .then(files => {
    console.log(files)
    return files
  })
}

module.exports = File