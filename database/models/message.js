module.exports = function(sequelize, DataTypes) {
  const message = sequelize.define('message',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      }
    },
    {
      modelName: 'message',
      tableName: 'messages',
      timestamps: false
    }
  )

  message.associate = function (models) {
    message.hasMany(models.reaction, {
      foreignKey: 'message_id',
      onDelete: 'CASCADE',
      hooks: true
    })
  }

  message.associate = function (models) {
    message.belongsTo(models.guild, {
      as: 'guild',
      foreignKey: 'guild_id',
      onDelete: 'CASCADE'
    })
  }

  return message
}