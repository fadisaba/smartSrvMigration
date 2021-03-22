"use strict";
module.exports = function (sequelize, DataTypes) {
    let BordRemise = sequelize.define("BordRemise", {
            bordRemiseId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            bankAccountId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            bordRemiseDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            bordRemiseLabel: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: false
            },
            bordRemiseAmount: {
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
            tableName: 'bord_remise',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    BordRemise.hasMany(models.Payment, {foreignKey: 'bordRemiseId',constraints: false});
                    BordRemise.belongsTo(models.BankAccount, {foreignKey: 'bankAccountId'});
                }
            }
        }
    );
    return BordRemise;
};
