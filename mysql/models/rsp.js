"use strict";
module.exports = function (sequelize, DataTypes) {
    let Rsp = sequelize.define("Rsp", {
            rspId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            rspFileName: {
                type: DataTypes.STRING,
                allowNull: false
            },

            rspLot: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspError: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspListe: { // all FSE or FT of the rsp with all there amount
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspDestinataire: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspMandataire: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspIdentification: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspIssuer: {
                type: DataTypes.INTEGER, // 1 FSE, 2 FT
                allowNull: false
            },
            rspIsMatched: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            rspIsExported: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            rspTotalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspTotalAmo: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspTotalAmc: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspMoneyTransferDate: { // il s'agit de la date du virement
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            rspMoneyTransferRef: { // Référence du virement qui servira pour le rapprochement bancaire
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspRegime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspAmc: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspNoemieFileName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspNumeroFacturation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspComment: {
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
            tableName: 'rsp',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Rsp.hasMany(models.RspHasPayment, {foreignKey: 'rspId'});
                    Rsp.hasMany(models.RspFse, {foreignKey: 'rspId'});
                }
            }
        }
    );

    return Rsp;
};
