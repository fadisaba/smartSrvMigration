"use strict";
module.exports = function (sequelize, DataTypes) {
    let SeuilDepassement = sequelize.define("SeuilDepassement", {
            seuilDepassementId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
        studyTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seuilDepassementMin: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
        seuilDepassementMax: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
        seuilDepassementMt: { // montant du dépassement à ventiller
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        seuilDepassementMtOptam: { // montant du dépassement à ventiller pour les optam
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }

        }, {
            tableName: 'seuil_depassement',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return SeuilDepassement;
};
