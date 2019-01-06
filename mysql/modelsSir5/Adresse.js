"use strict";
module.exports = function(sequelize, DataTypes) {
    let Adresse= sequelize.define("Adresse", {
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_COMMUNE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            LIGNE1: {
                type: DataTypes.STRING,
                allowNull: true

            },
            LIGNE2: {
                type: DataTypes.STRING,
                allowNull: true

            },
            LIGNE3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CEDEX: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CP_CEDEX: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'ADRESSE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Adresse.belongsTo(modelsSir5.Commune,{foreignKey: 'IDE_COMMUNE'});
                    Adresse.hasMany(modelsSir5.Manipulateur,{foreignKey: 'IDE_ADRESSE'});
                    Adresse.hasMany(modelsSir5.Medecin,{foreignKey: 'IDE_ADRESSE'});
                    Adresse.hasMany(modelsSir5.Patient,{foreignKey: 'IDE_ADRESSE'});
                    Adresse.hasMany(modelsSir5.Radiologue,{foreignKey: 'IDE_ADRESSE'});
                    Adresse.hasMany(modelsSir5.Site,{foreignKey: 'IDE_ADRESSE'});
                    Adresse.hasMany(modelsSir5.Tiers,{foreignKey: 'IDE_ADRESSE'});
                }
            }
        }
    );

    return Adresse;
};
