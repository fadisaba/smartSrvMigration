"use strict";
module.exports = function(sequelize, DataTypes) {
    let MedecinExamen= sequelize.define("MedecinExamen", {
            idMedecinExamen: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },   idExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dureeSalle: {
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
            tableName: 'medecin_examen',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return MedecinExamen;
};
