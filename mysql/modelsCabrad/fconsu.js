"use strict";
module.exports = function(sequelize, DataTypes) {
    let Fconsu= sequelize.define("Fconsu", {
            oid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            codcsl: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            codpat: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            codex1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codpr1: { // prescripteur
                type: DataTypes.STRING,
                allowNull: true
            },
            codex2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codex3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codex4: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codrad: {
                type: DataTypes.STRING,
                allowNull: true
            },
            datexa: { //date
                type: DataTypes.DATE,
                allowNull: true
            },
            cleass: {//heure
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'fconsu',
            paranoid: false,
            classMethods: {
                associate: function(modelsCabrad) {
                }
            }
        }
    );
    return Fconsu;
};
