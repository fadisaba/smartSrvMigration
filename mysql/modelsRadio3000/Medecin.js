"use strict";
module.exports = function(sequelize, DataTypes) {
    let Medecin= sequelize.define("Medecin", {
            code_medecin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nom_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenom_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cp_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ville_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tel_medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            EMAIL_MEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Code_specialiste: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            valide_medecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            MAIL_AR: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'MEDECIN',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {

                }
            }
        }
    );
    return Medecin;
};
