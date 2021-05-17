"use strict";
module.exports = function(sequelize, DataTypes) {
    let Correspondant= sequelize.define("Correspondant", {
            id_correspondant: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_coordonnee: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code: {
                type: DataTypes.STRING,
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
            obsolete: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_specialite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            apicrypt: {
                type: DataTypes.STRING,
                allowNull: true
            },
            utilisateur_apicrypt: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'correspondant',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    Correspondant.belongsTo(modelsEris.Coordonnee,{foreignKey: 'id_coordonnee'});
                }

            }
        }
    );
    return Correspondant;
};
