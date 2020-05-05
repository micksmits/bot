module.exports = function(sequelize, DataTypes) {
  const channel = sequelize.define('channel',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      },
      guild_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'guilds',
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

  channel.associate = function (models) {
    channel.belongsTo(models.guild, {
      as: 'guild',
      foreignKey: 'guild_id',
      onDelete: 'CASCADE'
    })
  }

  return channel
}