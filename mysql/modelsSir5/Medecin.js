"use strict";
module.exports = function(sequelize, DataTypes) {
    let Medecin= sequelize.define("Medecin", {
            IDE_MEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            QUALITE: {
                type: DataTypes.INTEGER,
            },
            SPECIALITE: {
                type: DataTypes.INTEGER,
            },
            NOM: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PRENOM: {
                type: DataTypes.STRING,
                allowNull: false
            },
            NUM_NATIONAL: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ENVOI_TXT: {
                type: DataTypes.INTEGER,
            },
            ENVOI_HTML: {
                type: DataTypes.INTEGER,
            },
            ENVOI_WORD: {
                type: DataTypes.INTEGER,
            },
            IMAGES_MAIL : {
                type: DataTypes.INTEGER,
            },
            ACCES_WEB: {
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: 'MEDECIN',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Medecin.belongsTo(modelsSir5.Adresse,{foreignKey: 'IDE_ADRESSE'});

                    Medecin.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDE_MEDECIN'});
                }
            }
        }
    );

    return Medecin;
};
