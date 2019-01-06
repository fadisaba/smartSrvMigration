"use strict";
module.exports = function(sequelize, DataTypes) {
    let Radiologue= sequelize.define("Radiologue", {
            code_radiologue: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            NOM_RADIOLOGUE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRENOM_RADIOLOGUE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            SIGNATURE_RADIOLOGUE: {
                type: DataTypes.STRING,
                allowNull: true
            },

            titre_radiologue: {
            type: DataTypes.STRING,
            allowNull: true
            },
            Adresse_radiologue: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CP_radiologue: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Ville_radiologue: {
                type: DataTypes.STRING,
                allowNull: true
            }, REMPLACE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_CIVILITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            MAIL_RADIOLOGUE: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'RADIOLOGUE',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {

                }
            }
        }
    );
    return Radiologue;
};
