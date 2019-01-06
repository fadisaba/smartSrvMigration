"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenCotation= sequelize.define("ExamenCotation", {
            idExamenCotation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE_ACTE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            quantiteActe: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PIX_ACT_MOD: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PIX_ACT_ANP: {
                type: DataTypes.STRING,
                allowNull: true
            },

            PIX_ACT_QUALIFICATIF_DEPENSE: {
            type: DataTypes.STRING,
            allowNull: true
            },
            montantDepassement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            activite_acte: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            phase_acte: {
                type: DataTypes.STRING,
                allowNull: true
            },
            remboursement_sous_condition: {
                type: DataTypes.STRING,
                allowNull: true
            },
            exo_tm: {
                type: DataTypes.STRING,
                allowNull: true
            },
            accord_prealable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_regroupement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            MONTANT_FORFAIT_TECHNIQUE: {
                type: DataTypes.STRING,
                allowNull: true
            },
             idMaintenance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DEL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'examen_cotation',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return ExamenCotation;
};
