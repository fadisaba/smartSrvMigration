"use strict";
module.exports = function(sequelize, DataTypes) {
    let CompteRendu= sequelize.define("CompteRendu", {
            id_compte_rendu: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_dossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_ps: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dateheure: {
                type: DataTypes.DATE,
                allowNull: true
            },
            etat: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nom_fichier: {
                type: DataTypes.STRING,
                allowNull: true
            },

            lien: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annule: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'compte_rendu',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    CompteRendu.belongsTo(modelsEris.Identite,{foreignKey: 'id_dossier'});
                    CompteRendu.belongsTo(modelsEris.Identite,{foreignKey: 'id_user'});
                    CompteRendu.belongsTo(modelsEris.Identite,{foreignKey: 'id_ps'});

                }

            }
        }
    );
    return CompteRendu;
};
