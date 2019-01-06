const fs = require('fs');
var unrtf = require('unrtf');
let dbUtilityMedris=require('../common/DbUtilityMedris'); //TODO uncomment to do medris migration
let dbUtility=require('../common/DbUtility');
let smartMeDbName='_migrate';
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let MedRisMigration = {
    fileContent:"",
    migrateCommune: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray},'VILLE_CP','')
            .then(function (rows) {
                rows.forEach(row=>{
                    if(row.ville){
                        let siteGroupeModel={};
                        siteGroupeModel.cityId=row.idVilleCp;
                        siteGroupeModel.depId=row.	departement||'01';
                        siteGroupeModel.cityName=row.ville;
                        siteGroupeModel.cityZipCode=row.codePostal;
                        siteGroupeModel.cityMigrationId=row.idVilleCp;
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
        let siteGroupeModel={};
        siteGroupeModel.siteGroupId=1;
        siteGroupeModel.siteGroupMigrationId=1;
        siteGroupeModel.siteGroupName="Centre Radiologie";
        siteGroupeModel.active=true;
        siteGroupeModel.added=true;
        dataToCreate.push(siteGroupeModel);

               dbUtility.insertRecords(dataToCreate,"SITE_GROUP",false)
                    .then(function (insertId) {
                        callback(null, {
                            data: "save site group was successful",
                            success: true,
                            msg: ''

                        });
                    })

            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateSite : " + error);
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
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray}, "SITE")
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteModel={};
                    let siteConfigModel={};
                    siteModel.siteId=row.idSite;
                    siteModel.siteGroupId=1;
                    siteModel.siteName=row.designationSite;
                    siteModel.siteCode=row.nomSite;
                    siteModel.siteMigrationId=row.idSite;

                    siteModel.siteAddress1=row.adresse1Site;
                    siteModel.siteAddress2=row.adresse2Site;
                    siteModel.siteZipCode=row.codePostalSite;
                   /* siteModel.siteCityId=row['Adresse.Commune.IDE_COMMUNE'];
                    siteModel.cityMigrationId=row['Adresse.Commune.IDE_COMMUNE'];*/
                    siteModel.active=true;


                    siteConfigModel.siteConfigId=row.idSite;
                    siteConfigModel.siteId=row.idSite;
                    siteConfigModel.siteConfigStartHour="07:00:00";
                    siteConfigModel.siteConfigEndHour="20:00:00";


                    siteConfigModel.siteConfigPyxMode="GD";
                    siteConfigModel.siteConfigFseIsChecked=true;

                    siteConfigModel.siteConfigNchApiPath="C:/nchapi/nchapi.exe";
                    siteConfigModel.siteConfigPyxPath="C:/pyxvital/Pyxvital.exe";
                    siteConfigModel.siteConfigPyxirisPath="C:/pyxvital/Pyxiris.exe";
                    siteConfigModel.siteConfigPyxPort=50;
                    siteConfigModel.siteConfigPyxirisPort=60;
                    siteConfigModel.siteConfigPyxNodePort=1000;
                    siteConfigModel.siteConfigTranscriptionPath="C:/Program Files (x86)/NCH Software/Scribe/scribe.exe";
                    siteConfigModel.siteConfigAmoDefault=true;
                    siteConfigModel.siteConfigAmcDefault=false;
                    siteConfigModel.siteConfigPdsMandatory=true;
                    siteConfigModel.siteConfigCotFerieAuto=true;
                    siteConfigModel.siteConfigCotUrgenceAuto=true;
                    siteConfigModel.siteConfigCotEnfantAuto=true;
                    siteConfigModel.siteConfigCotNuitAuto=true;
                    siteConfigModel.siteConfigCotNuitHeureDebut="23:00:00";
                    siteConfigModel.siteConfigCotNuitHeureFin="05:00:00";
                    siteConfigModel.siteConfigCotSupplementAuto=true;
                    siteConfigModel.siteConfigStartTP="2017-01-01";
                    siteConfigModel.siteConfigEndTP="2040-01-01";

                    siteConfigModel.active=true;
                    dataToCreate.push(siteModel);
                    dataConfigToCreate.push(siteConfigModel);
				});
                let p1=dbUtility.insertRecords(dataToCreate,"SITE",false);
                let p2=dbUtility.insertRecords(dataConfigToCreate,"SITE_CONFIG",false);

                return Promise.all([p1,p2])
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

                console.error("Error MedrisMigration.js => Function migrateSite : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateMedecin: function (params, callback) {
        let dataToCreate=[];
        let dataUserToCreate=[];
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray}, "medecin")
            .then(function (rows) {
                rows.forEach(row=>{
                        let userModel={};
                        let doctorModel={};
                        userModel.userId=row.idMedecin;
                        doctorModel.userId=row.idMedecin;
                        //userModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                        userModel.userCatId=3;
                        userModel.userFName=row.prenomMedecin;
                        userModel.userLName=row.nomMedecin;
                        userModel.userInitiales=row.initialesMedecin;
                         userModel.userLogin=row.initialesMedecin;
                        userModel.userPass=row.initialesMedecin;
                        userModel.userZipCode=row.codePostalMedecin;
                        userModel.userAddress=row.adresse1Medecin+ " "+row.adresse2Medecin;
                        userModel.userMigrationId=row.idMedecin;
                        userModel.active=true;


                        doctorModel.active=true;
                        doctorModel.doctorId=row.idMedecin;
                        doctorModel.doctorParametresAcs=1;
                        doctorModel.doctorContratTarifaire=1;

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
                            data: "save Medecins  was successful",
                            success: true,
                            msg: ''
                        });
                    })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMedecin : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateMaterielType: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray}, "materiel_type")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.deviceTypeId=row.idMaterielType;
                    userModel.deviceTypeName=row.designationMaterielType;
                    userModel.deviceTypeCode=row.designationMaterielType;
                    userModel.deviceTypeMigrationId=row.idMaterielType;
                    userModel.active=true;
                    dataToCreate.push(userModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"device_type",false);
                p1.then(function (insertId) {
                    callback(null, {
                        data: "save device_type  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMaterielType : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateMateriel: function (params, callback) {
        let dataToCreate=[];
       // let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no"}, "materiel")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.deviceId=row.idMateriel;
                    userModel.modalityId=1;
                    userModel.siteId=row.idSite;
                    if(row.idMaterielType)
                        userModel.deviceTypeId=row.idMaterielType;
                    else
                        userModel.deviceTypeId=1;

                    userModel.deviceName=row.codeMateriel;
                    userModel.deviceModel=row.modeleMateriel;
                    userModel.deviceAET=row.AETMateriel;

                    if(row.dateAgrement==="0000-00-00")
                        userModel.deviceAgreementDate=null;
                    else
                        userModel.deviceAgreementDate=row.dateAgrement;

                    if(row.dateInstallation==="0000-00-00")
                        userModel.deviceInstallationDate=null;
                    else
                        userModel.deviceInstallationDate=row.dateInstallation;


                    userModel.deviceAgreementNumber=row.numeroAgrement;

                    userModel.deviceTrademark=row.marqueMateriel;
                    userModel.devicePower=row.puissance;

                    userModel.deviceMigrationId=row.idMateriel;
                    userModel.active=true;
                    if(row.DEL==1)
                        userModel.active=false;
                    dataToCreate.push(userModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"device",false);
                p1.then(function (insertId) {
                    callback(null, {
                        data: "save device  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMaterielType : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateCorrespondant: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray}, "correspondant")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.referringPhysicianId=uuid.v4();
                    userModel.referringPhysicianMigrationId=row.idCorrespondant;
                    userModel.referringPhysicianFName=row.prenomCorrespondant;
                    if( userModel.referringPhysicianFName)
                    {
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?Ü',"é");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?¥',"ç");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?ö',"ë");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('ã©',"é");

                    }
                    userModel.referringPhysicianLName=row.nomCorrespondant;
                    userModel.referringPhysicianSearch=userModel.referringPhysicianLName +" "+userModel.referringPhysicianFName;
                    userModel.referringPhysicianPhoneNumber=row.telephoneCorrespondant;
                    if(!userModel.referringPhysicianPhoneNumber)
                        userModel.referringPhysicianPhoneNumber=row.portableCorrespondant;

                    userModel.referringPhysicianFaxNumber=row.faxCorrespondant;
                    userModel.referringPhysicianEmail=row.emailCorrespondant;
                   // userModel.referringPhysicianEmail=row.politesseCorrespondant;

                    userModel.referringPhysicianGender=0;

                    userModel.referringPhysicianTitle=0;
                    userModel.cityId=0;
                    userModel.referringPhysicianZipCode=row.codePostalCorrespondant;
                     userModel.referringPhysicianAddress=row.adresse1Correspondant;
                     if(row.adresse2Correspondant)
                         userModel.referringPhysicianAddress+=" "+row.adresse2Correspondant;

                    userModel.active=true;
                    if(userModel.referringPhysicianFName && userModel.referringPhysicianLName)
                        dataToCreate.push(userModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"referring_physician",false);
                p1.then(function (insertId) {
                    callback(null, {
                        data: "save Correspondant  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCorrespondant : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateCityIdForCorrespondant: function (params, callback) {
        let dataToCreate=[];
        let promiseArray=[];
        dbUtility.read({limit:"no"}, "city")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};

                    userModel.idName='referringPhysicianZipCode';
                    userModel.idValue=row.cityZipCode;
                    userModel.cityId=row.cityId;
                    promiseArray.push(dbUtility.saveRecord(userModel,'referring_physician'));
                });
                let p1=Promise.all(promiseArray);
                p1.then(function (insertId) {
                    callback(null, {
                        data: " migrateCityIdForCorrespondant  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCityIdForCorrespondant : " + error);
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
        dbUtilityMedris.joinQuery(mainTable, joinArray, params.limit,true,"",params.offset)
            .then(function (rows) {
                rows.forEach(row=>{
                    dbUtility.read({filters:[{name:"patientMigrationId",value:row.IDE_PATIENT}]},"patient",smartMeDbName)
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
                                //patientModel.referringPhysicianId=1;
                                patientModel.patientMigrationId=row.IDE_PATIENT;
                                patientModel.patientFname=row.PRENOM;
                                patientModel.patientLName=row.NOM;
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

                                dbUtility.insertRecords([patientModel],"PATIENT",false,smartMeDbName)
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
        mainTable.filters = [{name:"DEL",value:0}];
        mainTable.order=[["idPatient", "ASC"]];

        let  joinArray= [{tableName: "coordonnee",required:false}];

        dbUtilityMedris.joinQuery(mainTable, joinArray, params.limit,true,"",params.offset)
            .then(function (rows) {
                rows.forEach(row=>{
                    let patientModel={};
                    patientModel.patientId=uuid.v4();
                    patientModel.cityId=0;
                    patientModel.patientMigrationField=row.idCorrespondant;
                    //patientModel.referringPhysicianId=1;
                    patientModel.patientMigrationId=row.idPatient;
                    patientModel.patientFname=row.prenomPatient;
                    patientModel.patientLName=row.nomPatient;
                    patientModel.patientPacsId=row.idPatient;
                    patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;

                    patientModel.patientGender=0;
                    if(row.sexePatient && row.sexePatient==='1')
                        patientModel.patientGender=2;
                    if(row.sexePatient && row.sexePatient==='2')
                        patientModel.patientGender=1;

                    if(row.civilitePatient && row.civilitePatient==="3")//M
                        patientModel.patientTitle=1;
                    if(row.civilitePatient && row.civilitePatient==="2")//MLLE
                        patientModel.patientTitle=3;
                    if(row.civilitePatient && row.civilitePatient==="1")//MME
                        patientModel.patientTitle=2;
                    if(row.civilitePatient && row.civilitePatient==="4")//MME
                        patientModel.patientTitle=4;


                    if(row.dateNaissance!="0000-00-00")
                         patientModel.patientBirthday=row.dateNaissance;
                    else
                        patientModel.patientBirthday='1900-01-01';

                    patientModel.patientSocialNumber=row.numSSPatient;
                    patientModel.patientSocialKey=row.cleSSPatient;

                    patientModel.patientAddress=row['Coordonnee.adresse1']+" ";
                    if(row['Coordonnee.adresse2'])
                        patientModel.patientAddress+=" "+row['Coordonnee.adresse2'];

                    patientModel.patientIns=row.INS_C;
                    patientModel.patientInsKey=row.cleINS_C;
                    patientModel.patientPhoneNumber=row['Coordonnee.telephone'];
                    patientModel.patientMobileNumber=row['Coordonnee.portable'];
                    patientModel.patientEmail=row['Coordonnee.mail'];
                    patientModel.patientFaxNumber=row['Coordonnee.fax'];
                    patientModel.patientZipCode=row['Coordonnee.codePostal'];
                    patientModel.patientAllergies=row.alergiePatient;
                    patientModel.active=true;
                    if(patientModel.patientFname && patientModel.patientFname)
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

    migrateCorrespondantIdForPatient: function (params, callback) {
        let dataToCreate=[];
        let promiseArray=[];
        dbUtility.read({limit:"no"}, "referring_physician")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.idName='patientMigrationField';
                    userModel.idValue=row.referringPhysicianMigrationId;
                    userModel.referringPhysicianId=row.referringPhysicianId;
                    promiseArray.push(dbUtility.saveRecord(userModel,'patient'));
                });
                callback(null, {
                    data: " migrateCorrespondantIdForPatient  was successful",
                    success: true,
                    msg: ''
                });
                let p1=Promise.all(promiseArray);
                p1.then(function (insertId) {
                    callback(null, {
                        data: " migrateCorrespondantIdForPatient  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCorrespondantIdForPatient : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateStudiesType: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[];
        dbUtilityMedris.read({limit:"no",filters:filtersArray},'examen_type')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyTypeId=row.idExamenType;
                    siteGroupeModel.studyTypeCode=row.codeExamenType;
                    siteGroupeModel.studyTypeName=row.designationExamenType;

                    siteGroupeModel.studyCatId=5;//radio
                    if(row.niveauExamenType===2)
                         siteGroupeModel.studyCatId=5;//radio
                    if(row.niveauExamenType===5)
                        siteGroupeModel.studyCatId=1;//echo
                    if(row.idExamenType===16)
                        siteGroupeModel.studyCatId=4; // mammo


                    if(row.DEL==0)
                        siteGroupeModel.deletedAt="2010-10-10";
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
                console.error("Error MedMigration.js => Function migrateStudiesType : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateStudies: function (params, callback) {
        let dataToCreate=[];

        dbUtilityMedris.read({limit:"no"},'EXAMEN','')
            .then(function (rows) {
                rows.forEach(row=>{

                    let siteGroupeModel={};
                    siteGroupeModel.studyId=row.idExamen;
                    siteGroupeModel.studyMigrationId=row.idExamen;
                    siteGroupeModel.studyTypeId=row.idExamenType;
                    siteGroupeModel.studyCode=row.codeExamen;
                    siteGroupeModel.studyName=row.designationExamen;
                    siteGroupeModel.studyDuration=0;
                    siteGroupeModel.studyRequireDoctor=false;
                    siteGroupeModel.studyRequireTech=true;
                    siteGroupeModel.active=true;
                    if(row.DEL==0)
                        siteGroupeModel.deletedAt="2010-10-10";
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
                console.error("Error MedRisMigration.js => Function migrateStudies : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateStudiesActe: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"DEL",value:0}];
        dbUtilityMedris.read({limit:"no",filters:filtersArray},'examen_cotation','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyActeId=row.idExamenCotation;
                    siteGroupeModel.studyId=row.idExamen;
                    siteGroupeModel.studyActeCode=row.CODE_ACTE;
                    siteGroupeModel.studyActeType=1;//CCAM
                    siteGroupeModel.studyActeAmount=0;
                    siteGroupeModel.studyActeAmountDepassement=row.montantDepassement;
                    siteGroupeModel.studyActeAssociationNonPrevu=row.PIX_ACT_ANP;
                    siteGroupeModel.studyActeQuantity=1;
                    siteGroupeModel.studyActeAdditionalAmount=row.montantDepassement;
                    siteGroupeModel.studyActeCoefficient=1;
                    siteGroupeModel.studyActeMigrationId=row.idExamenCotation;

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


    migrateDossiers:function(params,callback)
    {
        let promiseArray=[];
        for (let i = params.mind; i < params.maxd; i++) {
            params.offset=i;
            promiseArray.push(MedRisMigration.migrateDossier(params));
        }
        let dt=new Date();
        let dtString=moment(dt).format("YYYYMMDD-h-mm-ss");
        if(promiseArray.length)
            Promise.all(promiseArray)
                .then(function (insertId) {
                    fs.writeFile('migration'+dtString+'.log', MedRisMigration.fileContent, (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                        MedRisMigration.fileContent="";
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
        let dataToCreate=[];
        let rowDossier;
        let patientModel={};
        let filtersDossier=[];

        filtersDossier.push({
            name:'DEL',value:0
        });

        filtersDossier.push({name:'dateDossier',value1:params.startDate,value2:params.endDate,compare:'between'});

       return dbUtilityMedris.read({limit:1,offset:params.offset,filters:filtersDossier},'DOSSIER','')
            .then(function (rows) {
                    if (rows.length) {
                        rowDossier = rows[0];
                        let filters = [{name: 'patientMigrationId', value: ""+rowDossier.idPatient+""}];

                        return dbUtility.read({limit: 1, filters: filters,fieldsArray:['patientId']}, 'PATIENT')
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

                        patientModel.visitId=uuid.v4();
                        patientModel.siteId=rowDossier.idSite;
                        patientModel.patientId=patientObj.patientId;
                        patientModel.remplacantId=null;
                        patientModel.establishmentId=null;
                        patientModel.visitInvoiceType=2;
                        patientModel.doctorId=rowDossier.idMedecin;
                        patientModel.visitDate=moment(new Date(rowDossier.dateDossier)).format('Y-M-D');
                        patientModel.visitTime=rowDossier.heureDossier;
                       if(rowDossier.arriveeDossier==="1" || rowDossier.arriveeDossier===1)
                              patientModel.visitIsBySocialCard=true;
                       else
                           patientModel.visitIsBySocialCard=false;

                       if(rowDossier.boolGratuit)
                            patientModel.visitIsFree=true;
                       else
                           patientModel.visitIsFree=false;

                       patientModel.visitIsHospitalized=false;
                        if(rowDossier.idEtablissementHospit)
                            patientModel.visitIsHospitalized=true;


                       if(rowDossier.boolUrgence)
                        patientModel.visitIsUrgent=true;
                       else
                           patientModel.visitIsUrgent=false;



                        patientModel.visitHospitVisitNumber=0;
                        patientModel.visitIsDone=false;
                        if(rowDossier.statutDossier==3)
                            patientModel.visitIsDone=true;

                        patientModel.visitMigrationId=rowDossier.idDossier;

                        patientModel.visitCotationStatus=rowDossier.statutCotation;
                        patientModel.visitMigrationField1=rowDossier.idCorrespondantMT;
                        patientModel.visitMigrationField2=rowDossier.idCorrespondant2;

                        patientModel.visitIsAmo=false;
                        if(rowDossier.TPAMO)
                            patientModel.visitIsAmo=true;

                        patientModel.visitIsAmc=false;
                        if(rowDossier.TPAMC)
                            patientModel.visitIsAmc=true;

                        patientModel.active=true;


                        dataToCreate.push(patientModel);
                        return dbUtility.insertRecords(dataToCreate,"VISIT",false);


                    }
                    else{
                        MedRisMigration.fileContent+=rowDossier.idPatient +' patient not found \r\n';
                        return true;

                    }
                })
           .then(_result=>{


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

               dbUtility.insertRecords([worklistObj],"WORKLIST",false);
           })
    },


    migrateExamen: function (params) {
        let dataToCreate=[];
        let visitId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:params.startDate,value2:params.endDate,compare:'between'});
        return dbUtility.read({limit: 1,offset:params.offset,fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT')
            .then(_visitRowsArray=>{
                if(_visitRowsArray.length)
                {
                    let visitMigrationId=_visitRowsArray[0].visitMigrationId;
                    visitId=_visitRowsArray[0].visitId;
                    let filtersExamen=[{name:'idDossier',value:parseInt(visitMigrationId)},{name:'DEL',value:0}];
                    /*return dbUtilityMedris.read({filters:filtersExamen},'dossier_examen','')*/

                    let mainTableObject={tableName:'dossier_examen',filters:filtersExamen};
                    let joinTablesArray=[];
                    joinTablesArray.push({tableName:'examen',fieldsArray:['codeExamen','designationExamen']});

                    return  dbUtilityMedris.joinQuery(mainTableObject,joinTablesArray,'no');
                }
                else return false;


            })
            .then(_rowsExamen=>{
                if(_rowsExamen)
                {
                    if(_rowsExamen && _rowsExamen.length)
                    {
                        let dataToInsertArray= [];
                        let promiseArray=[];
                        let examenCode="";
                        let i=0;
                        _rowsExamen.forEach(_rowExamen=>{
                            i++;
                            let studyVisitObj={};
                            studyVisitObj.studyVisitId=uuid.v4();
                            studyVisitObj.studyVisitMigrationId=_rowExamen.idDossierExamen;
                            studyVisitObj.visitMigrationId=_rowExamen.idDossier;
                            studyVisitObj.visitId=visitId;
                            studyVisitObj.studyId=_rowExamen.idExamen;
                            if(_rowExamen.idMateriel)
                                studyVisitObj.deviceId=_rowExamen.idMateriel;
                            else
                                studyVisitObj.deviceId=1;

                            studyVisitObj.userId=null;
                            studyVisitObj.active=true;

                            examenCode+= _rowExamen['Examen.codeExamen'];
                            if(i<_rowsExamen.length)
                                examenCode+="|";

                            dataToInsertArray.push(studyVisitObj);


                        }) ;
                        promiseArray.push(dbUtility.insertRecords(dataToInsertArray,"STUDY_VISIT",false));
                        let worklistParam={};
                        worklistParam.idName='visitId';
                        worklistParam.idValue=visitId;
                        worklistParam.worklistStudies=examenCode;


                        promiseArray.push( dbUtility.saveRecord(worklistParam,'WORKLIST'));
                        return Promise.all(promiseArray);


                    }
                    else return false;
                }


            })
            .catch(_err=>{
                console.log(_err)
            })
    },
    migrateExamens: async function(params,callback)
    {


        let promiseArray=[];
        callback(null, {
            data: "save Examen was successful",
            success: true,
            msg: ''

        });
        for (let i = params.mind; i < params.maxd; i++) {
            params.offset=i;
            await MedRisMigration.migrateExamen(params);
        }


    },

    migrateCrs: async function(params,callback)
    {
        callback(null, {
            data: "save C.R was successful",
            success: true,
            msg: ''

        });
        for (let i = params.mind; i < params.maxd; i++) {
            params.offset=i;
            await MedRisMigration.migrateCr(params);
        }
    },
    migrateCr: function (params) {
        let visitId;
        let visitMigrationId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:params.startDate,value2:params.endDate,compare:'between'});


        return dbUtility.read({
            limit: 1,
            offset:params.offset,
            fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT')
            .then(_visitRowsArray=>{
                if(_visitRowsArray.length)
                {
                    visitMigrationId=_visitRowsArray[0].visitMigrationId;
                    visitId=_visitRowsArray[0].visitId;
                    let filtersExamen=[{name:'idDossier',value:visitMigrationId},{name:"DEL",value:0}];

                    return dbUtilityMedris.read({filters:filtersExamen},'dossier_compte_rendu','');
                }
                else
                    return false;

            })
            .then(_rowsExamen=>{
                if(_rowsExamen && _rowsExamen.length)
                {
                    let dataToInsertArray= [];
                    _rowsExamen.forEach(function(_rowCr) {
                        let reportObj={};
                        reportObj.reportId=uuid.v4();
                        reportObj.visitMigrationId=_rowCr.idDossier;
                        reportObj.reportMigrationId=_rowCr.idDossierCR;
                        reportObj.studyId=_rowCr.idExamen;
                        reportObj.doctorId=1;
                        reportObj.visitId=visitId;
                        reportObj.reportName=_rowCr.libelleCR;
                        let pathArray=(_rowCr.pathDocument).split("/");
                        let docDossier=pathArray[1];
                        let docName=pathArray[pathArray.length-1];
                        docName=docName.replace('.rtf','.txt');
                        //console.log(pathArray);
                        reportObj.reportPath="migrated/"+docDossier+"/"+docName;
                        reportObj.reportHtmlPath=reportObj.reportPath;
                        reportObj.reportContentIsHtml=false;
                        reportObj.reportDate=_rowCr.dateDossierCR;
                        if(_rowCr.statutCR>=4)
                            reportObj.reportStatus=5; // approved
                        else if(_rowCr.statutCR==3)
                            reportObj.reportStatus=7;//7- report  to review
                        else{
                            reportObj.reportStatus=2;// waiting for validation
                        }

                        reportObj.active=true;
                        dataToInsertArray.push(reportObj);
                    });

                    return dbUtility.insertRecords(dataToInsertArray,"REPORT",false);
                }
                else{
                    MedRisMigration.fileContent+=visitMigrationId +' visitId has not report found \r\n';
                    return false;
                }
            })
    }
};
module.exports = MedRisMigration;