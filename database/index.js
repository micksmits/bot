const Sequelize = require('sequelize')
const config = require('../env.js')

const sequelize = new Sequelize(
  config.dbname,
  config.dbuser,
  config.dbpass,
  {
    host: 'localhost',
    dialect: 'mysql',
    timestamps: false
  }
)

const models = [
'user',
'server'
]

models.forEach (function (model) {
  module.exports[model] = sequelize.import('../app/models/' + model)
})

module.exports.sequelize = sequelize