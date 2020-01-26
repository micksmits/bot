module.exports = function(sequelize, DataTypes) {
  return sequelize.define('server',
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true
  
      }
    },
    {
      modelName: 'server',
      tableName: 'server',
      timestamps: false
    }
  )
}