"use strict";
module.exports = function(sequelize, DataTypes) {
  let ActeVersion = sequelize.define("ActeVersion", {
          acteVersionId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
        acteVersionCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
        acteVersionStartDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
          acteVersionEndDate: {
              type: DataTypes.STRING,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'acte_version',
        paranoid: true
      }
  );
    return ActeVersion;
};
