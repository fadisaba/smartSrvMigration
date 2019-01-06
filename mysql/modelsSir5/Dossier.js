"use strict";
module.exports = function(sequelize, DataTypes) {
    let Dossier= sequelize.define("Dossier", {
            IDU_DOSSIER: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_PATIENT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_RADIOLOGUE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_REMPLACANT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_SERVICE_HOSP: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_SERVICE_DEM: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_ACCIDENT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_SEJOUR: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            NUMERO_DOSSIER: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            CHAMBRE: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            LIT: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            GRATUIT_PATIENT: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            DOSSIER_FERME: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            CODE_URGENCE: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            DATE_ACCUEIL: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        },
        {
            tableName: 'DOSSIER',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Dossier.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDU_DOSSIER'});

                    Dossier.belongsTo(modelsSir5.Site,{foreignKey: 'IDE_SITE'});
                    Dossier.belongsTo(modelsSir5.Patient,{foreignKey: 'IDE_PATIENT'});
                    Dossier.belongsTo(modelsSir5.Radiologue,{foreignKey: 'IDE_RADIOLOGUE'});
                    /*Dossier.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDU_DOSSIER'});
                    Dossier.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDU_DOSSIER'});
                    Dossier.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDU_DOSSIER'});*/
                }
            }
        }
    );

    return Dossier;
};
