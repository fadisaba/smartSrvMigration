"use strict";
module.exports = function(sequelize, DataTypes) {
    let Patient= sequelize.define("Patient", {
            PATIENTID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            PATIENTIDNUM: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PATIENTPACSID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTINSC: {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            PATIENTCIVILITE: {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            PATIENTSEXE: {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            PATIENTPRENOM: {
                type: DataTypes.STRING,
                defaultValue: 0
            },
            PATIENTNOM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTNOMJF: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTDATENAISSANCE: {
                type: DataTypes.DATE,
                allowNull: true
            },
            PATIENTNUMEROSECU: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTCLENUMEROSECU: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTADRESSE1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTADRESSE2: {
                type: DataTypes.STRING,
                allowNull: true
            },


            PATIENTCOMMUNECP: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTCOMMUNEID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTTEL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTPORTABLE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENTEMAIL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PATIENT_VIP: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PATIENT_TAILLE: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            PATIENT_POIDS: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'PATIENTS',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return Patient;
};
