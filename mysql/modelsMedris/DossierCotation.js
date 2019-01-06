"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierCotation= sequelize.define("DossierCotation", {
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            FACT_AM_ETS: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_ETABLISSEMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_SERVICE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            GRATUIT_PATIENT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PARCOURS_DE_SOINS: {
                type: DataTypes.STRING,
                allowNull: true
            },

            DATE_DE_FACTURATION: {
            type: DataTypes.DATEONLY,
            allowNull: true
            },
            NOM_DU_MEDECIN: {
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
            tableName: 'dossier_cotation',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return DossierCotation;
};
