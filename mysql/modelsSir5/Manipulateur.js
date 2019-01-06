"use strict";
module.exports = function(sequelize, DataTypes) {
    let Manipulateur= sequelize.define("Manipulateur", {
            IDE_MANIP: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            QUALITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_SPECIALITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NOM: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            PRENOM: {
                type: DataTypes.STRING,
                defaultValue: null
                }
        },
        {
            tableName: 'MANIPULATEUR',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Manipulateur.hasMany(modelsSir5.Examen,{foreignKey: 'IDE_MANIP'});
                    Manipulateur.hasMany(modelsSir5.Salle,{foreignKey: 'IDE_MANIP'});
                }
            }
        }
    );

    return Manipulateur;
};
