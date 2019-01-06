"use strict";
module.exports = function(sequelize, DataTypes) {
    let Correspondant= sequelize.define("Correspondant", {
            idCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nomCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nomCorrespondant2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            qualiteCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            specialiteCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idSpecialiteCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            conditionExerciceCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numeroCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cleCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            numeroRPPSCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            structureCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cleRPPSCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },

            adresse1Correspondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse2Correspondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse3Correspondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codePostalCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            villeCorrespondant: {
            type: DataTypes.STRING,
            allowNull: true
            },
            paysCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephoneCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            portableCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            emailCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            politesseCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            faxCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            typeCorrespondant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idEtablissement: {
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
            tableName: 'correspondant',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {
                    Correspondant.hasMany(modelsMedris.Patient, {foreignKey: 'idCorrespondant'});

                }
            }
        }
    );
    return Correspondant;
};
