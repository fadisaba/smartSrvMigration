"use strict";
module.exports = function(sequelize, DataTypes) {
    let Coordonnee= sequelize.define("Coordonnee", {
            idCoordonnee: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            adresse1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codePostal: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ville: {
            type: DataTypes.STRING,
            allowNull: true
            },
            pays: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            portable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telProfessionnel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fax: {
                type: DataTypes.STRING,
                allowNull: true
            },
            typeAdresse: {
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
            tableName: 'coordonnee',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {
                    Coordonnee.hasMany(modelsMedris.Patient, {foreignKey: 'idCoordonnee'});

                }
            }
        }
    );
    return Coordonnee;
};
