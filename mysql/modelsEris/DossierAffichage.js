"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierAffichage= sequelize.define("DossierAffichage", {
            id_dossier_affichage: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_dossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            examen: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'dossier_affichage',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    DossierAffichage.belongsTo(modelsEris.Dossier,{foreignKey: 'id_dossier'});
                }
            }
        }
    );
    return DossierAffichage;
};