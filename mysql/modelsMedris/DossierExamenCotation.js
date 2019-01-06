"use strict";
module.exports = function(sequelize, DataTypes) {
    let DossierExamenCotation= sequelize.define("DossierExamenCotation", {
            idDossierExamenCotation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idDossierExamen: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PIX_ACTPH: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PIX_ACT_MOD: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CT_ANP: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PIX_ACT_RMO: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PIX_ACT_QUALIFICATIF_DEPENSE: {
                type: DataTypes.STRING,
                allowNull: true
            },


            MONTANT_REMISE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            MONTANT_DÉPASSEMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            activite_acte: {
                type: DataTypes.STRING,
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
                type: DataTypes.INTEGER,
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
            CODE_ACTE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            montantFacture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pixActeDomicile: {
                type: DataTypes.STRING,
                allowNull: true
            },
            accidentDroitCommun: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pixActeCoefficient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            demandeRembExcept: {
                type: DataTypes.STRING,
                allowNull: true
            },
            demandeSupDeCharge: {
                type: DataTypes.STRING,
                allowNull: true
            },
            associationNonPrevue: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pixActeALD: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pixActeNuit: {
                type: DataTypes.STRING,
                allowNull: true
            }, pixActeUrgence: {
                type: DataTypes.STRING,
                allowNull: true
            }, pixActeDJF: {
                type: DataTypes.STRING,
                allowNull: true
            }, pixActeExoneration: {
                type: DataTypes.STRING,
                allowNull: true
            }, pixActeExonerationLib: {
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
            tableName: 'dossier_examen_cotation',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return DossierExamenCotation;
};
