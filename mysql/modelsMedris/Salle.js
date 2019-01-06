"use strict";
module.exports = function(sequelize, DataTypes) {
    let Salle= sequelize.define("Salle", {
            idSalle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idCabinet: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, idSiteIndex: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            designationSalle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            statutSalle: {
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
            tableName: 'salle',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Salle;
};
