"use strict";
module.exports = function(sequelize, DataTypes) {
    let Dossier= sequelize.define("Dossier", {
            code_dossier: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            code_assure: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_mutuelle: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_patient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_radiologue: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_securite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date_dossier: {
            type: DataTypes.DATEONLY,
            allowNull: true
            },
            heure_dossier: {
                type: DataTypes.DATE,
                allowNull: true
            },
            commentaire_dossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cotation_dossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numero_assure: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cr_dossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'DOSSIER',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {
                    Dossier.hasMany(modelsRadio3000.DossierMedecinTraitant,{foreignKey: 'CODE_DOSSIER'});

                }

            }
        }
    );
    return Dossier;
};
