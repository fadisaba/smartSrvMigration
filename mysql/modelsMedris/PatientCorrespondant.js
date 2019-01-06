"use strict";
module.exports = function(sequelize, DataTypes) {
    let PatientCorrespondant= sequelize.define("PatientCoordonnee", {
            idPatientCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            idPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idCorrespondant: {
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
            tableName: 'patient_correspondant',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return PatientCorrespondant;
};
