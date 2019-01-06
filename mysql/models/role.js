"use strict";
module.exports = function(sequelize, DataTypes) {
  let Role = sequelize.define("Role", {
          roleId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        roleCode: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          roleName: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'role',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Role.hasMany(models.UserRole,{foreignKey: 'roleId'});
          }
        }
      }
  );
  return Role;
};
