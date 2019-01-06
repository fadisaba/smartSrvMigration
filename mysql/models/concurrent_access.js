"use strict";
module.exports = function(sequelize, DataTypes) {
  let ConcurrentAccess = sequelize.define("ConcurrentAccess", {
          concurrentAccessId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          concurrentAccessTableId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          concurrentAccessModuleName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          concurrentAccessTime: {
              type: DataTypes.DATE,
              allowNull: false
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'concurrent_access',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ConcurrentAccess.belongsTo(models.User,{foreignKey: 'userId'});
          }
        }
      }
  );
  return ConcurrentAccess;
};
