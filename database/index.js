const Sequelize = require('sequelize')
const config = require('../env.js')

const sequelize = new Sequelize(
  config.dbname,
  config.dbuser,
  config.dbpass,
  {
    host: 'localhost',
    dialect: 'mysql',
    timestamps: false,
    logging: false,
  }
)

const models = [
'user',
'server',
'channel',
'role'
]

models.forEach (function (model) {
  module.exports[model] = sequelize.import('./models/' + model)
})

module.exports.sequelize = sequelize