module.exports = function(sequelize, DataTypes) {
  const role = sequelize.define('role',
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
          values: [
            'welcome',
            'assign',
            'mute'
          ]
        })
      }
    },
    {
      modelName: 'role',
      tableName: 'roles',
      timestamps: false
    }
  )

  role.associate = function (models) {
    role.hasMany(models.reaction, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
      hooks: true
    })

    role.belongsTo(models.guild, {
      as: 'guild',
      foreignKey: 'guild_id',
      onDelete: 'CASCADE'
    })
  }

  return role
}