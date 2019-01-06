"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierCompteRendu= sequelize.define("DossierCompteRendu", {
            idDossierCR: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            libelleCR: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateDossierCR: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDossierCR: {
                type: DataTypes.TIME,
                allowNull: true
            },
            pathDictee: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateDictee: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDictee: {
                type: DataTypes.TIME,
                allowNull: true
            },
            pathDocument: {
            type: DataTypes.STRING,
            allowNull: true
            },
            dateDocument: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDocument: {
                type: DataTypes.TIME,
                allowNull: true
            },
            pathDocDynamique: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateDocDynamique: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDocDynamique: {
                type: DataTypes.TIME,
                allowNull: true
            },
            nomRedacteur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pathPDF: {
                type: DataTypes.STRING,
                allowNull: true
            },
            datePDF: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heurePDF: {
                type: DataTypes.TIME,
                allowNull: true
            },
            envoiReussiFTP: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            creationReussiHL7: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dateCreationReussiHL7: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureCreationReussiHL7: {
                type: DataTypes.TIME,
                allowNull: true
            },
            statutCR: {
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
            tableName: 'dossier_compte_rendu',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return DossierCompteRendu;
};
