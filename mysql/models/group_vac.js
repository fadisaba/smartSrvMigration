"use strict";
module.exports = function(sequelize, DataTypes) {
  let GroupVac = sequelize.define("GroupVac", {
        groupVacId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
          groupVacName: {
          type: DataTypes.STRING,
          allowNull: true
        },
          groupVacCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
          groupVacColor: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue:15
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'group_vac',
        paranoid: true,
        classMethods: {
          associate: function(models) {
          }
        }
      }
  );
  return GroupVac;
};