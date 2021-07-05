"use strict";
module.exports = function(sequelize, DataTypes) {
    let PsSituation= sequelize.define("PsSituation", {
            id_ps_situation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            num_nat: {
                type: DataTypes.STRING,
                allowNull: true
            },
            num_fac: {
                type: DataTypes.STRING,
                allowNull: true
            },

            num_rpps: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type_carte: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_civilite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: true
            },


            prenom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numero_situation: {
                type: DataTypes.STRING,
                allowNull: true
            },

            mode_exercice: {
                type: DataTypes.STRING,
                allowNull: true
            },
            secteur_activite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type_identif_structure: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numero_identif_structure: {
                type: DataTypes.STRING,
                allowNull: true
            },


            raison_sociale_structure: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cle_identif_structure: {
                type: DataTypes.STRING,
                allowNull: true
            },

            code_specialite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_convention: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_zone_tarifaire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_zone_ik: {
                type: DataTypes.STRING,
                allowNull: true
            },

            code_agrement_1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_agrement_2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_agrement_3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            habilitation_lot: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'ps_situation',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return PsSituation;
};
