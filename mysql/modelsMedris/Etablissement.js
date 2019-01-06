"use strict";
module.exports = function(sequelize, DataTypes) {
    let Etablissement= sequelize.define("Etablissement", {
            CODE_ETABLISSEMENT: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            idCabinet: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            NOM_ETABLISSEMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ADRESSE_1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ADRESSE_2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_POSTAL: {
                type: DataTypes.STRING,
                allowNull: true
            },

            COMMUNE: {
            type: DataTypes.STRING,
            allowNull: true
            },
            TELEPHONE: {
                type: DataTypes.STRING,
                allowNull: true
            },

            FAX: {
                type: DataTypes.STRING,
                allowNull: true
            },
            E_MAIL: {
                type: DataTypes.STRING,
                allowNull: true
            },

            NOM_CONTACT: {
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
            tableName: 'etablissement',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Etablissement;
};
