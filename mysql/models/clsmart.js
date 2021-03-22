"use strict";
module.exports = function(sequelize, DataTypes) {
  let Clsmart = sequelize.define("Clsmart", {
    clsmartId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    clsmartCheck: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    clsmartcle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }

      }, {
        tableName: 'clsmart',
        paranoid: true,
        classMethods: {
          associate: function(models) {

          }
        }
      }
  );

  return Clsmart;
};
