"use strict";
module.exports = function(sequelize, DataTypes) {
    let Specialite= sequelize.define("Specialite", {
            id_specialite: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            code_specialite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            libelle_specialite: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'specialite',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return Specialite;
};
