"use strict";
module.exports = function(sequelize, DataTypes) {
    let Site= sequelize.define("Site", {
            IDE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_ADRESSE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_GRP_SITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true

            },
            LIBELLE: {
                type: DataTypes.STRING,
                defaultValue: null

            },
            UN_HDEBUT: {
                type: DataTypes.DATE

            },
            UN_HFIN: {
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'SITE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Site.belongsTo(modelsSir5.Adresse,{foreignKey: 'IDE_ADRESSE'});
                    Site.belongsTo(modelsSir5.GrpSite,{foreignKey: 'IDE_GRP_SITE'});
                    Site.hasMany(modelsSir5.Dossier,{foreignKey: 'IDE_SITE'});
                    Site.hasMany(modelsSir5.ExamenCcam,{foreignKey: 'IDE_SITE'});
                    Site.hasMany(modelsSir5.NomenclatureCcam,{foreignKey: 'IDE_SITE'});
                    Site.hasMany(modelsSir5.Salle,{foreignKey: 'IDE_SITE'});
                }
            }
        }
    );

    return Site;
};
