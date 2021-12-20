"use strict";
module.exports = function(sequelize, DataTypes) {
    let Fetab= sequelize.define("Fetab", {
            oid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            codeta: {
                type: DataTypes.STRING,
                allowNull: true
            },
            raisoc: {
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
            burdis: {//ville
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'fetab',
            paranoid: false,
            classMethods: {
                associate: function(modelsCabrad) {
                }
            }
        }
    );
    return Fetab;
};
