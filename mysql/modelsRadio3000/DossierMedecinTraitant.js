"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierMedecinTraitant= sequelize.define("DossierMedecinTraitant", {
            CODE_DOSSIER: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            CODE_MEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ACTIF: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'DOSSIER_MEDECIN_TRAITANT',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {
                    DossierMedecinTraitant.belongsTo(modelsRadio3000.Dossier,{foreignKey: 'CODE_DOSSIER'});
                }
            }
        }
    );
    return DossierMedecinTraitant;
};
