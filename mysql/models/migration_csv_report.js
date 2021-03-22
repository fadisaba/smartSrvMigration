"use strict";
module.exports = function (sequelize, DataTypes) {
    let MigrationCsvReport = sequelize.define("MigrationCsvReport", {
           migrationCsvReportId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            migrationCsvReportVisitId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            migrationCsvReportDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            migrationCsvReportTime: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvReportName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvReportDossier: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isImported: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            isError: {
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
            tableName: 'migration_csv_report',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                }
            }
        }
    );
    return MigrationCsvReport;
};
