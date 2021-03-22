"use strict";
module.exports = function (sequelize, DataTypes) {
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
            reportReprisePath: { // le chemin d'accès au report au format orginal repris des autres RIS
                type: DataTypes.STRING,
                allowNull: true
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
            reportPdfName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            reportIsSentToSih: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            reportSentToSihError: {
                type: DataTypes.STRING,
                allowNull: true
            },
            reportValidationDateTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            reportMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            reportIsSendToDiffusion: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            reportIsSendToDiffusionPresc: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            reportCheckedForDiffusionPresc: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitMigrationDate: {
                type: DataTypes.DATE,
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
                associate: function (models) {
                    Report.hasMany(models.ReportHeader, {foreignKey: 'reportId'});
                    Report.hasMany(models.ReportHasLog, {foreignKey: 'reportId'});
                    Report.belongsTo(models.Visit, {foreignKey: 'visitId'});
                    Report.belongsTo(models.Doctor, {foreignKey: 'doctorId'});
                }
            }
        }
    );
    return Report;
};