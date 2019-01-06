"use strict";
module.exports = function(sequelize, DataTypes) {
    let Manipulateur= sequelize.define("Manipulateur", {
            idManipulateur: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nomManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sexeManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse1Manipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },

            adresse2Manipulateur: {
            type: DataTypes.STRING,
            allowNull: true
            },
            codePostalManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            villeManipulateur: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            paysManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephoneManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            faxManipulateur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            emailManipulateur: {
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
            tableName: 'manipulateur',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Manipulateur;
};
