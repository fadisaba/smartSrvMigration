"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserScan = sequelize.define("UserScan", {
          userScanId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          docTypeId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          userScanOrder: {
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
        tableName: 'user_scan',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserScan.belongsTo(models.User,{foreignKey: 'userId'});
          }
        }
      }
  );
  return UserScan;
};
