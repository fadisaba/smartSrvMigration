"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenMateriel= sequelize.define("ExamenMateriel", {
            idExamenMateriel: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idMateriel: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idSalle: {
                type: DataTypes.INTEGER,
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
            tableName: 'examen_materiel',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return ExamenMateriel;
};
