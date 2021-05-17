"use strict";
module.exports = function(sequelize, DataTypes) {
    let Examen= sequelize.define("Examen", {
            id_examen: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_examen_type_stat: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            libelle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numerisable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numerisable_auto: {
                type: DataTypes.STRING,
                allowNull: true
            },
            archive: {
                type: DataTypes.STRING,
                allowNull: true
            },
            archive_auto: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rdv_duree: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ps_obligatoire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            mn_obligatoire: {
                type: DataTypes.STRING,
                allowNull: true
            } ,
            double_ft: {
                type: DataTypes.STRING,
                allowNull: true
            },
            obsolete: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'examen',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    Examen.hasMany(modelsEris.ExamenCotation,{foreignKey: 'id_examen'});
                }

            }
        }
    );
    return Examen;
};
