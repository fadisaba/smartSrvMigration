const fs = require('fs');
var unrtf = require('unrtf');
let dbUtilitySynapse = require('../common/DbUtilitySynapse');
let dbUtility = require('../common/DbUtility');
//let smartMeDbName='_migrate';
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let SynapseMigration = {


    migrateUnPrescripteurs: async function (_obj) {
        let row = _obj;
        let userModel = {};
        userModel.referringPhysicianId = uuid.v4();
        userModel.referringPhysicianMigrationId = row.PRESCRIPTEURID;
        userModel.referringPhysicianFName = row.PRESCRIPTEURPRENOM;
        if (userModel.referringPhysicianFName) {
            userModel.referringPhysicianFName = (userModel.referringPhysicianFName).replace('?Ü', "é");
            userModel.referringPhysicianFName = (userModel.referringPhysicianFName).replace('?¥', "ç");
            userModel.referringPhysicianFName = (userModel.referringPhysicianFName).replace('?ö', "ë");
            userModel.referringPhysicianFName = (userModel.referringPhysicianFName).replace('ã©', "é");

        }
        userModel.referringPhysicianLName = row.PRESCRIPTEURNOM;
        userModel.referringPhysicianSearch = userModel.referringPhysicianLName + " " + userModel.referringPhysicianFName;
        if (row.PRESCRIPTEURTEL)
            userModel.referringPhysicianPhoneNumber = row.PRESCRIPTEURTEL;
        else if (row.PRESCRIPTEURPORTABLE)
            userModel.referringPhysicianPhoneNumber = row.PRESCRIPTEURPORTABLE;
        userModel.referringPhysicianEmail = row.PRESCRIPTEUREMAIL;
        userModel.referringPhysicianAddress = row.PRESCRIPTEURADRESSE1;
        if (row.PRESCRIPTEURADRESSE2)
            userModel.referringPhysicianAddress += "\n " + row.PRESCRIPTEURADRESSE2;

        let rowsCommune = [];
        if (row.PRESCRIPTEURCOMMUNEID)
            rowsCommune = await dbUtilitySynapse.read({
                limit: "no", filters:
                    [{name: 'COMMUNEID', value: row.PRESCRIPTEURCOMMUNEID, compare: 'eq'}]
            }, "communes");

        if (rowsCommune.length) {
            let rowCommune = rowsCommune[0];
            userModel.referringPhysicianAddress += "\n" + rowCommune.COMMUNECP + " " + rowCommune.COMMUNENOM;
            userModel.referringPhysicianZipCode = rowCommune.COMMUNECP;

        }

        userModel.referringPhysicianGender = 0;

        userModel.referringPhysicianTitle = 0;
        userModel.cityId = 0;

        userModel.active = true;
        if (userModel.referringPhysicianFName && userModel.referringPhysicianLName)
            await dbUtility.insertRecords([userModel], "referring_physician", false);

    },

    migratePrescripteurs: async function () {
        let dataToCreate = [];

        let rows = await dbUtilitySynapse.read({limit: "no", filters: []}, "prescripteurs");
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let filtersArray = [{name: 'referringPhysicianMigrationId', value: row.PRESCRIPTEURID + "", compare: 'eq'}];
            let rowsMedRis = await dbUtility.read({limit: "no", filters: filtersArray}, "referring_physician");
            if (rowsMedRis.length === 0) {
                await this.migrateUnPrescripteurs(row);

                console.log('correspondant saved numero: ' + i);
            }

        }
        console.log('save Correspondant  was successful');
    },



    migrateUnPatient: async function (_patientObj) {
        let row = _patientObj;
        let patientModel = {};
        patientModel.patientId = uuid.v4();
        patientModel.cityId = 0;
        patientModel.patientPhoneNumber = "";
        patientModel.patientMobileNumber = "";
        patientModel.patientEmail = "";
        patientModel.patientAddress = "";
        patientModel.patientZipCode = "";


        patientModel.patientAddress = row.PATIENTADRESSE1;
        if (row.PATIENTADRESSE2)
            patientModel.patientAddress += "\n " + row.PATIENTADRESSE2;

        let rowsCommune = [];
        if (row.PATIENTCOMMUNEID) {
            rowsCommune = await dbUtilitySynapse.read({
                limit: "no", filters:
                    [{name: 'COMMUNEID', value: row.PATIENTCOMMUNEID, compare: 'eq'}]
            }, "communes");

            if (rowsCommune.length) {
                let rowCommune = rowsCommune[0];
                patientModel.patientAddress += "\n" + rowCommune.COMMUNECP + " " + rowCommune.COMMUNENOM;
                patientModel.patientZipCode = rowCommune.COMMUNECP;

            }

        }
        let rowsCorresp = await dbUtility.read({
            limit: "no", filters:
                [{name: 'referringPhysicianMigrationId', value: row.PRESCRIPTEURID + "", compare: 'eq'}]
        }, "referring_physician");

        if (rowsCorresp.length) {
            patientModel.referringPhysicianId = rowsCorresp[0].referringPhysicianId;
        }
        //patientModel.referringPhysicianId=1;
        patientModel.patientMigrationId = row.PATIENTID;
        patientModel.patientFname = row.PATIENTPRENOM;
        patientModel.patientLName = row.PATIENTNOM;
        patientModel.patientPacsId = row.PATIENTPACSID;
        patientModel.patientSearch = patientModel.patientLName + " " + patientModel.patientFname;

        patientModel.patientGender = row.PATIENTSEXE;
        patientModel.patientTitle = row.PATIENTCIVILITE;

        patientModel.patientTaille = row.PATIENT_TAILLE;
        patientModel.patientPoids = row.PATIENT_POIDS;
        patientModel.patientIsVip = row.PATIENT_VIP;


        if (row.PATIENTDATENAISSANCE) {
            patientModel.patientBirthday = moment(row.PATIENTDATENAISSANCE).format('Y-MM-DD');

        } else
            patientModel.patientBirthday = '1900-01-01';
        patientModel.patientSocialNumber = (row.PATIENTNUMEROSECU).replace(/\s/g, '');
        patientModel.patientSocialKey = row.PATIENTCLENUMEROSECU;
        patientModel.patientIns = row.PATIENTINSC;

        patientModel.active = true;
        if (patientModel.patientFname && patientModel.patientLName)
            await dbUtility.insertRecords([patientModel], "PATIENT", false)

    },
    migratePatient: async function (_limit, _offset) {

        let rows = await dbUtilitySynapse.read({limit: _limit, offset: _offset, filters: []}, "patient");
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let filtersArray = [{name: 'patientMigrationId', value: row.PATIENTID + "", compare: 'eq'}];
            let rowsSmartmed = await dbUtility.read({limit: "no", filters: filtersArray}, "patient");
            if (rowsSmartmed.length === 0) {
                await this.migrateUnPatient(row);

                console.log('patient saved numero: ' + i);
            }

        }
        console.log('save patients  was successful');
    },


    migrateStudies: function () {
        let dataToCreate = [];

        dbUtilitySynapse.read({limit: "no"}, 'EXAMEN', '')
            .then(function (rows) {
                rows.forEach(row => {
                    if (row.EXAMENABREV) {
                        let siteGroupeModel = {};
                        siteGroupeModel.studyId = row.EXAMENID;
                        siteGroupeModel.studyTypeId = 1;
                        siteGroupeModel.studyCode = row.EXAMENABREV;
                        siteGroupeModel.studyName = row.EXAMENDESIGNATION;
                        siteGroupeModel.studyDuration = row.EXAMENDUREEENMINUTES;
                        siteGroupeModel.studyDaysNbToSendSms = row.EXAMENNBJOURSSMS;
                        siteGroupeModel.studyDosimetry = row.EXAMEN_DOSIMETRIE;
                        siteGroupeModel.studyIsDosimetry = (row.EXAMEN_DOSIMETRIE != 0);
                        siteGroupeModel.studyIsInjected = row.EXAMENESTINJECTE;
                        siteGroupeModel.studyMultiSegment = row.EXAMEN_MULTI_SEG;
                        siteGroupeModel.studyIsSenolog = row.EXAMENESTSENOLOG;
                        siteGroupeModel.studyMigrationId = row.EXAMENID;
                        siteGroupeModel.studyFtNumber = row.EXAMENNBFT;
                        siteGroupeModel.studyGenerateDicomWl = (row.EXAMEN_GENERATE_WL || (row.EXAMENESTHORSNOM == 0));

                        siteGroupeModel.active = (row.EXAMEN_INACTIF == 0);
                        dataToCreate.push(siteGroupeModel);
                    }
                });
                return dbUtility.insertRecords(dataToCreate, "STUDY", false)
                    .then(function (insertId) {
                        console.log('save study was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error SynapseMigration.js => Function migrateStudies : " + error);
            })
    },

    migrateStudiesActe: function () {
        let dataToCreate = [];
        let filtersArray = [];
        dbUtilitySynapse.read({limit: "no", filters: filtersArray}, 'Exs_Acte', '')
            .then(function (rows) {
                rows.forEach(row => {
                    let siteGroupeModel = {};
                    siteGroupeModel.studyActeId = row.EXACTEID;
                    siteGroupeModel.studyId = row.EXAMENID;
                    siteGroupeModel.studyActeCode = row.EXACTECODE;
                    siteGroupeModel.studyActeType = 1;//CCAM
                    if (row.EXACTEESTCCAM) {
                        siteGroupeModel.studyActeType = 1;//CCAM
                    }
                    if (row.EXACTEESTNGAP) {
                        siteGroupeModel.studyActeType = 2;//NGAP
                    }
                    if (row.EXACTEESTHORSNOM) {
                        siteGroupeModel.studyActeType = 3;//Hors nom

                    }
                    siteGroupeModel.studyActeAmount = row.EXACTEMT;
                    siteGroupeModel.studyActeAmountDepassement = row.EXACTEMTDEP;
                    siteGroupeModel.studyActeAssociationNonPrevu = row.EXACTEANPREVUE;
                    siteGroupeModel.studyActeQuantity = row.EXACTEQUANTITE;
                    siteGroupeModel.studyActeAdditionalAmount = row.EXACTEMTDEP;
                    siteGroupeModel.studyActeCoefficient = row.EX_ACTE_COEFF;
                    siteGroupeModel.studyActeMigrationId = row.EXACTEID;
                    siteGroupeModel.studyActeModificators = row.EXACTEMODIFICATEUR;
                    siteGroupeModel.studyActeDepense = row.EXACTEQUALIFDEP;
                    siteGroupeModel.studyActeEntentePrealable = row.EXACTESOUMISEP;
                    siteGroupeModel.studyActeExtensionDocumentaire = row.EX_ACTE_EXT_DOC;
                    siteGroupeModel.studyActeRefundingCode = row.EXACTEREMBOURSEMENT;
                    siteGroupeModel.studyActeAcceptedModificators = row.EXACTEMODIFISPOSSIBLE;
                    siteGroupeModel.active = true;
                    dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate, "STUDY_ACTE", false)
                    .then(function (insertId) {
                        console.log('save study_acte was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error SynapseMigration.js => Function migrateStudiesActe : " + error);
            })
    },

    migrateDossier: async function (startDate, endDate, recuprerRego) {
        let dataToCreate = [];
        let rowDossier;
        let patientModel = {};
        let filtersDossier = [];
        filtersDossier.push({name: 'CONSULTDATE', value1: startDate, value2: endDate, compare: 'between'});
        filtersDossier.push({name: 'DELETED', value: '0', compare: 'eq'});
        let rows = await dbUtilitySynapse.read({limit: 'no', filters: filtersDossier}, 'consult', '');
        for (let i = 0; i < rows.length; i++) {
            let rowDossier = rows[i];

            let filters = [{name: 'patientMigrationId', value: "" + rowDossier.PATIENTID + ""}];

            let _patientResultsArray = await dbUtility.read({
                limit: 1,
                filters: filters,
                fieldsArray: ['patientId']
            }, 'PATIENT');

            if (_patientResultsArray && _patientResultsArray.length) {
                let patientObj = _patientResultsArray[0];
                patientModel.visitId = uuid.v4();
                if (rowDossier.SITEID == 2 || rowDossier.SITEID == 3) {
                    patientModel.siteId = 2;
                }
                if (rowDossier.SITEID == 4) {
                    patientModel.siteId = 1;
                }
                patientModel.patientId = patientObj.patientId;
                patientModel.remplacantId = rowDossier.CONSULTREMPLACANTID;
                patientModel.establishmentId = null;
                patientModel.visitInvoiceType = 2;
                patientModel.doctorId = rowDossier.USERID;
                //   patientModel.doctorId = rowDossier.USERID;

                patientModel.visitDate = moment(new Date(rowDossier.CONSULTDATE)).format('Y-M-D');
                patientModel.visitTime = rowDossier.CONSULTHEURE;

                // patientModel.visitTime = moment(new Date(rowDossier.date_dossier)).format('HH:mm:ss');

                patientModel.visitIsBySocialCard = true;


                patientModel.visitIsHospitalized = rowDossier.CONSULTESTHOSPITALISATION;
                patientModel.visitIsUrgent = rowDossier.CONSULTESTURGENCE;
                patientModel.visitHospitVisitNumber = 0;
                patientModel.visitIsDone = rowDossier.CONSULTTERMINEE;

                patientModel.visitMigrationId = rowDossier.CONSULTID;
                patientModel.visitPacsId = rowDossier.CONSULTPACSID;
                // patientModel.groupVacId=rowDossier.id_groupe_vacation;
                patientModel.visitCotationStatus = 3;
                // patientModel.visitMigrationField1=rowDossier.idCorrespondantMT;
                //  patientModel.visitMigrationField2=rowDossier.idCorrespondant2;
                patientModel.visitIsAmo = rowDossier.CONSULTTPAMO;
                //  patientModel.visitIsAmo = true;
                patientModel.visitIsAmc = rowDossier.CONSULTTPAMC;


                patientModel.visitTaille = rowDossier.CONSULT_PATIENT_TAILLE;
                //  patientModel.visitIsAmo = true;
                patientModel.visitPoids = rowDossier.CONSULT_PATIENT_POIDS;

                patientModel.active = true;
                dataToCreate.push(patientModel);

                let visit = await dbUtility.saveRecord(patientModel, "VISIT", false);

                let worklistObj = {};
                worklistObj.worklistId = patientModel.visitId;
                worklistObj.visitId = patientModel.visitId;
                worklistObj.patientId = patientModel.patientId;
                worklistObj.siteId = patientModel.siteId;
                worklistObj.worklistStudies = "";
                /* let rowsDossierAffichage = await dbUtilitySynapse.read({
                     limit: 'no',
                     filters: [{name: 'CONSULTID', value: rowDossier.CONSULTID}]
                 }, 'consults_exs', '');
                 if (rowsDossierAffichage.length) {
                     worklistObj.worklistStudies = rowsDossierAffichage[0].examen;
                 }*/


                let filtersExamen = [{name: 'CONSULTID', value: rowDossier.CONSULTID, compare: 'eq'}, {
                    name: 'DELETED',
                    value: 0
                }];

                let mainTableObject = {tableName: 'consults_exs', filters: filtersExamen};
                let joinTablesArray = [];
                joinTablesArray.push({tableName: 'examen', fieldsArray: ['EXAMENABREV', 'EXAMENDESIGNATION']});

                let _rowsExamen = await dbUtilitySynapse.joinQuery(mainTableObject, joinTablesArray, 'no');
                if (_rowsExamen) {
                    if (_rowsExamen && _rowsExamen.length) {
                        let examenCode = "";
                        let i = 0;
                        _rowsExamen.forEach(_rowExamen => {
                            i++;
                            examenCode += _rowExamen['Examen.EXAMENABREV'];
                            if (i < _rowsExamen.length)
                                examenCode += "|";
                        });


                        worklistObj.worklistStudies = examenCode;

                    }
                }


                worklistObj.worklistDoctor = "";
                if (rowDossier.USERID == '2035') {
                    worklistObj.worklistDoctor = "AOUAIFIA Abdelhamid";

                    /*
                                        let rowsPs = await dbUtilitySynapse.read({
                                            limit: 'no',
                                            filters: [{name: 'USERID', value: rowDossier.USERID}]
                                        }, 'ps', '');
                                        if (rowsPs.length) {
                                            worklistObj.worklistDoctor = rowsPs[0].nom + " " + rowsPs[0].prenom;
                                        }*/
                }
                if (rowDossier.USERID == '2016') {
                    worklistObj.worklistDoctor = "JANANI Morgane";
                }
                if (rowDossier.USERID == '2046') {
                    worklistObj.worklistDoctor = "ROY NINA";
                }
                worklistObj.worklistLastCrStatus = 3;

                let worklist = await dbUtility.saveRecord(worklistObj, "WORKLIST", false);

                if (recuprerRego) {
                    let regoObj = {};
                    regoObj.regoId = uuid.v4();
                    regoObj.visitId = patientModel.visitId;
                    regoObj.patientId = patientModel.patientId;
                    regoObj.regoCodeRegime = '1';
                    regoObj.regoCodeCaisse = '1';
                    regoObj.regoCodeCentre = '1';


                    await dbUtility.saveRecord(regoObj, "REGO", false);

                }
            }
        }
    },

    migrateExamens: async function (mind, maxd, startDate, endDate) {

        for (let i = mind; i < maxd; i++) {
            let offset = i;
            await MedRisMigration.migrateExamen(mind, maxd, offset, startDate, endDate);
        }


    },

    migrateCr: async function (startDate, endDate) {
        let visitId;
        let visitMigrationId;
        let filtersDossier = [];
        filtersDossier.push({name: 'visitDate', value1: startDate, value2: endDate, compare: 'between'});


        let _visitRowsArray = await dbUtility.read({
            limit: 'no',
            fieldsArray: ['visitMigrationId', 'visitId', 'doctorId'], filters: filtersDossier
        }, 'VISIT');
        for (let i = 0; i < _visitRowsArray.length; i++) {

            visitId = _visitRowsArray[i].visitId;
            visitMigrationId = _visitRowsArray[i].visitMigrationId;

            let filtersWorklist = [];
            filtersWorklist.push({name: 'visitId', value: visitId, compare: 'eq'});

            let worklistRowsArray = await dbUtility.read({
                fieldsArray: ['worklistStudies'], filters: filtersWorklist
            }, 'worklist');


            let filtersExamen = [{name: 'CONSULTID', value: visitMigrationId, compare: 'eq'}, {
                name: 'DELETED',
                value: 0,
                compare: 'eq'
            }];

            let _rowsExamen = await dbUtilitySynapse.read({filters: filtersExamen}, 'crs', '');

            if (worklistRowsArray && worklistRowsArray.length) {
                let dataToInsertArray = [];
                _rowsExamen.forEach(function (_rowCr) {
                    let reportObj = {};
                    reportObj.reportId = uuid.v4();
                    reportObj.visitMigrationId = _rowCr.CONSULTID;
                    reportObj.reportMigrationId = _rowCr.CRID;
                    reportObj.studyId = 0;
                    reportObj.doctorId = _visitRowsArray[i].doctorId;
                    reportObj.visitId = visitId;
                    if (worklistRowsArray && worklistRowsArray.length) {
                        reportObj.reportName = worklistRowsArray[0].worklistStudies;
                    } else {
                        reportObj.reportName = _rowCr.CRLIBELLE + '.html';
                    }

                    reportObj.docName = _rowCr.CRLIBELLE + '.html';
                    reportObj.reportPath = "migrated/" + (_rowCr.CRPATH).replace("docx", "html");
                    reportObj.reportHtmlPath = reportObj.reportPath;
                    reportObj.reportContentIsHtml = true;
                    reportObj.reportDate = moment(_rowCr.CRDATETIME).format('Y-MM-DD HH:mm:ss');
                    reportObj.reportStatus = 3; // valide
                    reportObj.active = true;
                    dataToInsertArray.push(reportObj);
                });

                let insertResult = await dbUtility.insertRecords(dataToInsertArray, "REPORT", false);
            }


        }
    },
    deleteVisit: async function () {
        let filtersDossier = [];
        filtersDossier.push({name: 'visitDate', value1: "2015-01-01", value2: "2015-12-31", compare: 'between'});


        let visitRowsArray = await dbUtility.read({
            limit: 15000,
            fieldsArray: ['visitMigrationId', 'visitId'], filters: filtersDossier
        }, 'VISIT');

        for (let i = 0; i < visitRowsArray.length; i++) {

            dbUtility.deleteRecordById('VISIT', 'visitId', visitRowsArray[i].visitId);
            dbUtility.deleteRecordById('VISIT_BALANCE', 'visitId', visitRowsArray[i].visitId);
            dbUtility.deleteRecordById('REGO', 'visitId', visitRowsArray[i].visitId);
            dbUtility.deleteRecordById('WORKLIST', 'visitId', visitRowsArray[i].visitId);


        }
    },
    migrateOrgEtbac: async function () {
        let dataToCreate = [];

        let rows = await dbUtilitySynapse.read({limit: "no", filters: []}, 'orgadest_param_etebac', '');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            let siteGroupeModel = {};
            siteGroupeModel.rapprochementAmoId = uuid.v4();
            // on traite les cas des régime spéciaux
            if (row.code_regime === "91" && row.code_centre_info === "007") {
                // MGEN
                siteGroupeModel.rapprochementAmoRegime = row.code_regime + " " + row.code_centre_info + " " + row.code_orgadest;
            } else
                siteGroupeModel.rapprochementAmoRegime = row.code_regime + " " + row.code_orgadest + " 000";

            siteGroupeModel.rapprochementAmoName = (row.libelle).replace(/\|-\|/g, " "); //supprimer toutes les espace dans l'organisme

            let filtersArray = [];
            filtersArray.push({
                name: 'rapprochementAmoRegime',
                value: siteGroupeModel.rapprochementAmoRegime,
                compare: 'eq'
            });


            let rowExisteArray = await dbUtility.read({
                limit: "no",
                filters: filtersArray
            }, 'rapprochement_amo', '');

            if (rowExisteArray.length === 0)
                await dbUtility.insertRecords([siteGroupeModel], "rapprochement_amo", false)
        }
        console.log('save rapprochement_amo was successful');
    }
};

/*
ALTER TABLE `patients` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
ALTER TABLE `prescripteurs` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 ALTER TABLE `examens` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 ALTER TABLE `exs_actes` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
ALTER TABLE `consults` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 ALTER TABLE `consults_exs` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
  ALTER TABLE `crs` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
ALTER TABLE `communes` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;

 */

//SynapseMigration.migratePrescripteurs();
//SynapseMigration.migratePatient(1500000,1);
//SynapseMigration.migrateStudies();
//SynapseMigration.migrateStudiesActe();
//SynapseMigration.migrateDossier('2015-01-01','2015-12-31',true);
//SynapseMigration.migrateCr('2015-01-01','2015-12-31');


/*
DELETE FROM public.referring_physician;
DELETE FROM public.patient;
DELETE FROM public.STUDY;
DELETE FROM public.STUDY_ACTE;
DELETE FROM public.visit;
DELETE FROM public.report;





*/


