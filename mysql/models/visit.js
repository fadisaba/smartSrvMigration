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
            visitDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            visitTime: {
                type: DataTypes.TIME,
                allowNull: false
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
            visitHospitVisitNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitIsDone: {
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
            visitFtFor: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
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
            visitImageAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            visitNumeroFse: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitNumeroLotFse: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitNumeroDre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitNumeroLotDre: {
                type: DataTypes.STRING,
                allowNull: true
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