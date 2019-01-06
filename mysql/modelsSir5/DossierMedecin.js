"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierMedecin= sequelize.define("DossierMedecin", {
            IDU_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_MEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            NUM_LIGNE: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'DOSSIER_MEDECIN',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                   // DossierMedecin.belongsTo(modelsSir5.Dossier,{foreignKey: 'IDE_TIERS'});
                }
            }
        }
    );

    return DossierMedecin;
};
