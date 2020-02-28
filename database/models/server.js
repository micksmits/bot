module.exports = function(sequelize, DataTypes) {
  return sequelize.define('server',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      }
    },
    {
      modelName: 'server',
      tableName: 'servers',
      timestamps: false
    }
  )
}