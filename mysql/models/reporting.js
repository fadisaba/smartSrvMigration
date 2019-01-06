"use strict";
module.exports = function(sequelize, DataTypes) {
  let Reporting = sequelize.define("Reporting", {
          reportingId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          reportingOrder: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          reportingCatCode: { // 1 report, 2 monthly report, 3
              type: DataTypes.INTEGER,
              allowNull: false
          },
          reportingName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          reportingFileName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          reportingDirectory: {
              type: DataTypes.STRING,
              allowNull: true
          },
              reportingIsHidden: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'reporting',
        paranoid: true,
        classMethods: {
          associate: function(models) {

          }
        }
      }
  );

  return Reporting;
};
