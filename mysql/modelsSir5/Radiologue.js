"use strict";
module.exports = function(sequelize, DataTypes) {
    let Radiologue= sequelize.define("Radiologue", {
            IDE_RADIOLOGUE: {
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
            },
            QUALITE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:1
            },
            NOM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRENOM: {
                type: DataTypes.STRING,
                allowNull: true
            },

            NUM_NATIONAL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'RADIOLOGUE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {

                    Radiologue.belongsTo(modelsSir5.Adresse,{foreignKey: 'IDE_ADRESSE'});

                    Radiologue.hasMany(modelsSir5.Dossier,{foreignKey: 'IDE_RADIOLOGUE'});
                    Radiologue.hasMany(modelsSir5.ExamenCcam,{foreignKey: 'IDE_RADIOLOGUE'});
                    Radiologue.hasMany(modelsSir5.NomenclatureCcam,{foreignKey: 'IDE_RADIOLOGUE'});
                    Radiologue.hasMany(modelsSir5.Patient,{foreignKey: 'IDE_RADIOLOGUE'});
                }
            }
        }
    );

    return Radiologue;
};
