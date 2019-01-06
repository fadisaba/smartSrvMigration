"use strict";
module.exports = function (sequelize, DataTypes) {
    let CashBox = sequelize.define("CashBox", {
            cashBoxId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
           cashBoxLabel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cashBoxCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cashBoxLatestCheckAmount: { // le montant de l'arrêté de caisse
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            cashBoxLatestCheckDate: { // date du dernier l'arrêté de caisse
                type: DataTypes.DATE,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'cash_box',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    CashBox.hasMany(models.Payment, {foreignKey: 'cashBoxId',constraints: false});
                    CashBox.hasMany(models.CashBoxConfig, {foreignKey: 'cashBoxId'});
                    CashBox.hasMany(models.CashBoxFlow, {foreignKey: 'cashBoxId'});
                }
            }
        }
    );

    return CashBox;
};
