"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierExamen= sequelize.define("DossierExamen", {
            idDossierExamen: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idExamenType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idManipulateur: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idSalle: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idMateriel: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idPrescripteur: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            codeExamenType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            datePrescription: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            dateRealisationExamen: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            codeEntentePrealable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateEnvoiEntentePrealable: {
            type: DataTypes.DATEONLY,
            allowNull: true
            },
            numeroFT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolProduit: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutDossierExamen: {
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
            tableName: 'dossier_examen',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {
                    DossierExamen.belongsTo(modelsMedris.Examen,{foreignKey: 'idExamen'});

                }
            }
        }
    );
    return DossierExamen;
};
