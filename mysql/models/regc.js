"use strict";
module.exports = function (sequelize, DataTypes) {
    let Regc = sequelize.define("Regc", {
            regcId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            regcMode: {  // S pour Séparé, U pour unique
                type: DataTypes.STRING,
                allowNull: false
            },
            regcNumMutuelle: { //le numéro de la mutuelle
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcNumAMC: {
                type: DataTypes.STRING, //le num AMC ou le numéro préféctorale OU le RNM
                allowNull: true,
                defaultValue:null
            },
            regcNumAdherent: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcFormule: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcIndicTraitement: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcSts: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcRoutage: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcHote: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcDomaine: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcTypeConv: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcCritereSecondaire: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcGarantieMut: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regcPecAMC: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
        regcTypeContrat: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regcAssureAMC: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regcDeVitale: { // si les droits sont récupérés depuis la carte vitale 
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regcRefusAMO: { 
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regcAttestationPresentee: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regcTauxRemboursement: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: '0.00'
        },
            regcDu: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            regcAu: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            regcForcageFinDroit: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            regcContrat: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'regc',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Regc.belongsTo(models.Patient, {foreignKey: 'patientId'});
                    Regc.belongsTo(models.Visit, {foreignKey: 'visitId', constraints: false});
                }
            }
        }
    );

    return Regc;
};
