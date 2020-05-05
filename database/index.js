const Sequelize = require('sequelize')
const config = require('../env.js')
const path = require('path')
const fs = require('fs')

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

let db = {}

fs
  .readdirSync(__dirname+'/models/')
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname+'/models/', file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.sequelize.sync()
module.exports = db