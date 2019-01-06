"use strict";
module.exports = function(sequelize, DataTypes) {
    let CompteRendu= sequelize.define("CompteRendu", {
            code_cr: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_dossier: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },

            nom_cr: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Chemin_cr: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'COMPTE_RENDU',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {
                }

            }
        }
    );
    return CompteRendu;
};
