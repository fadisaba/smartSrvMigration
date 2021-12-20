"use strict";
module.exports = function(sequelize, DataTypes) {
    let Fmalad= sequelize.define("Fmalad", {
            codpat: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            prenom: {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nomjfi: {
                type: DataTypes.STRING,
                allowNull: true
            },
            datnai: {
                type: DataTypes.DATE,
                allowNull: true
            },
            codciv: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numsec: {
                type: DataTypes.STRING,
                allowNull: true
            },
            clesec: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adres1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adres2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codpos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            burdis: { // ville
                type: DataTypes.STRING,
                allowNull: true
            },
            commen: {//tél
                type: DataTypes.STRING,
                allowNull: true
            },
            codpr1: { // medecin traitant
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'fmalad',
            paranoid: false,
            classMethods: {
                associate: function(modelsCabrad) {
                }
            }
        }
    );
    return Fmalad;
};
