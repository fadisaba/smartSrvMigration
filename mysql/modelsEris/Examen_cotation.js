"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenCotation= sequelize.define("ExamenCotation", {
            id_examen_cotation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_examen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_acte: {
                type: DataTypes.STRING,
                allowNull: true
            },
            coefficient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_regroupe: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam_ngap: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'examen_cotation',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    ExamenCotation.belongsTo(modelsEris.Examen,{foreignKey: 'id_examen'});
                }

            }
        }
    );
    return ExamenCotation;
};
