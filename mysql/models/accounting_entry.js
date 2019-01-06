"use strict";
module.exports = function (sequelize, DataTypes) {
    let AccountingEntry = sequelize.define("AccountingEntry", {
            accountingEntryId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            invoiceId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            accEntryTypeId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            /* accountingEntryType peut prendre les valeurs suivante
            1 Avoir , 2 Remise patient ultérieur à l'élaboration de la facture , 3 Trop percu, 4 perte patient (créance irrécouvrable),
            5 perte AMO (créance irrécouvrable), 6 perte AMC (créance irrécouvrable),7 créance douteuse patient
            8 créance douteuse AMO, 9 créance douteuse AMC, 10 Trop Perçu
            11 perte FT patient (créance irrécouvrable),
            12 perte FT Etablissement (créance irrécouvrable),
            13 perte AMO (créance irrécouvrable)
             */
            accountingEntryType: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            accountingEntryCancelled: { // annulé
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            accountingEntryAmount: { // il est négatif pour 
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            accountingEntryDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            accountingEntryExportDate: { // export date,  when the  accountingEntry was exported to the accounting software, we can't do any change
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'accounting_entry',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    AccountingEntry.belongsTo(models.Invoice, {foreignKey: 'invoiceId'});
                    AccountingEntry.belongsTo(models.AccEntryType, {foreignKey: 'invoiceId',constraints:false});

                }
            }
        }
    );

    return AccountingEntry;
};
