"use strict";
module.exports = function (sequelize, DataTypes) {
    let AccEntryType = sequelize.define("AccEntryType", {
            accEntryTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            accEntryTypeName: { // si perte ou trop percu ou remise mettre un code pour les distinguer
                type: DataTypes.STRING,
                allowNull: false
            },
            accEntryTypeCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'acc_entry_type',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    AccEntryType.hasMany(models.AccountingEntry, {foreignKey: 'accEntryTypeId',constraints: false});

                }
            }
        }
    );

    return AccEntryType;
};
