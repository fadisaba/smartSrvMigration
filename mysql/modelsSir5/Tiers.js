"use strict";
module.exports = function(sequelize, DataTypes) {
    let Tiers= sequelize.define("Tiers", {
            IDE_TIERS: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NOM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMERO_DE_CAISSE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMERO_DE_CENTRE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMERO_MUTUELLE: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            tableName: 'TIERS',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {

                    Tiers.belongsTo(modelsSir5.Adresse,{foreignKey: 'IDE_ADRESSE'});

                    Tiers.hasMany(modelsSir5.PatientTiers,{foreignKey: 'IDE_TIERS'});

                }
            }
        }
    );

    return Tiers;
};
