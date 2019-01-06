"use strict";
module.exports = function(sequelize, DataTypes) {
    var AppConfig = sequelize.define("AppConfig", {
            appConfigId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            appConfigSeuilPav: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
        appConfigHorsParcoursSoinsAmount: {// ce n'est pas le montant mais le pourcentage de minoration du remboursement (exemple 40)
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        appConfigAmountPav: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        appConfigCreateInvoiceLockTimeOut: { // timeout in seconds for locking the invoice creation
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 180 // 3 minute
        },
        appConfigLogoForReportWidth: { // logo  width in word report
            type: DataTypes.INTEGER,
            allowNull: true
        },
        appConfigLogoForReportHeight: { //  logo  height in word report
            type: DataTypes.INTEGER,
            allowNull: true
        },
        appConfigPdfModelePath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        appConfigCreateVisitLockTimeOut: { // timeout in seconds for locking the visit creation
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 180 // 3 minute
        },
        appConfigTeletransmissionLockTimeOut: { // timeout in seconds for locking the teletransmission
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 300 // 5 minute
        },
        appConfigUserMandatoryForQuotation: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        appConfigInfoVisitMandatoryForCotation: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        appConfigArroundirDepassement: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        appConfigVersion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        appConfigDisplayImpressionFicheSOnWorklist: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'app_config',
            paranoid: true

        }
    );
    return AppConfig;
};

