"use strict";
module.exports = function (sequelize, DataTypes) {
    let Payment = sequelize.define("Payment", {
            paymentId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            siteId: { // the site of payment, can be different from the visit site
                type: DataTypes.BIGINT,
                allowNull: false
            },
            paymentMethodId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            rspId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            bankAccountTransactionId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cashBoxId: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue:null
            },
            bankAccountId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            bordRemiseId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            paymentDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            paymentAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            paymentEntryDate: { // date de la saisie du réglement
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            paymentMultiInvoice: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            paymentIssuer: { // 1 patient , 2 rego , 3 regc, 4 establishment, 5 ft patient, 6 ft rego,7 ft establishment, 8 Noemie rego,9 Noemie regc,10 Noemi Rego et Regc,11 Noemie ft,12 patient et patient FT, 13 etablissement et etablissement FT
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentReceivedAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            paymentAmountReturned: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            paymentIsOverpayment: { // remboursement de trop percu
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            paymentIsManagementFees: {// frais de gestion
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            paymentExportDate: { // export date,  when the  payment was exported to the accounting software, we can't do any change
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            paymentExportBordNumber: { // numéro de borderau lors de l'export comptable
                type: DataTypes.INTEGER,
                allowNull: true
            },
            paymentComment: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentCheckBankLabel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentCheckNumber: { // le numéro du chèque
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentCheckHolder: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentCheckIsUnpaid: {// chèque impayé
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            paymentIsCancelled: { // payment has been cancelled
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            paymentHasCancellationPayment: { // payment has a cancellation payment
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            paymentIsCancellation: { // payment has a cancellation payment
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },

            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'payment',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Payment.belongsTo(models.PaymentMethod, {foreignKey: 'paymentMethodId'});
                    Payment.belongsTo(models.Site, {foreignKey: 'siteId'});
                    Payment.belongsTo(models.CashBox, {foreignKey: 'cashBoxId',constraints: false});
                    Payment.belongsTo(models.BordRemise, {foreignKey: 'bordRemiseId',constraints: false});
                    Payment.belongsTo(models.BankAccount, {foreignKey: 'bankAccountId'});
                    Payment.hasMany(models.InvoiceHasPayment, {foreignKey: 'paymentId'});
                    Payment.hasMany(models.RspHasPayment, {foreignKey: 'paymentId'});
                }
            }
        }
    );

    return Payment;
};
