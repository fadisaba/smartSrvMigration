"use strict";
module.exports = function (sequelize, DataTypes) {
    var  Establishment = sequelize.define("Establishment", {
        establishmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cityId: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        siteId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue:null
        },
        establishmentCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentName: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentRemisePourcentage: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue:0
        },
        establishmentZipCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentAddress: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentCity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentFaxNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentEmail: {
                type: DataTypes.STRING,
                allowNull: true
            },
        establishmentIsHospital: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentIsFt: { // true si le ft facturé reste en plein tarif seuil 0 => pas de seuil 1 2 et 3 pour cet etablissement
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentIsHl7: { // Hl7 or Hprim
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentIsInvoicingFactInHprim: { // facture en hprim XML
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentIsInvoicingFtInHprim: {// si true, les ft sont envoyés dans un fichier hprimXML séparés des honoraire : cas CEGI qui ne support pas l'envoie des actes ngap et actes ccam dans le meme fichier hprim XML
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentSourceFolderPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentTargetFolderPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHl7IdName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHl7MessageNumber: { // incremental number of hprim fact messages
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
        },
        establishmentHl7FtMessageNumber: { // incremental number of hprim fact Ft messages
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
        },
        establishmentTargetCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentTargetName: {
            type: DataTypes.STRING,
            allowNull: true
        },

        establishmentSendReportByHl7  : { // if true we send the report to the establishment by hl7
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentFtIsFree  : { // if true the amount of generated F.T will be 0
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentHl7DeleteCarriageReturn  : { // if true we delete the carriage return execpted for the first and last line
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentIppLength: { // the ipp length
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentAdjustIppLength: { // Adjust ipp by adding 0 to the start
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        establishmentFtpHost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpLogin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpPassword: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentFtpPassifMode: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
        establishmentMigrationId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentMigrationId2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimAddActeur: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddAdresseActeur: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddTelActeur: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddActeurSpecialiteHprim: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddNumeroIdentifiantSantePatient: {
        type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
    },
        establishmentHprimAddAdressePatient: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddTelPatient: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddLieuNaissancePatient: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddNatureVenuHprim: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddModeEntreVenu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddModeTransportVenu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
            establishmentHprimAddUniteFonctionnelleVenu: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            establishmentHprimAddAdresseMedecinVenu: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
        establishmentHprimAddSpecialiteHpimMedecinVenu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
            establishmentHprimAddModeHprimSortie: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            establishmentHprimAddParticipantsIntervention: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
        establishmentHprimAddDateActionActe: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddActeurActe: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimAddActeurAdresseActe: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        establishmentHprimFacturable: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimRembExceptionnel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimValide: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimFacture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimDocumentaire: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimGratuit: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimOptionCoordination: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimOptionSigne: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimEncoding: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimVersion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtNormal: {// code FT normal scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtSeuil1: {// code FT Seuil1 scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtSeuil2: {// code FT Seuil2 scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtSeuil3: {// code FT Seuil3 scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCode2emeFtNormal: {// code du deuxième ft normal pour le scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCode2emeFtSeuil1: {// code du deuxième ft seuil1 pour le scanner
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtNormalIRM: {// code FT normal pour l'irm
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentHprimCodeFtSeuil1IRM: {// code FT seuil 1  pour l'irm
            type: DataTypes.STRING,
            allowNull: true
        },
        establishmentNature: {
            type: DataTypes.STRING,
            allowNull: true
        },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'establishment',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Establishment.hasMany(models.Visit, {foreignKey: 'establishmentId', constraints: false});
                    Establishment.hasMany(models.EstHasServ, {foreignKey: 'establishmentId'});
                    Establishment.hasMany(models.PatientHl7, {foreignKey: 'establishmentId'});
                    Establishment.hasMany(models.PatientHasIpp, {foreignKey: 'establishmentId'});
                    Establishment.belongsTo(models.City, {foreignKey: 'cityId', constraints: false});
                }
            }
        }
    );
    return Establishment;
};
