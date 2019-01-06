"use strict";
module.exports = function (sequelize, DataTypes) {
    let Mutuelle = sequelize.define("Mutuelle", {
            mutuelleId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            mutuelleName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mutuelleNum: { //peut être le numéro AMC, le numéro de la mutuelle, le numéro préfectorale ou le numéro RNM
                type: DataTypes.STRING,
                allowNull: false
            },
            mutuelleZipCode: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuellePhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleFaxNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleCity: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleFormule: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleModeGestion:{ //'0 AUCUNE 1 UNIQUE 2 SEPAREE
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0
            },
            mutuelleIndicTraitUnique: { // l'indicateur de traitement unique
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleIndicTraitSepare: { // l'indicateur de traitement séparé pour les DRE
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            mutuelleConvention: {
                type: DataTypes.STRING,
                allowNull: true
            },
            mutuelleMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'mutuelle',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return Mutuelle;
};
