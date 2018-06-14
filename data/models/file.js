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
  table = File.findAll(
    { 
      where: {
        field1: title,
        projectId: SPEC_PROJECT_ID
      },
      include: [{
        model: Document,
        where: {
          dividerName: SPEC_DIVIDER_NAME
        }
      }]
    }
  )

  return table
}

module.exports = File