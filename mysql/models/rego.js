"use strict";
module.exports = function (sequelize, DataTypes) {
    var Rego = sequelize.define("Rego", {
            regoId: {
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
            regoNumSecu: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regoCleSecu: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regoCodeRegime: {
                type: DataTypes.STRING,
                allowNull: false
            },
            regoCodeCaisse: {
                type: DataTypes.STRING,
                allowNull: false
            },
            regoCodeCentre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            regoDateNaiss: { //Date de naissance récupérrée depuis la carte vitale et peut être au format lunaire
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            regoTauxRemboursement: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: '0.00'
            },
            regoCmu: { // la cmu-c géré par l'AMO numéro de mutuelle 99999997
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            regoCmuGereParAmc: { //Cmu-c géré par un AMC , numero de mutuelle  88888888
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            regoSortantCmu: { //sortant du cmu-c, numero de mutuelle  55555551
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            regoForcageSortantCmu: { //forcage du sortant de cmu =>forcer le code service de l'amo à 10
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoAld: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoForcageAld: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoAutrePec: { // autre pise en charge de l'amo
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoAme: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoAmeComp: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoInvalidite: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoDepistage: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
            regoAcs: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            regoForcageAcs: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            regoCodeAcs: {
                type: DataTypes.STRING,
                allowNull: true
            },
        regoAccDroitCommun: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoDateAccDroitCommun: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regoMaternite: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoForcageMaternite: { //Date de Forçage de la fin théorique des droits d'exonération du TM au titre de la maternité
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regoDateMaternite: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },

        regoSmg: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
            regoPuma: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },

            regoVictimeAttentat: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
        regoAt: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
            },
            regoAtDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            regoAtNumero: {
                type: DataTypes.STRING,
                allowNull: true
            },
            regoAtEmployeur: {
                type: DataTypes.STRING,
                allowNull: true
            },
            regoAtOrganisme: {
                type: DataTypes.STRING,
                allowNull: true
            },
            regoPresentationFeuilletAt: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
        regoRegimeAlsace: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
        },
        regoQualiteBenef: { // la qualité du bénéficiaire
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'0'
        },
        regoRangGemBenef: { //  Rang gémelaire du bénéficiaire 1 ou 2 
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'1'
        },
        regoNomAssure: { 
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regoPrenomAssure: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regoRangGemAssure: { //  Rang gémelaire de l'assuré 1 ou 2
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'1'
        },
            regoDateNaissAss: { //Date de naissance de l'assuré récupérrée depuis la carte vitale et peut être au format lunaire
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
        regoCodeCouverture: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        regoFns: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
            regoDu: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            regoAu: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'rego',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Rego.belongsTo(models.Patient, {foreignKey: 'patientId'});
                    Rego.belongsTo(models.Visit, {foreignKey: 'visitId', constraints: false});
                }
            }
        }
    );

    return Rego;
};
