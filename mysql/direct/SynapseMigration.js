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
                        /*  if(row.ps_obligatoire==='1')
                              siteGroupeModel.studyRequireDoctor=true;
                          else
                              siteGroupeModel.studyRequireDoctor=false;

                          if(row.mn_obligatoire==='1')
                              siteGroupeModel.studyRequireTech=true;
                          else
                          siteGroupeModel.studyRequireTech=true;

                          if(row.double_ft==='1')
                              siteGroupeModel.studyFtNumber=2;
                          else
                              siteGroupeModel.studyFtNumber=1;*/

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
                    siteGroupeModel.studyActeAmount = row.EXACTEQUANTITE;
                    siteGroupeModel.studyActeAmountDepassement = row.EXACTEMTDEP;
                    siteGroupeModel.studyActeAssociationNonPrevu = row.EXACTEANPREVUE;
                    siteGroupeModel.studyActeQuantity = row.EXACTEQUANTITE;
                    siteGroupeModel.studyActeAdditionalAmount = row.EXACTEMTDEP;
                    siteGroupeModel.studyActeCoefficient = row.EX_ACTE_COEFF;
                    siteGroupeModel.studyActeMigrationId = row.EXACTEID;

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
        filtersDossier.push({name: 'date_dossier', value1: startDate, value2: endDate, compare: 'between'});
        filtersDossier.push({name: 'annule', value: '0', compare: 'eq'});
        let rows = await dbUtilitySynapse.read({limit: 'no', filters: filtersDossier}, 'DOSSIER', '');
        for (let i = 0; i < rows.length; i++) {
            let rowDossier = rows[i];

            let filters = [{name: 'patientMigrationId', value: "" + rowDossier.id_identite + ""}];

            let _patientResultsArray = await dbUtility.read({
                limit: 1,
                filters: filters,
                fieldsArray: ['patientId']
            }, 'PATIENT');

            if (_patientResultsArray && _patientResultsArray.length) {
                let patientObj = _patientResultsArray[0];
                patientModel.visitId = uuid.v4();
                patientModel.siteId = rowDossier.id_cabinet;
                patientModel.patientId = patientObj.patientId;
                patientModel.remplacantId = rowDossier.id_remplacant;
                patientModel.establishmentId = null;
                patientModel.visitInvoiceType = 2;
                patientModel.doctorId = rowDossier.id_ps;

                patientModel.visitDate = moment(new Date(rowDossier.date_dossier)).format('Y-M-D');
                patientModel.visitTime = moment(new Date(rowDossier.date_dossier)).format('HH:mm:ss');

                patientModel.visitIsBySocialCard = true;


                patientModel.visitIsHospitalized = false;
                patientModel.visitIsUrgent = false;
                patientModel.visitHospitVisitNumber = 0;
                patientModel.visitIsDone = true;

                patientModel.visitMigrationId = rowDossier.id_dossier;
                patientModel.visitPacsId = rowDossier.id_dossier;
                // patientModel.groupVacId=rowDossier.id_groupe_vacation;
                patientModel.visitCotationStatus = 3;
                // patientModel.visitMigrationField1=rowDossier.idCorrespondantMT;
                //  patientModel.visitMigrationField2=rowDossier.idCorrespondant2;
                patientModel.visitIsAmo = false;
                patientModel.visitIsAmo = true;
                patientModel.visitIsAmc = false;

                patientModel.active = true;
                dataToCreate.push(patientModel);

                let visit = await dbUtility.saveRecord(patientModel, "VISIT", false);

                let worklistObj = {};
                worklistObj.worklistId = patientModel.visitId;
                worklistObj.visitId = patientModel.visitId;
                worklistObj.patientId = patientModel.patientId;
                worklistObj.siteId = patientModel.siteId;
                worklistObj.worklistStudies = "";
                let rowsDossierAffichage = await dbUtilitySynapse.read({
                    limit: 'no',
                    filters: [{name: 'id_dossier', value: rowDossier.id_dossier}]
                }, 'dossier_affichage', '');
                if (rowsDossierAffichage.length) {
                    worklistObj.worklistStudies = rowsDossierAffichage[0].examen;
                }
                worklistObj.worklistDoctor = "";
                if (rowDossier.id_ps) {
                    let rowsPs = await dbUtilitySynapse.read({
                        limit: 'no',
                        filters: [{name: 'id_ps', value: rowDossier.id_ps}]
                    }, 'ps', '');
                    if (rowsPs.length) {
                        worklistObj.worklistDoctor = rowsPs[0].nom + " " + rowsPs[0].prenom;
                    }
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


    migrateExamen: async function (mind, maxd, offset, startDate, endDate) {
        let dataToCreate = [];
        let visitId;
        let filtersDossier = [];
        filtersDossier.push({name: 'visitDate', value1: startDate, value2: endDate, compare: 'between'});
        let _visitRowsArray = await dbUtility.read({
            limit: 1,
            offset: offset,
            fieldsArray: ['visitMigrationId', 'visitId'],
            filters: filtersDossier
        }, 'VISIT')
        if (_visitRowsArray.length) {
            let visitMigrationId = _visitRowsArray[0].visitMigrationId;
            visitId = _visitRowsArray[0].visitId;
            //   console.log(visitMigrationId)
            if (visitMigrationId) {
                let filtersExamen = [{name: 'idDossier', value: parseInt(visitMigrationId)}, {name: 'DEL', value: 0}];

                let mainTableObject = {tableName: 'dossier_examen', filters: filtersExamen};
                let joinTablesArray = [];
                joinTablesArray.push({tableName: 'examen', fieldsArray: ['codeExamen', 'designationExamen']});

                let _rowsExamen = await dbUtilitySynapse.joinQuery(mainTableObject, joinTablesArray, 'no');
                if (_rowsExamen) {
                    if (_rowsExamen && _rowsExamen.length) {
                        let examenCode = "";
                        let i = 0;
                        _rowsExamen.forEach(_rowExamen => {
                            i++;
                            examenCode += _rowExamen['Examen.codeExamen'];
                            if (i < _rowsExamen.length)
                                examenCode += "|";
                        });
                        let worklistParam = {};
                        worklistParam.idName = 'visitId';
                        worklistParam.idValue = visitId;
                        worklistParam.worklistStudies = examenCode;
                        let saveWorklist = await dbUtility.saveRecord(worklistParam, 'WORKLIST');
                        let reportParam = {};
                        reportParam.idName = 'visitId';
                        reportParam.idValue = visitId;
                        reportParam.reportName = examenCode;
                        let saveReport = await dbUtility.saveRecord(reportParam, 'REPORT');
                        return saveWorklist;
                    } else return false;
                } else return false;
            }

        } else return false;


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
        /*if(_visitRowsArray.length)
        {*/
        for (let i = 0; i < _visitRowsArray.length; i++) {


            visitMigrationId = _visitRowsArray[i].visitMigrationId;
            visitId = _visitRowsArray[i].visitId;
            let filtersExamen = [{name: 'id_dossier', value: visitMigrationId, compare: 'eq'}, {
                name: 'annule',
                value: 0,
                compare: 'eq'
            }];

            let _rowsExamen = await dbUtilitySynapse.read({filters: filtersExamen}, 'compte_rendu', '');

            if (_rowsExamen && _rowsExamen.length) {
                let dataToInsertArray = [];
                _rowsExamen.forEach(function (_rowCr) {
                    let reportObj = {};
                    reportObj.reportId = uuid.v4();
                    reportObj.visitMigrationId = _rowCr.id_dossier;
                    reportObj.reportMigrationId = _rowCr.id_compte_rendu;
                    reportObj.studyId = 0;
                    reportObj.doctorId = _visitRowsArray[i].doctorId;
                    reportObj.visitId = visitId;
                    reportObj.reportName = _rowCr.titre;
                    reportObj.docName = _rowCr.id_compte_rendu + '.htm';
                    reportObj.reportPath = "migrated/" + _rowCr.lien + "/" + reportObj.docName;
                    reportObj.reportHtmlPath = reportObj.reportPath;
                    reportObj.reportContentIsHtml = false;
                    //  _item.reportDate = moment(_item.reportDate).format('Y-MM-DD');
                    reportObj.reportDate = _rowCr.dateheure;
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
ALTER TABLE `communes` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DELETED`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;

 */

//MedRisMigration.migratePatient(50000,55000);


//ErisMigration.migratePS();
//ErisMigration.migrateStudiesActe();
//SynapseMigration.migratePrescripteurs();
//SynapseMigration.migrateUnCorrespondant();
//SynapseMigration.migratePatient(100,1);

//ErisMigration.migrateUserAndDoctor();
//ErisMigration.migrateOrgEtbac();
//SynapseMigration.migrateStudies();
//SynapseMigration.migrateStudiesActe();

//ErisMigration.migrateDossier('2021-01-01','2021-06-10',true);

//ErisMigration.migrateCr('2021-01-01','2021-06-10');

