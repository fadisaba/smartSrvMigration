"use strict";
module.exports = function(sequelize, DataTypes) {
    let InvoicefseHasFt = sequelize.define("InvoicefseHasFt", {
            invoicefseHasFtId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            invoiceHasFseId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            deviceId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            invoicefseHasFtYear: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoicefseHasFtSeuil: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoicefseHasFtNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoicefseHasFtIsReduit: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'invoicefse_has_ft',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    InvoicefseHasFt.belongsTo(models.InvoiceHasFse,{foreignKey: 'invoiceHasFseId'});
                    InvoicefseHasFt.belongsTo(models.Device,{foreignKey: 'deviceId'});
                }
            }
        }
    );
    return InvoicefseHasFt;
};
