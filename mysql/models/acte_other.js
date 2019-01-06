"use strict";
module.exports = function(sequelize, DataTypes) {
  let ActeOther = sequelize.define("ActeOther", {
        acteOtherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        acteOtherName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        acteOtherCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        acteOtherAmount: {
          type: DataTypes.STRING,
          allowNull: false
        },
        acteOtherIsNgap: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
          acteOtherStartDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          acteOtherEndDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'acte_other',
        paranoid: true
      }
  );

  return ActeOther;
};
