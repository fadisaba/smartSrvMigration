"use strict";
module.exports = function(sequelize, DataTypes) {
    let Utilisateur= sequelize.define("Utilisateur", {
            idUtilisateur: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nomUtilisateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomUtilisateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            emailUtilisateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            login: {
                type: DataTypes.STRING,
                allowNull: true
            },

            pass: {
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
            tableName: 'utilisateur_staris',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Utilisateur;
};
