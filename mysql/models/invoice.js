"use strict";
module.exports = function (sequelize, DataTypes) {
    let Invoice = sequelize.define("Invoice", {
            invoiceId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            invoiceNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            invoiceType: { // 1-Invoice, 2-FSE,3-FT,4-note honoraire
                type: DataTypes.INTEGER,
                allowNull: false
            },
            invoiceDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            invoiceAmountPatient: { // Without neither additionnal amount nor "Remise"
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoicePatientAdditionalAmount: { // montant de dépassement sur le patient
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoicePatientAmountRemise: { // montant du remise patient lors de l'élaboration de la facture
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoiceRegoAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoiceRegcAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoiceAdditionalRegcAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },

            invoiceIsValidated: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            invoiceIsWating: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            invoiceIsCancelled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            invoiceHasAvoir: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            invoiceExportDate: { // export date,when the invoice was exported to the accounting software, we can't do any change
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            invoiceRegoRate: { // le pourcentage de prise en charge par le tiers payant obligatoire
                type: DataTypes.INTEGER,
                allowNull: true
            },
            invoiceRegcRate: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'invoice',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Invoice.belongsTo(models.Visit, {foreignKey: 'visitId'});
                    Invoice.hasMany(models.AccountingEntry, {foreignKey: 'invoiceId'});
                    Invoice.hasMany(models.InvoiceHasPayment, {foreignKey: 'invoiceId'});
                    Invoice.hasMany(models.InvoiceHasFse, {foreignKey: 'invoiceId'});
                }
            }
        }
    );

    return Invoice;
};
