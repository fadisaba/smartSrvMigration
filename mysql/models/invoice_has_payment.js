"use strict";
module.exports = function(sequelize, DataTypes) {
    let InvoiceHasPayment = sequelize.define("InvoiceHasPayment", {
            invoiceHasPaymentId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            invoiceId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            paymentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            invoiceHasPaymentAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            invoiceHasPaymentAmoAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            invoiceHasPaymentAmcAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },


            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'invoice_has_payment',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    InvoiceHasPayment.belongsTo(models.Invoice,{foreignKey: 'invoiceId'});
                    InvoiceHasPayment.belongsTo(models.Payment,{foreignKey: 'paymentId'});
                }
            }
        }
    );
    return InvoiceHasPayment;
};
