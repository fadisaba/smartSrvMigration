"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierOrdonnance= sequelize.define("DossierOrdonnance", {
            idDossierOrdonnance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dateDossierOrdonnance: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDossierOrdonnance: {
                type: DataTypes.TIME,
                allowNull: true
            },
            pathOrdonnance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            envoiEMailOrdonnance: {
                type: DataTypes.STRING,
                allowNull: true
            },

            emailCorrespondant: {
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
            tableName: 'dossier_ordonnance',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return DossierOrdonnance;
};
