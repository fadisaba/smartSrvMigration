"use strict";
module.exports = function (sequelize, DataTypes) {
    let CashBoxFlow = sequelize.define("CashBoxFlow", {
            cashBoxFlowId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cashBoxId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            paymentId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            cashBoxFlowAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            cashBoxFlowDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            cashBoxFlowType: { // 1 Adding cash, 2-payments, 3- cancelling payment,4- cash withdrawal, 5-regularization 6-closing : correspond à un arrété de caisse
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cashBoxFlowHasCancellation: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            cashBoxFlowIsCancelled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            cashBoxFlowIsClosed: { // ce champs n'a aucun interet il est à supprimer
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            cashBoxFlowValidationNumber: { // il s'agit d'un numéro qui identifie les mouvement du meme arreté
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cashBoxFlowComment: {
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
            tableName: 'cash_box_flow',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    CashBoxFlow.belongsTo(models.CashBox, {foreignKey: 'cashBoxId'});
                }
            }
        }
    );
    return CashBoxFlow;
};
