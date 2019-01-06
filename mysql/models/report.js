"use strict";
module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define("Report", {
        reportId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        doctorId: { // the doctor validate the report
          type: DataTypes.INTEGER,
          allowNull: false
        },
        visitId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        reportName: {
          type: DataTypes.STRING,
          allowNull: false
        },
          reportPath: {
              type: DataTypes.STRING,
              allowNull: false
          },
          reportHtmlPath: {
              type: DataTypes.STRING,
              allowNull: false
          },
      reportContentIsHtml: {
          type: DataTypes.STRING,
          allowNull: false
      },
        reportDate: {
          type: DataTypes.DATE,
          allowNull: false,
            defaultValue: DataTypes.NOW
        },
        reportStatus: {
            /*
         1 :Report  in typing
         2: waiting for validation
         3- validated
         4- waiting for approval
         5-approved
         6- printed.
         7- report  to review
         */
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
          reportMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitMigrationId: {
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
        tableName: 'report',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Report.hasMany(models.ReportHeader,{foreignKey: 'reportId'});
            Report.belongsTo(models.Visit,{foreignKey: 'visitId'});
            Report.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
          }
        }
      }
  );

  return Report;
};