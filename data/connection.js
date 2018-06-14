const Sequelize = require('Sequelize')
const config = require('./../config')

// Create connection to database
const connection = {
  cygnus: new Sequelize(
    'Cygnus',
    config.visualDb.user,
    config.visualDb.password,
    {
      logging: false,             // Disable logging
      host: config.visualDb.host,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: false
      },
      operatorsAliases: false
    }
  ),

  visual: new Sequelize(
    'VELIVE',
    config.visualDb.user,
    config.visualDb.password,
    {
      logging: false,             // Disable logging
      host: config.visualDb.host,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: false,
        freezeTableName: true
      },
      operatorsAliases: false
    }
  ),

  filebound: new Sequelize(
    'Filebound',
    config.fileboundDb.user,
    config.fileboundDb.password,
    {
      logging: false,             // Disable logging
      host: config.fileboundDb.host,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: false,
        freezeTableName: true
      },
      operatorsAliases: false
    }
  )
}

module.exports = connection
