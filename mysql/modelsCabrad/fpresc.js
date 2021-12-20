"use strict";
module.exports = function(sequelize, DataTypes) {
    let Fpresc= sequelize.define("Fpresc", {
            oid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            codpre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codciv: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adres1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codpos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            burdis: {
                type: DataTypes.STRING,
                allowNull: true
            },
            teleph: {
                type: DataTypes.STRING,
                allowNull: true
            },
            specia: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'fpresc',
            paranoid: false,
            classMethods: {
                associate: function(modelsCabrad) {
                }
            }
        }
    );
    return Fpresc;
};
