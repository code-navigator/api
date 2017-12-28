const Sequelize = require('Sequelize')
const config = require('./../config')

// Create connection to database
const connection = {
  cygnus: new Sequelize(
    'Cygnus',
    config.user,
    config.password,
    {
      logging: false,             // Disable logging
      host: config.host,
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
    config.user,
    config.password,
    {
      logging: false,             // Disable logging
      host: config.host,
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
