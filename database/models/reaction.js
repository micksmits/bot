module.exports = function(sequelize, DataTypes) {
  const reaction = sequelize.define('reaction',
    {
      id: {
          type: DataTypes.BIGINT,
          primaryKey: true
      },
      message_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'messages',
          key: 'id'
        }
      },
      role_id: {
        type: DataTypes.BIGINT,
        references: {
          model: 'roles',
          key: 'id'
        }
      }
    },
    {
      modelName: 'reaction',
      tableName: 'reactions',
      timestamps: false
    }
  )

  reaction.associate = function (models) {
    reaction.belongsTo(models.message, {
      as: 'message',
      foreignKey: 'message_id',
      onDelete: 'CASCADE'
    })

    reaction.belongsTo(models.role, {
      as: 'role',
      foreignKey: 'role_id',
      onDelete: 'CASCADE'
    })
  }

  return reaction
}