"use strict";
module.exports = function(sequelize, DataTypes) {
    let Identite= sequelize.define("Identite", {
            id_identite: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            patient_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            id_coordonnee: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_correspondant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_titre: {
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
            nom_jf: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date_naissance: {
            type: DataTypes.STRING,
            allowNull: true
            },
            rang: {
                type: DataTypes.STRING,
                allowNull: true
            },
            etat_medecin_traitant: {
                type: DataTypes.STRING,
                allowNull: true
            },
            existence_mt: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sexe: {
                type: DataTypes.STRING,
                allowNull: true
            },


            VIP: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'identite',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    Identite.belongsTo(modelsEris.Coordonnee,{foreignKey: 'id_coordonnee'});
                    Identite.belongsTo(modelsEris.Correspondant,{foreignKey: 'id_correspondant'});
                }

            }
        }
    );
    return Identite;
};
