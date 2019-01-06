"use strict";
module.exports = function(sequelize, DataTypes) {
  var Info = sequelize.define("Info", {
        infoId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        infoText: {
          type: DataTypes.STRING,
          allowNull: false
        },
        infoAlertLevel: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        patientId: {
          type: DataTypes.UUID,
          allowNull: true
        },
        visitId: {
          type: DataTypes.UUID,
          allowNull: true
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }

      },
      {
        tableName: 'info',
        paranoid: true,
        classMethods: {
          associate: function(models) {

            Info.belongsTo(models.Patient,{foreignKey: 'patientId'});
            Info.belongsTo(models.Visit,{foreignKey: 'visitId'});
          }
        }
      }
  );

  return Info;
};
