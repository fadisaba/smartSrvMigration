"use strict";
module.exports = function (sequelize, DataTypes) {
    let Visit = sequelize.define("Visit", {
            visitId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            doctorId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            remplacantId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            executantId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            establishmentId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            estHasServId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            establishmentFtId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            visitDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            visitTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            visitRdvTime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitIsBySocialCard: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsFree: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitFtIsFree: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsHospitalized: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
                visitIsUrgent: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
                visitHospitAccountNumber: {///// le numéro du dossier administratif avec le hl7Pam
                type: DataTypes.STRING,
                allowNull: true
            },
            visitHospitUfHebergement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitHospitUfResponsable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitHospitVisitNumber: { // le numéro de séjour
                type: DataTypes.STRING,
                allowNull: true
            },
            visitChambre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitLit: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitIsDone: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitWithoutReport: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsAmo: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsAmc: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsBillingAMC: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitPds: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitInvoiceType: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            visitFtFor: { // 0 AMO, 1 Patient, 2 Etablissement
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            visitFtsNumbers: { // numeros des fts séparés par un virgule
                type: DataTypes.STRING,
                allowNull: true
            },
            visitPacsId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitMigrationId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            visitCotationStatus: {      /**  0 no quotation - 1 waiting    - 2 quotation saved  -3 quotation approved **/
                type: DataTypes.INTEGER,
                allowNull: true
            },
            visitCotationValidationDateTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            visitIppPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitActesEnSerie: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            patientStatusId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            visitTypeId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            visitValiditePatientId: {
                type: DataTypes.UUID,
                allowNull: true
            },

            visitImageAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitMigrationField1: { // used only for datamigration
                type: DataTypes.STRING,
                allowNull: true
            },
            visitMigrationField2: {// used only for datamigration
                type: DataTypes.STRING,
                allowNull: true
            },
            visitInitialesCotation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitReportIsLocked: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitFicheSuivIsPrinted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitQuotationAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            visitSuiviFacturationComment: {
                type: DataTypes.STRING,
                allowNull: true
        },
            visitRelanceAmoDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            visitRelanceAmcDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            visitRelanceEtabDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            visitRelancePatientDates: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitDerniereRelancePatientDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            visitRelancePatientNiveau: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            visitRelanceFtDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            visitByDayNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            visitIsDuplicated: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitNumeroFacturation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitInvoiceStandardNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            visitHprimFactNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            visitDateEnvoiHprim: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            },
            visitHprimFtNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            visitDateEnvoiHprimFt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            },
            visitIsAdri: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsBorne: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitFtCodeRegime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitFtCodeCaisse: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitFtCodeCentre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitWithoutFt: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitEstSortieDesUrgences: { // cette zone contiendra la date de sortie  des urgences recu par hl7 ou hprim
                type: DataTypes.DATE,
                allowNull: true
            },
            visitPoids: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitTaille: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitIsPreAccueil: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsVacExt: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsCancelled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitIsWithoutCR: { // n 'est pas utilisé
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitFtIsInvalidite: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'visit',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Visit.belongsTo(models.Patient, {foreignKey: 'patientId'});
                    Visit.belongsTo(models.Establishment, {foreignKey: 'establishmentId', constraints: false});
                    Visit.belongsTo(models.Establishment, {foreignKey: 'establishmentFtId', as: 'establishmentFt' , constraints: false});
                    Visit.belongsTo(models.Doctor, {foreignKey: 'doctorId'});
                    Visit.belongsTo(models.Site, {foreignKey: 'siteId'});
                    Visit.hasMany(models.Report, {foreignKey: 'visitId'});
                    Visit.hasMany(models.Dictation, {foreignKey: 'visitId'});
                    Visit.hasMany(models.Info, {foreignKey: 'visitId'});
                    Visit.hasMany(models.StudyVisit, {foreignKey: 'visitId'});
                    Visit.hasMany(models.VisitHasRph, {foreignKey: 'visitId'});
                    Visit.hasOne(models.Rego, {foreignKey: 'visitId', constraints: false});
                    Visit.hasOne(models.Regc, {foreignKey: 'visitId', constraints: false});
                    Visit.hasOne(models.Worklist, {foreignKey: 'visitId'});
                    Visit.hasMany(models.StudyVisitHasActe, {foreignKey: 'visitId'});
                    Visit.hasMany(models.Invoice, {foreignKey: 'visitId'});
                    Visit.hasMany(models.PatientDoc, {foreignKey: 'visitId', constraints: false});
                    Visit.hasOne(models.VisitBalance, {foreignKey: 'visitId', constraints: false});
                }
            }
        }
    );
    return Visit;
};