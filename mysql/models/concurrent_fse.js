"use strict";
module.exports = function(sequelize, DataTypes) {
  let ConcurrentFse = sequelize.define("ConcurrentFse", {
          concurrentFseId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },

          concurrentFseCpsNumero: {
              type: DataTypes.STRING,
              allowNull: false
          },
          concurrentFseTime: {
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
        tableName: 'concurrent_fse',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ConcurrentFse.belongsTo(models.User,{foreignKey: 'userId'});
          }
        }
      }
  );
  return ConcurrentFse;
};
