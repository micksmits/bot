module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
  
      },
    },
    {
      modelName: 'user',
      tableName: 'users',
      timestamps: false
    }
  )
}