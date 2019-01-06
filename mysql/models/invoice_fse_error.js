"use strict";
module.exports = function(sequelize, DataTypes) {
    let InvoicefseError = sequelize.define("InvoicefseError", {
            invoicefseErrorId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            invoicefseErrorNumeroFacturation: { // le numéro de facturation
                type: DataTypes.STRING,
                allowNull: false
            },
            invoicefseErrorFseNumber: { // le numéro du FSE ou B2 dans pyxvital
                type: DataTypes.STRING,
                allowNull: false
            },
            invoicefseErrorType: { // 1 FSE, 2 DRE, 3 FT B2
                type: DataTypes.INTEGER,
                allowNull: false
            },
            invoicefseErrorDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            invoicefseErrorText: {
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
            tableName: 'invoicefse_error',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );
    return InvoicefseError;
};