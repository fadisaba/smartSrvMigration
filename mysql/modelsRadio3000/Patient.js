"use strict";
module.exports = function(sequelize, DataTypes) {
    let Patient= sequelize.define("Patient", {
            code_patient: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            titre_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NOM_PATIENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nom_jeune_fille_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRENOM_PATIENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cp_patient: {
            type: DataTypes.STRING,
            allowNull: true
            },
            Ville_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Tel_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            gemelaire_patient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Sexe_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },

            Date_patient: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            EMAIL_PATIENT: {
                type: DataTypes.STRING,
                allowNull: true
            }, IPP_PATIENT: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            tableName: 'PATIENT',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {

                }

            }
        }
    );
    return Patient;
};
