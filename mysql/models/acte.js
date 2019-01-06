"use strict";
module.exports = function(sequelize, DataTypes) {
  var Acte = sequelize.define("Acte", {
          acteId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
        acteCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
        acteDescription: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        acteCodeGroupement: {
          type: DataTypes.STRING,
          allowNull: true
        },
          acteQualificatifDepense: {
              type: DataTypes.STRING,
              allowNull: true
          },
        actePrix: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
          actePrixOptam: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true
          },
        acteModificateurs: {
          type: DataTypes.STRING,
          allowNull: true
        },
          acteVersionId: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'acte',
        paranoid: true
      }
  );

  return Acte;
};
