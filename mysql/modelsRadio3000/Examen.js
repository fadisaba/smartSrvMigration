"use strict";
module.exports = function(sequelize, DataTypes) {
    let Examen= sequelize.define("Examen", {
            CODE_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NUMERISE_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            LIBELLE_EXAMEN: {
                type: DataTypes.STRING,
                allowNull: true
            },
            LIBELLELONG_EXAMEN: {
                type: DataTypes.STRING,
                allowNull: true
            },
            COTATIONT0_EXAMEN: {
                type: DataTypes.STRING,
                allowNull: true
            },
            COTATIONT1_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            COTATIONT2_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CODE_SALLE: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            CODE_RADIOLOGUE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            VALIDE_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            HN_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            COTATIONT3_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE_WORKLIST: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ACTE_CCAM: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            AGREMENT_EXAMEN: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'Examen',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {
                }
            }
        }
    );
    return Examen;
};
