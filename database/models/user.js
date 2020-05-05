module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user',
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

  return user
}