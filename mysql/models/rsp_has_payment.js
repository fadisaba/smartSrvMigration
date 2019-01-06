"use strict";
module.exports = function (sequelize, DataTypes) {
    let RspHasPayment = sequelize.define("RspHasPayment", {
            rspHasPaymentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            rspId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            paymentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'rsp_has_payment',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    RspHasPayment.belongsTo(models.Rsp, {foreignKey: 'rspId'});
                    RspHasPayment.belongsTo(models.Payment, {foreignKey: 'paymentId'});
                }
            }
        }
    );

    return RspHasPayment;
};
