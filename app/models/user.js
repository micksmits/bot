module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user',
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true
  
      }
    },
    {
      modelName: 'user',
      tableName: 'user',
      timestamps: false
    }
  )
}