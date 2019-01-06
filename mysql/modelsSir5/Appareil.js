"use strict";
module.exports = function(sequelize, DataTypes) {
    let Appareil= sequelize.define("Appareil", {
            IDE_APPAREIL: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_SALLE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            LIBELLE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMERO_AGREMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            DATE_AGREMENT: {
                type: DataTypes.DATE,
                allowNull: true
            },
            GEST_FT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CLASSE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            MODE_TRAITEMENT: {
                type: DataTypes.STRING,
                allowNull: false
            },
            MODELE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            MARQUE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PUISSANCE_FT: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ZONE_IMPLANTATION: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ENVOI_IMAGE: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'APPAREIL',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Appareil.belongsTo(modelsSir5.Salle,{foreignKey: 'IDE_SALLE'});

                    Appareil.hasMany(modelsSir5.Examen,{foreignKey: 'IDE_APPAREIL'});
                }
            }
        }
    );
    return Appareil;
};
