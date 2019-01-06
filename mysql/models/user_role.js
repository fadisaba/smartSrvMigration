"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserRole = sequelize.define("UserRole", {
          userRoleId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          roleId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          userRoleRead: {
              type: DataTypes.BOOLEAN,
              allowNull: false
          },
          userRoleWrite: {
              type: DataTypes.BOOLEAN,
              allowNull: false
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_role',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserRole.belongsTo(models.User,{foreignKey: 'userId'});
              UserRole.belongsTo(models.Role,{foreignKey: 'roleId'});
          }
        }
      }
  );
  return UserRole;
};
