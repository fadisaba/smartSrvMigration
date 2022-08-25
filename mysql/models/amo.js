"use strict";
module.exports = function (sequelize, DataTypes) {
    let Amo = sequelize.define("Amo", {
            amoId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            amoName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoAdressePostale: {// addresse postale utilisé pour l'envoi des documents
                type: DataTypes.STRING,
                allowNull: true
            },
            amoAdressePostaleDegrade: {// addresse postale utilisé pour l'envoi les pièces justificatif du flux dégradé
                type: DataTypes.STRING,
                allowNull: true
            },
            amoCodeRegime: {
                type: DataTypes.STRING,
                allowNull: false
            },
                amoCodeCaisse: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoCodeCentre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoRegime: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoOrgDest: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoInfoCentre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amoNumCompte: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoZipCode: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoCedex: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoAddress1: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoAddress2: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },

            amoFaxNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoCity: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            amoMigrationId: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'amo',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return Amo;
};
