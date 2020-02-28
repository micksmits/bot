module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel',
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
          values: ['logs', 'media']
        })
      }
    },
    {
      modelName: 'channel',
      tableName: 'channels',
      timestamps: false
    }
  )
}