module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      },
      server_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'servers',
          key: 'id'
        }
      },
      type: {
        type: DataTypes.ENUM({
          values: ['welcome']
        })
      }
    },
    {
      modelName: 'role',
      tableName: 'roles',
      timestamps: false
    }
  )
}