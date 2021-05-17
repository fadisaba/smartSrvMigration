"use strict";
module.exports = function(sequelize, DataTypes) {
    let Dossier= sequelize.define("Dossier", {
            id_dossier: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_identite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_cabinet: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_groupe_vacation: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_ps: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_remplacant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            accession_number: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date_dossier: {
                type: DataTypes.DATE,
                allowNull: true
            },
            annule: {
                type: DataTypes.STRING,
                allowNull: true
            },

        },
        {
            tableName: 'dossier',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    Dossier.belongsTo(modelsEris.Identite,{foreignKey: 'id_identite'});
                }
            }
        }
    );
    return Dossier;
};
