"use strict";
module.exports = function(sequelize, DataTypes) {
    let Site= sequelize.define("Site", {
            idSite: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idCabinet: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nomSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            designationSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            specialiteSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numEtablissement: {
                type: DataTypes.STRING,
                allowNull: true
            },

            siretSite: {
            type: DataTypes.STRING,
            allowNull: true
            },
            finessSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            typeSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            forfaitSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse1Site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse2Site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adresse3Site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codePostalSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            villeSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paysSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephoneSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            faxSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            capitalSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            RCSSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            uidSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idBanque: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idHPRIMSite: {
                type: DataTypes.INTEGER,
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
            tableName: 'site',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Site;
};
