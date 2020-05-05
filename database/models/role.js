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
          model: 'servers',
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
      foreignKey: 'message_id',
      onDelete: 'CASCADE',
      hooks: true
    })
  }

  return role
}