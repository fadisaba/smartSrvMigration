"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenType= sequelize.define("ExamenType", {
            idExamenType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            codeExamenType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            designationExamenType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idPereExamenType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            niveauExamenType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            couleurExamenType: {
            type: DataTypes.STRING,
            allowNull: true
            },
        /*
        1:Radio, 2:Scanner, 3:IRM, 4Mammographe, 5:Echographe, 9:Autre
         */
            classeTypeExamen: {
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
            tableName: 'examen_type',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return ExamenType;
};
