"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenDossier= sequelize.define("ExamenDossier", {
            code_dossier: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            code_examen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Libelle_examen: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'Examen_dossier',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {
                }

            }
        }
    );
    return ExamenDossier;
};
