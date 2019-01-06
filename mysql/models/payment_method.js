"use strict";
module.exports = function (sequelize, DataTypes) {
    let PaymentMethod = sequelize.define("PaymentMethod", {
            paymentMethodId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            paymentMethodType: { // 1:cash 2: credit card 3:bank check 4:bank transfer
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentMethodCode: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: false
            },
            paymentMethodLabel: {
                type: DataTypes.STRING,
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
            tableName: 'payment_method',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    PaymentMethod.hasMany(models.Payment, {foreignKey: 'paymentMethodId'});
                    PaymentMethod.hasMany(models.BankAccountConfig, {foreignKey: 'paymentMethodId'});
                }
            }
        }
    );
    return PaymentMethod;
};
