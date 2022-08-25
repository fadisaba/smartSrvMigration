"use strict";
module.exports = function (sequelize, DataTypes) {
    let MigrationCsvVisit = sequelize.define("MigrationCsvVisit", {
           migrationCsvVisitId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            migrationCsvVisitVisitId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            migrationCsvVisitPatientId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            migrationCsvVisitDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            migrationCsvVisitTime: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitDoctor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitMtId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitPrescripteurId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            migrationCsvVisitSiteId: {
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
            tableName: 'migration_csv_visit',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                   // VisitType.hasMany(models.Visit,{foreignKey: 'VisitTypeId',constraints:false});
                }
            }
        }
    );
    return MigrationCsvVisit;
};
