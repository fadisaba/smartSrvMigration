"use strict";
module.exports = function(sequelize, DataTypes) {
    let Medecin= sequelize.define("Medecin", {
            idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            nomMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            initialesMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adeliMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },

            titre1Medecin: {
            type: DataTypes.STRING,
            allowNull: true
            },
            titre2Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre3Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre4Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            }, titre5Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sexeMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            specialiteMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            adresse1Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            }, adresse2Medecin: {
                type: DataTypes.STRING,
                allowNull: true
            },codePostalMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },villeMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },paysMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },telephoneMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },emailMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },faxMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },signatureMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },signatureCRMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },couleurMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },defaultOrdonnanceType: {
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
            tableName: 'medecin',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Medecin;
};
