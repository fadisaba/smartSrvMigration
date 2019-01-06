"use strict";
module.exports = function (sequelize, DataTypes) {
    var  Establishment = sequelize.define("Establishment", {
        establishmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cityId: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        establishmentCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentName: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentZipCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentAddress: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentCity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentFaxNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentEmail: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentIsHospital: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentIsHl7: { // Hl7 or Hprim
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        establishmentSourceFolderPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentTargetFolderPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHl7IdName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHl7MessageNumber: { // incremental number of Hl7 messages
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentTargetCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentTargetName: {
            type: DataTypes.STRING,
            allowNull: true
        },

        establishmentSendReportByHl7  : { // if true we send the report to the establishment by hl7
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentFtIsFree  : { // if true the amount of generated F.T will be 0
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentHl7DeleteCarriageReturn  : { // if true we delete the carriage return execpted for the first and last line
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentIppLength: { // the ipp length
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentAdjustIppLength: { // Adjust ipp by adding 0 to the start
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentFtpHost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpLogin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpPassword: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpPassifMode: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
        establishmentMigrationId: {
            type: DataTypes.STRING,
            allowNull: true
        },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'establishment',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Establishment.hasMany(models.Visit, {foreignKey: 'establishmentId', constraints: false});
                    Establishment.hasMany(models.EstHasServ, {foreignKey: 'establishmentId'});
                    Establishment.hasMany(models.PatientHl7, {foreignKey: 'establishmentId'});
                    Establishment.hasMany(models.PatientHasIpp, {foreignKey: 'establishmentId'});
                    Establishment.belongsTo(models.City, {foreignKey: 'cityId', constraints: false});
                }
            }
        }
    );
    return Establishment;
};
