const fs = require('fs');
let dbUtilitySir5=require('../common/DbUtilitySir5');// uncomment to do sir5 migration
let dbUtility=require('../common/DbUtility');
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let Sir5Migration = {
    fileContent:"",
    migrateCommune: function (params, callback) {
        let dataToCreate=[];
        dbUtilitySir5.read({limit:"no"},'COMMUNE','')
            .then(function (rows) {
                rows.forEach(row=>{
                    if(row.COMMUNE){
                        let siteGroupeModel={};
                        siteGroupeModel.cityId=row.IDE_COMMUNE;
                        siteGroupeModel.depId=1;
                        siteGroupeModel.cityName=row.COMMUNE;
                        siteGroupeModel.cityZipCode=row.CODE_POSTAL;
                        siteGroupeModel.cityMigrationId=row.IDE_COMMUNE;
                        siteGroupeModel.active=true;
                        siteGroupeModel.added=true;
                        dataToCreate.push(siteGroupeModel);
                    }
                });
                return dbUtility.insertRecords(dataToCreate,"CITY",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save COMMUNE  was successful",
                            success: true,
                            msg: ''
                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateCommune : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateGroupeSite: function (params, callback) {
        let dataToCreate=[];
        dbUtilitySir5.read({limit:"no"},'GRP_SITE','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.siteGroupId=row.IDE_GRP_SITE;
                    siteGroupeModel.siteGroupMigrationId=row.IDE_GRP_SITE;
                    siteGroupeModel.siteGroupName=row.LIBELLE;
                    siteGroupeModel.active=true;
                    siteGroupeModel.added=true;
                    dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"SITE_GROUP",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save site group was successful",
                            success: true,
                            msg: ''

                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateSite : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateSite: function (params, callback) {

        let dataToCreate=[];
        let dataConfigToCreate=[];
        let mainTable = {};
        mainTable.tableName = "SITE";
        mainTable.filters = [];
        let  joinArray= [{tableName: "ADRESSE",joinObject:{tableName: "COMMUNE"}}];
        dbUtilitySir5.joinQuery(mainTable, joinArray, "no")
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteModel={};
                    let siteConfigModel={};
                    siteModel.siteId=row.IDE_SITE;
                    siteModel.siteGroupId=row.IDE_GRP_SITE;
                    siteModel.siteName=row.LIBELLE;
                    siteModel.siteCode=row.CODE;
                    siteModel.siteMigrationId=row.IDE_SITE;

                    siteModel.siteAddress1=row['Adresse.LIGNE1'];
                    siteModel.siteAddress2=row['Adresse.LIGNE2'];
                    siteModel.siteZipCode=row['Adresse.Commune.CODE_POSTAL'];
                    siteModel.siteCityId=row['Adresse.Commune.IDE_COMMUNE'];
                    siteModel.cityMigrationId=row['Adresse.Commune.IDE_COMMUNE'];
                    siteModel.active=true;


                    siteConfigModel.siteConfigId=row.IDE_SITE;
                    siteConfigModel.siteId=row.IDE_SITE;
                    siteConfigModel.siteConfigWordPath="c";
                    siteConfigModel.siteConfigPyxPath="c";
                    siteConfigModel.siteConfigPyxirisPath="c";
                    siteConfigModel.siteConfigPyxPort=50;
                    siteConfigModel.siteConfigPyxirisPort=50;
                    siteConfigModel.siteConfigPyxNodePort=2000;
                    siteConfigModel.siteConfigTranscriptionPath="c";
                    siteConfigModel.siteConfigAmoDefault=false;
                    siteConfigModel.siteConfigAmcDefault=false;
                    siteConfigModel.siteConfigCotNuitHeureDebut="22:00:00";
                    siteConfigModel.siteConfigCotNuitHeureFin="05:00:00";

                    siteConfigModel.siteConfigStartHour=moment(new Date(row.UN_HDEBUT)).format('H')-1+":"+moment(new Date(row.UN_HDEBUT)).format('mm')+":00";
                    siteConfigModel.siteConfigEndHour=moment(new Date(row.UN_HFIN)).format('H')-1+":"+moment(new Date(row.UN_HFIN)).format('mm')+":00";
                    siteConfigModel.active=true;
                    dataToCreate.push(siteModel);
                    dataConfigToCreate.push(siteConfigModel);
				});
                let p1=dbUtility.insertRecords(dataToCreate,"SITE",false);
                let p2=dbUtility.insertRecords(dataConfigToCreate,"SITE_CONFIG",false);
                let promiseArray=[p1,p2];
                return Promise.all(promiseArray)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save site was successful",
                            success: true,
                            msg: ''

                        });
                    })
            })
            .then(function (rows) {
                // on regarde s'il y a des blob (Buffer) on les converti en string
                callback(null, {
                    data: rows,
                    success: true,
                    msg: ''

                });
            })
            .catch(function (error) {

                console.error("Error Sir5Migration.js => Function migrateSite : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateRadiologue: function (params, callback) {
        let dataToCreate=[];
        let dataUserToCreate=[];
        let mainTable = {};
        mainTable.tableName = "RADIOLOGUE";
        mainTable.filters = [];
        let  joinArray= [{tableName: "ADRESSE",joinObject:{tableName: "COMMUNE"}}];
        dbUtilitySir5.joinQuery(mainTable, joinArray, "no")
            .then(function (rows) {
                rows.forEach(row=>{
                        let userModel={};
                        let doctorModel={};
                        userModel.userId=row.IDE_RADIOLOGUE;
                        doctorModel.userId=row.IDE_RADIOLOGUE;
                        userModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                        userModel.userCatId=3;
                        userModel.userFName=row.PRENOM;
                        userModel.userLName=row.NOM;
                        userModel.userInitiales=row.CODE;
                         userModel.userLogin=row.CODE;
                        userModel.userPass=row.CODE;
                        userModel.userZipCode=row['Adresse.Commune.CODE_POSTAL'];
                        userModel.userAddress=row['Adresse.LIGNE1'];
                        userModel.userMigrationId=row.IDE_RADIOLOGUE;
                        userModel.active=true;


                        doctorModel.active=true;
                        doctorModel.doctorId=row.IDE_RADIOLOGUE;

                    dataToCreate.push(userModel);
                    dataUserToCreate.push(doctorModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"USER",false);
                let p2=dbUtility.insertRecords(dataUserToCreate,"DOCTOR",false);
                p1
                    .then(_result=>{
                        return p2;
                    })
                    .then(function (insertId) {
                        callback(null, {
                            data: "save Radiologue  was successful",
                            success: true,
                            msg: ''
                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateCommune : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migratePatientDelta: function (params, callback) {
        let dataToCreate=[];
        let mainTable = {};
        mainTable.tableName = "PATIENT";
        mainTable.filters = [];
        let  joinArray= [{tableName: "ADRESSE",joinObject:{tableName: "COMMUNE",required:false},required:false}];
        dbUtilitySir5.joinQuery(mainTable, joinArray, params.limit,true,"",params.offset)
            .then(function (rows) {
                rows.forEach(row=>{
                    dbUtility.read({filters:[{name:"patientMigrationId",value:row.IDE_PATIENT.toString()}]},"patient")
                        .then(_result=>{
                            callback(null, {
                                data: "save patient delta  was successful",
                                success: true,
                                msg: ''
                            });
                            if(_result.length)
                            {

                            }
                            else{
                                let patientModel={};
                                patientModel.patientId=uuid.v4();
                                patientModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                                patientModel.referringPhysicianId=null;


                                patientModel.patientMigrationId=row.IDE_PATIENT;
                                patientModel.patientPacsId=row.IDE_PATIENT;
                                patientModel.patientFname=row.PRENOM ||'-';
                                patientModel.patientLName=row.NOM ||'-';
                                patientModel.patientMigrationField=row.IDE_MEDTRAITANT;

                                patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;
                                patientModel.patientGender=0;
                                if(row.SEXE && row.SEXE==='F')
                                    patientModel.patientGender=2;
                                if(row.SEXE && row.SEXE==='M')
                                    patientModel.patientGender=1;

                                if(row.QUALITE && row.QUALITE===1714)//M
                                    patientModel.patientTitle=1;
                                if(row.QUALITE && row.QUALITE===1715)//MLLE
                                    patientModel.patientTitle=3;
                                if(row.QUALITE && row.QUALITE===1716)//MME
                                    patientModel.patientTitle=2;

                                patientModel.patientBirthday=row.DATE_NAISSANCE;
                                patientModel.patientSocialNumber=row.NUMERO_SS;
                                patientModel.patientSocialKey=row.CLE_SS;
                                patientModel.patientAddress=row['Adresse.LIGNE1']+" ";
                                if(row['Adresse.LIGNE2'])
                                    patientModel.patientAddress+=" "+row['Adresse.LIGNE2'];
                                patientModel.patientIns=row.NUMERO_INSC;
                                patientModel.patientInsKey=row.CLE_INSC;
                                patientModel.patientZipCode=row['Adresse.Commune.CODE_POSTAL'];
                                patientModel.active=true;

                                    patientModel.patientFname=row.PRENOM||'non renseigné';
                                patientModel.patientLName=row.NOM||'non renseigné';

                                dbUtility.insertRecords([patientModel],"PATIENT",false)
                                    .then(function (insertId) {
                                        console.log("insert" +patientModel );
                                    })
                                    .catch(function (error) {
                                        console.error("Error Sir5Migration.js => Function migratePatientDelta : " + error);

                                    })
                            }
                        })
                        .catch(function (error) {
                            console.error("Error Sir5Migration.js => Function migratePatientDelta : " + error);

                        })
                });

            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migratePatientDelta : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migratePatient: function (params, callback) {
        let dataToCreate=[];
        let mainTable = {};
        mainTable.tableName = "PATIENT";
        mainTable.filters = [];
        //mainTable.order =[["IDE_PATIENT", "ASC"]];
        let  joinArray= [{tableName: "ADRESSE",joinObject:{tableName: "COMMUNE",required:false},required:false}];
        dbUtilitySir5.joinQuery(mainTable, joinArray, params.limit,true,"",params.offset)
            .then(function (rows) {
                rows.forEach(row=>{
                    let patientModel={};
                    patientModel.patientId=uuid.v4();
                    patientModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                    //patientModel.referringPhysicianId=1;
                    patientModel.patientMigrationId=row.IDE_PATIENT;
                    patientModel.patientFname=row.PRENOM ||'-';
                    patientModel.patientLName=row.NOM ||'-';
                    patientModel.patientMigrationField=row.IDE_MEDTRAITANT;
                    patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;
                    patientModel.patientGender=0;
                    if(row.SEXE && row.SEXE==='F')
                        patientModel.patientGender=2;
                    if(row.SEXE && row.SEXE==='M')
                        patientModel.patientGender=1;

                    if(row.QUALITE && row.QUALITE===1714)//M
                        patientModel.patientTitle=1;
                    if(row.QUALITE && row.QUALITE===1715)//MLLE
                        patientModel.patientTitle=3;
                    if(row.QUALITE && row.QUALITE===1716)//MME
                        patientModel.patientTitle=2;

                    patientModel.patientBirthday=row.DATE_NAISSANCE;
                    patientModel.patientSocialNumber=row.NUMERO_SS;
                    patientModel.patientSocialKey=row.CLE_SS;
                    patientModel.patientAddress=row['Adresse.LIGNE1']+" ";
                    if(row['Adresse.LIGNE2'])
                        patientModel.patientAddress+=" "+row['Adresse.LIGNE2'];
                    patientModel.patientIns=row.NUMERO_INSC;
                    patientModel.patientInsKey=row.CLE_INSC;
                    patientModel.patientZipCode=row['Adresse.Commune.CODE_POSTAL'];
                    patientModel.active=true;

                        dataToCreate.push(patientModel);
                });
                return dbUtility.insertRecords(dataToCreate,"PATIENT",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save patients  was successful",
                            success: true,
                            msg: ''
                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migratePatient : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateMedecinTraitantForPatient: function (params, callback) {
        let dataToUpdate=[];
        dbUtility.read({limit:'no'}, "referring_physician")
            .then(function (rows) {
                callback(null, {
                    data: " migrateMedecinTraitantForPatient  was successful",
                    success: true,
                    msg: ''
                });

                rows.forEach(row=>{
                    let userModel={};
                    userModel.idName='patientMigrationField';
                    userModel.idValue=row.referringPhysicianMigrationId;
                    userModel.referringPhysicianId=row.referringPhysicianId;
                    dbUtility.saveRecord(userModel,'patient');
                });

            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateMedecinTraitantForPatient : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateStudiesType: function (params, callback) {
        let dataToCreate=[];
        dbUtilitySir5.read({limit:"no"},'GROUPE_EXAMEN','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyTypeId=row.IDE_GROUPE_EXAMEN;
                    siteGroupeModel.studyTypeCode=row.NOM;
                    siteGroupeModel.studyTypeName=row.NOM;
                    siteGroupeModel.studyCatId=1;
                    siteGroupeModel.active=true;
                    dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"STUDY_TYPE",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save study type was successful",
                            success: true,
                            msg: ''

                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateStudiesType : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateStudies: function (params, callback) {
        let dataToCreate=[];
        dbUtilitySir5.read({limit:"no"},'NOMENCLATURE','')
            .then(function (rows) {
                rows.forEach(row=>{

                    let siteGroupeModel={};
                    siteGroupeModel.studyId=row.IDE_NOMENCLATURE;
                    siteGroupeModel.studyMigrationId=row.IDE_NOMENCLATURE;
                    siteGroupeModel.studyTypeId=row.IDE_GROUPE_EXAMEN;
                    siteGroupeModel.studyCode=row.CODE;
                    siteGroupeModel.studyName=row.LIBELLE;
                    siteGroupeModel.studyDuration=0;
                    if(row.PRESENCE_RAD)
                        siteGroupeModel.studyRequireDoctor=row.PRESENCE_RAD;
                    if(row.TRACTUS_TECH)
                        siteGroupeModel.studyRequireTech=row.TRACTUS_TECH;

                    if(row.DOUBLE_FT)
                        siteGroupeModel.studyFtNumber=2;


                    siteGroupeModel.active=true;
                    if(!row.IDE_GROUPE_EXAMEN){
                        siteGroupeModel.studyTypeId=20086;

                    }
                    dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"STUDY",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save study was successful",
                            success: true,
                            msg: ''

                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateStudies : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateStudiesActe: function (params, callback) {
        let dataToCreate=[];
        dbUtilitySir5.read({limit:"no"},'NOMENCLATURE_CCAM','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyActeId=row.IDE_NOMEN_CCAM;
                    siteGroupeModel.studyId=row.IDE_NOMENCLATURE;
                    siteGroupeModel.studyActeCode=row.CODE_CCAM;
                    siteGroupeModel.studyActeType=1;//CCAM
                    siteGroupeModel.studyActeAmount=0;
                    siteGroupeModel.studyActeAmountDepassement=0;
                    siteGroupeModel.studyActeAssociationNonPrevu=row.CODE_ASSO_NON_PREV;
                    siteGroupeModel.studyActeQuantity=1;
                    siteGroupeModel.studyActeAdditionalAmount=0;
                    siteGroupeModel.studyActeCoefficient=1;
                    siteGroupeModel.studyActeMigrationId=row.IDE_NOMEN_CCAM;

                    /*siteGroupeModel.studyActeModificators=row.LIBELLE;
                    siteGroupeModel.studyActeDepense=row.LIBELLE;
                    siteGroupeModel.studyActeAcceptedModificators="";
                    siteGroupeModel.studyActeEntentePrealable=row.LIBELLE;
                    siteGroupeModel.studyActeRefundingCode=row.LIBELLE;
                    siteGroupeModel.studyActeExonerationParticuliere=row.LIBELLE;
                    siteGroupeModel.studyActeExtensionDocumentaire=row.LIBELLE;
                    siteGroupeModel.studyActeCodeGroupement=row.CODE;*/

                    siteGroupeModel.active=true;

                        dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"STUDY_ACTE",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save study acte was successful",
                            success: true,
                            msg: ''

                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateStudiesActe : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateMedecin: function (params, callback) {
        let dataToCreate=[];
        let mainTable = {};
        mainTable.tableName = "MEDECIN";
        mainTable.filters = [];
        let  joinArray= [{tableName: "ADRESSE",joinObject:{tableName: "COMMUNE"}}];
        dbUtilitySir5.joinQuery(mainTable, joinArray, "no")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.userId=uuid.v4();
                    userModel.referringPhysicianMigrationId=row.IDE_MEDECIN;
                    if(row.PRENOM)
                        userModel.referringPhysicianFName=row.PRENOM;
                    if(row.NOM)
                        userModel.referringPhysicianLName=row.NOM;

                    userModel.referringPhysicianSearch=row.NOM+" "+row.PRENOM;
                    userModel.referringPhysicianGender=0;
                    userModel.referringPhysicianTitle=0;
                    userModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                    userModel.referringPhysicianZipCode=row['Adresse.Commune.CODE_POSTAL'];
                    userModel.referringPhysicianAddress=row['Adresse.LIGNE1'];
                    userModel.active=true;
                    if(row.PRENOM && row.NOM)
                    dataToCreate.push(userModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"referring_physician",false);
                p1.then(function (insertId) {
                        callback(null, {
                            data: "save MEDECIN  was successful",
                            success: true,
                            msg: ''
                        });
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateCommune : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateDossiers:function(params,callback)
    {
        let promiseArray=[];
        for (let i = params.mind; i < params.maxd; i++) {
            promiseArray.push(Sir5Migration.migrateDossier({offset:i}));
        }
        let dt=new Date();
        let dtString=moment(dt).format("YYYYMMDD-h-mm-ss");
        if(promiseArray.length)
            Promise.all(promiseArray)
                .then(function (insertId) {
                    fs.writeFile('migration'+dtString+'.log', Sir5Migration.fileContent, (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                        Sir5Migration.fileContent="";
                    });
                   /* callback(null, {
                        data: "save visit  was successful",
                        success: true,
                        msg: ''
                    });*/
                }).catch(_err=>{
                fs.writeFile('migration.log', _err, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            });
        callback(null, {
            data: "save dossier was successful",
            success: true,
            msg: ''

        });
    },
    migrateDossier: function (params) {
        let rowDossier;
        let filtersDossier=[];
        let patientModel;
        filtersDossier.push({
            name:'DATE_ACCUEIL',value1:'2014-01-01',value2:'2014-12-31',compare:'between'
        });
        filtersDossier.push({
            name:'CODE_ANNULE',value:0,compare:'eq'
        });
        let order=[["DATE_ACCUEIL", "ASC"]];
       return dbUtilitySir5.read({limit:1,offset:params.offset,filters:filtersDossier,order:order},'DOSSIER','')
            .then(function (rows) {
                    if (rows.length) {
                        rowDossier = rows[0];
                        let filters = [{name: 'patientMigrationId', value: ""+rowDossier.IDE_PATIENT+""}];
                        return dbUtility.read({limit: 1, filters: filters,fieldsArray:['patientId']}, 'PATIENT');
                    }
                    else{
                        fs.writeFile('migration.log','Dossier not found \n' , (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                            return false;
                        });
                    }
                }
            )
                .then(_patientResultsArray=>{
                    if(_patientResultsArray && _patientResultsArray.length)
                    {
                        let patientObj=_patientResultsArray[0];
                        patientModel={};
                        patientModel.visitId=uuid.v4();
                        patientModel.siteId=rowDossier.IDE_SITE;
                        patientModel.patientId=patientObj.patientId;
                        patientModel.remplacantId=null;
                        patientModel.establishmentId=null;
                        patientModel.doctorId=1;
                        patientModel.visitDate=moment(new Date(rowDossier.DATE_ACCUEIL)).format('Y-M-D');
                        patientModel.visitTime=moment(new Date(rowDossier.DATE_ACCUEIL)).format('H')-1+":"+moment(new Date(rowDossier.DATE_ACCUEIL)).format('mm')+":00";
                        patientModel.visitIsBySocialCard=true;

                        patientModel.visitIsFree=false;
                        patientModel.visitIsHospitalized=false;
                        if(rowDossier.IDE_SERVICE_HOSP)
                            patientModel.visitIsHospitalized=true;

                        patientModel.visitIsUrgent=false;
                        if(rowDossier.CODE_URGENCE==1 ||rowDossier.CODE_URGENCE==0 )
                            patientModel.visitIsUrgent=true;



                        patientModel.visitHospitVisitNumber=rowDossier.NOM;
                        patientModel.visitIsDone=true;
                        patientModel.visitMigrationId=rowDossier.IDU_DOSSIER;
                        patientModel.visitCotationStatus=3;
                        patientModel.active=true;
                       // if(rowDossier.IDE_RADIOLOGUE)
                        //dataToCreate.push(patientModel);
                        return  dbUtility.saveRecord(patientModel,"VISIT",false);
                       // dbUtility.insertRecords(patientModel,"VISIT",false);

                    }
                    else{
                        Sir5Migration.fileContent+=rowDossier.IDE_PATIENT +' patient not found \r\n';
                        return false;

                    }
                })
           .then(_result=>{


               if(_result)
               {
                   let regoObj={};
                   regoObj.regoId=uuid.v4();
                   regoObj.visitId=patientModel.visitId;
                   regoObj.patientId=patientModel.patientId;
                   regoObj.regoCodeRegime='1';
                   regoObj.regoCodeCaisse='1';
                   regoObj.regoCodeCentre='1';


                   return dbUtility.saveRecord(regoObj,"REGO",false);
               }
               else
                   return false;

           })
           .then(_result=>{

               if(_result!==false)
               {
                   let visitBalanceObj={};
                   visitBalanceObj.visitBalanceId=uuid.v4();
                   visitBalanceObj.visitId=patientModel.visitId;

                   return dbUtility.saveRecord(visitBalanceObj,"VISIT_BALANCE",false);
           }
            else
        return false;



           })
           .then(_result=>{

                if(_result!==false)
                {
                    let worklistObj={};
                    worklistObj.worklistId=patientModel.visitId;
                    worklistObj.visitId=patientModel.visitId;
                    worklistObj.patientId=patientModel.patientId;
                    worklistObj.siteId=patientModel.siteId;
                    worklistObj.worklistDoctor=rowDossier.initialesMedecin;
                    if(rowDossier.statutCR>=4)
                        worklistObj.worklistLastCrStatus=3;
                    else
                        worklistObj.worklistLastCrStatus=2;

                    return dbUtility.saveRecord(worklistObj,"WORKLIST",false);
                }

           })
    },
    migrateExamen: function (params) {
        let dataToCreate=[];
        let visitId;
        return dbUtility.read({limit: 1,offset:params.offset,fieldsArray:['visitMigrationId','visitId']}, 'VISIT')
            .then(_visitRowsArray=>{
                let visitMigrationId=_visitRowsArray[0].visitMigrationId;
                 visitId=_visitRowsArray[0].visitId;
                let filtersExamen=[{name:'IDU_DOSSIER',value:visitMigrationId}];
                return dbUtilitySir5.read({filters:filtersExamen},'EXAMEN','')
            })
            .then(_rowsExamen=>{
                if(_rowsExamen && _rowsExamen.length)
                {
                    let dataToInsertArray= [];
                    _rowsExamen.forEach(_rowExamen=>{
                        let studyVisitObj={};
                        studyVisitObj.studyVisitId=uuid.v4();
                        studyVisitObj.studyVisitMigrationId=_rowExamen.IDU_EXAMEN;
                        studyVisitObj.visitMigrationId=_rowExamen.IDU_DOSSIER;
                        studyVisitObj.visitId=visitId;
                       // studyVisitObj.studyId=_rowExamen.IDE_NOMENCLATURE;
                       studyVisitObj.studyMigrationId=_rowExamen.IDE_NOMENCLATURE;
                        studyVisitObj.studyId=9999;
                        studyVisitObj.deviceId=1;//_rowExamen.IDE_APPAREIL;
                        studyVisitObj.userId=1;//_rowExamen.IDE_MANIP;
                        studyVisitObj.active=true;
                        dataToInsertArray.push(studyVisitObj);

                    }) ;
                    return dbUtility.insertRecords(dataToInsertArray,"STUDY_VISIT",false);

                }
                else return false;

            })
    },
    migrateExamen2: function (params) {

        let visitId;
        return dbUtility.read({limit: 1,offset:params.offset,fieldsArray:['visitMigrationId','studyMigrationId','visitId']}, 'STUDY_VISIT')
            .then(_studyVisitRowsArray=>{
                let studyVisitPromiseArray=[];

                _studyVisitRowsArray.forEach(_studyVisitObj=>{
                    visitId=_studyVisitObj.visitId;
                    let filtersArray=[{name:'IDE_NOMENCLATURE',value:_studyVisitObj.studyMigrationId}];
                    studyVisitPromiseArray.push(dbUtilitySir5.read({limit:"no",filters:filtersArray},'NOMENCLATURE',''))
                });
              return Promise.all(studyVisitPromiseArray);
            })
            .then(_resultsArray=>{
                if(_resultsArray && _resultsArray.length)
                {
                    let dataObj={};
                    dataObj.idName="visitId";
                    dataObj.idValue=visitId;
                    dataObj.worklistStudies="";

                    _resultsArray.forEach(_result=>{
                        if(_result.length)
                        {
                            dataObj.worklistStudies+="|"+_result[0].LIBELLE;
                        }
                    });
                    return dbUtility.saveRecord(dataObj,"WORKLIST");
                }
                else return false;

            })
    },
    migrateExamens:function(params,callback)
    {
        let promiseArray=[];
        for (let i = params.mind; i < params.maxd; i++) {
            promiseArray.push(Sir5Migration.migrateExamen({offset:i}));
        }
        if(promiseArray.length)
            Promise.all(promiseArray)
                .then(function (insertId) {
                    console.log('Examen migration was successful');
                }).catch(_err=>{
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            });
        callback(null, {
            data: "save Examen was successful",
            success: true,
            msg: ''

        });
    },
    migrateExamens2:function(params,callback)
    {
        let promiseArray=[];
        for (let i = params.mind; i < params.maxd; i++) {
            promiseArray.push(Sir5Migration.migrateExamen2({offset:i}));
        }
        if(promiseArray.length)
            Promise.all(promiseArray)
                .then(function (insertId) {
                    console.log('Examen migration was successful');
                }).catch(_err=>{
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            });
        callback(null, {
            data: "save Examen was successful",
            success: true,
            msg: ''

        });
    },
    migrateCrs:function(params,callback)
    {
        let promiseArray=[];
        Sir5Migration.fileContent="";
        let dt=new Date();
        let dtString=moment(dt).format("YYYYMMDD-h-mm-ss");
        for (let i = params.mind; i < params.maxd; i++) {
            promiseArray.push(Sir5Migration.migrateCr({offset:i,startDate:params.startDate,endDate:params.endDate}));
        }
        callback(null, {
            data: "save C.R was successful",
            success: true,
            msg: ''

        });

        if(promiseArray.length)
            Promise.all(promiseArray)
                .then(function (insertId) {
                    fs.writeFile('migrationReport'+dtString+'.log', Sir5Migration.fileContent, (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                        Sir5Migration.fileContent="";
                    });
                    console.log('C.R migration was successful');
                }).catch(_err=>{
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            });

    },
    migrateCr: function (params) {
        let visitId;
        let visitMigrationId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:params.startDate,value2:params.endDate,compare:'between'});
        return dbUtility.read({
            limit: 1,
            offset:params.offset,
            order:[["visitMigrationId", "ASC"]],
            fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT')
            .then(_visitRowsArray=>{
                 visitMigrationId=_visitRowsArray[0].visitMigrationId;
                visitId=_visitRowsArray[0].visitId;
                let filtersExamen=[{name:'IDU_DOSSIER',value:visitMigrationId},{name:"IDE_TYPE_DOCUMENT",value:1}];
                return dbUtilitySir5.read({filters:filtersExamen},'DOCUMENT','');
            })
            .then(_rowsExamen=>{
                if(_rowsExamen && _rowsExamen.length)
                {
                    let newMap=new Map();

                    _rowsExamen.forEach(_rowDocument=>{
                        if(newMap.get(_rowDocument.IDE_DOCUMENT_SOURCE)){
                            let existingElement=newMap.get(_rowDocument.IDE_DOCUMENT_SOURCE);
                            if(_rowDocument.Version>existingElement.Version){
                                newMap.set(_rowDocument.IDE_DOCUMENT_SOURCE,_rowDocument);
                                Sir5Migration.fileContent+=_rowDocument.IDE_DOCUMENT_SOURCE +' compte rendu multi-version \r\n';
                            }

                        }
                        else {
                            newMap.set(_rowDocument.IDE_DOCUMENT_SOURCE,_rowDocument);
                        }


                    });

                    let dataToInsertArray= [];
                    newMap.forEach(function(_rowDocument, _key) {

                        let reportObj={};
                        reportObj.reportId=uuid.v4();
                        reportObj.visitMigrationId=_rowDocument.IDU_DOSSIER;
                        reportObj.reportMigrationId=_rowDocument.IDE_DOCUMENT;
                       // reportObj.studyId=_rowDocument.IDU_EXAMEN;
                        reportObj.studyId=9999;
                        reportObj.doctorId=1;
                        reportObj.visitId=visitId;
                        reportObj.reportName="";
                        let pathArray=(_rowDocument.CHEMINDOC).split("\\");
                        //console.log(pathArray);
                        let docDossier=pathArray[4];
                        let docName=pathArray[pathArray.length-1];
                        docName=docName.replace('.doc','.txt');
                        reportObj.reportPath="migrated/"+docDossier+"/"+docName;
                        reportObj.reportHtmlPath=reportObj.reportPath;
                        reportObj.reportContentIsHtml=false;
                        reportObj.reportDate=_rowDocument.DATE_CREATION;
                        reportObj.reportStatus=5;
                        reportObj.active=true;
                        dataToInsertArray.push(reportObj);
                    });

                    return dbUtility.insertRecords(dataToInsertArray,"REPORT",false);
                }
                else{
                    Sir5Migration.fileContent+=visitMigrationId +' visitId has not report found \r\n';
                    return false;
                }
            })
    },
};
module.exports = Sir5Migration;