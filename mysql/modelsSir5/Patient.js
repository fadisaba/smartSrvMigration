"use strict";
module.exports = function(sequelize, DataTypes) {
    let Patient= sequelize.define("Patient", {
            IDE_PATIENT: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_RADIOLOGUE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            QUALITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                defaultValue: 0

            },
            NIPP: {
                type: DataTypes.STRING,
                defaultValue: 0

            },
            NOM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NOM_PATRONYMIQUE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRENOM: {
                type: DataTypes.STRING,
                allowNull: true
            },

            SEXE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DATE_NAISSANCE: {
                type: DataTypes.DATE,
                allowNull: true
            },
            DATE_NAIS_SS: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMERO_SS: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CLE_SS: {
                type: DataTypes.STRING,
                allowNull: true
            },
            RANG_NAISSANCE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            NUMERO_INSC: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CLE_INSC: {
                type: DataTypes.STRING,
                allowNull: true
            },
            IDE_MEDTRAITANT: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'PATIENT',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Patient.belongsTo(modelsSir5.Adresse,{foreignKey: 'IDE_ADRESSE'});
                    Patient.belongsTo(modelsSir5.Radiologue,{foreignKey: 'IDE_RADIOLOGUE'});
                    Patient.hasMany(modelsSir5.Dossier,{foreignKey: 'IDU_DOSSIER'});
                    Patient.hasMany(modelsSir5.PatientTiers,{foreignKey: 'IDU_DOSSIER'});
                }
            }
        }
    );
    return Patient;
};
