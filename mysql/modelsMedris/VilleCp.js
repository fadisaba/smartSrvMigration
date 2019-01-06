"use strict";
module.exports = function(sequelize, DataTypes) {
    let VilleCp= sequelize.define("VilleCp", {
            idVilleCp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            codePostal: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ville: {
                type: DataTypes.STRING,
                allowNull: true
            },
            departement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            libelleDepartement: {
                type: DataTypes.STRING,
                allowNull: true
            },

            pays: {
            type: DataTypes.STRING,
            allowNull: true
            },
            insee: {
                type: DataTypes.STRING,
                allowNull: true
            },

             idMaintenance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DEL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'ville_cp',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return VilleCp;
};
