"use strict";
module.exports = function(sequelize, DataTypes) {
    let PatientCoordonnee= sequelize.define("PatientCoordonnee", {
            idPatientCoordonnee: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            idPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idCoordonnee: {
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
            tableName: 'patient_coordonnee',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return PatientCoordonnee;
};
