module.exports = function(sequelize, DataTypes) {
  const guild = sequelize.define('guild',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      }
    },
    {
      modelName: 'guild',
      tableName: 'guilds',
      timestamps: false
    }
  )

  guild.associate = function (models) {
    guild.hasMany(models.channel, {
      foreignKey: 'guild_id',
      onDelete: 'CASCADE',
      hooks: true
    })
  }

  guild.associate = function (models) {
    guild.hasMany(models.message, {
      foreignKey: 'guild_id',
      onDelete: 'CASCADE',
      hooks: true
    })
  }

  return guild
}