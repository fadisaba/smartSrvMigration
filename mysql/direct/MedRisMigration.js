const fs = require('fs');
var unrtf = require('unrtf');
let dbUtilityMedris=require('../common/DbUtilityMedris'); //TODO uncomment to do medris migration
let dbUtility=require('../common/DbUtility');
let smartMeDbName='_migrate';
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let MedRisMigration = {
    fileContent:"",
    migrateCommune: function () {
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
                     console.log('save COMMUNE  was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migrateCommune : " + error);
            })
    },
    migrateGroupeSite: function () {
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
                      console.log("save site group was successful");
                    })

            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateSite : " + error);
            })
    },
    migrateSite: function () {

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
                       console.log('save site was successful');
                    })
            })
            .then(function (rows) {
                // on regarde s'il y a des blob (Buffer) on les converti en string

            })
            .catch(function (error) {

                console.error("Error MedrisMigration.js => Function migrateSite : " + error);
            })
    },
    migrateMedecin: function () {
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
                        console.log('doctor saved succesfully')
                    })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMedecin : " + error);
            })
    },
    migrateMaterielType: function () {
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
                 console.log('save device_type  was successful');
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMaterielType : " + error);
            })
    },

    migrateMateriel: function () {
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
                 console.log('save device  was successful')
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateMaterielType : " + error);
            })
    },

    migrateCorrespondant: function () {
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
                console.log('save Correspondant  was successful');
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCorrespondant : " + error);
            });
    },

    migrateCityIdForCorrespondant: function () {
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
                 console.log('migrateCityIdForCorrespondant  was successful');
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCityIdForCorrespondant : " + error);
            })
    },
    migratePatientDelta: function () {
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
            })
    },
    migratePatient: function (_limit,_offset) {
        let dataToCreate=[];
        let mainTable = {};
        mainTable.tableName = "PATIENT";
        mainTable.filters = [{name:"DEL",value:0}];
        mainTable.order=[["idPatient", "ASC"]];

        let  joinArray= [{tableName: "coordonnee",required:false}];

        dbUtilityMedris.joinQuery(mainTable, joinArray, _limit,true,"",_offset)
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
                        console.log('save patients  was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error Sir5Migration.js => Function migratePatient : " + error);
            })
    },

    migrateCorrespondantIdForPatient: function () {
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

                let p1=Promise.all(promiseArray);
                p1.then(function (insertId) {
                  console.log('migrateCorrespondantIdForPatient  was successful')
                })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateCorrespondantIdForPatient : " + error);
            })
    },

    migrateStudiesType: function () {
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
                      console.log('save study type was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error MedMigration.js => Function migrateStudiesType : " + error);
            })
    },
    migrateStudies: function () {
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
                      console.log('save study was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error MedRisMigration.js => Function migrateStudies : " + error);
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


    migrateDossiers:async function(mind,maxd,startDate,endDate)
    {
        let promiseArray=[];
        for (let i = mind; i < maxd; i++) {
            let  offset=i;
            let result= await MedRisMigration.migrateDossier(startDate,endDate,offset);
        }
        console.log('migration dossier du '+mind+ ' à '+maxd +'termine pour la durée'+startDate + 'à '+ endDate);
        let dt=new Date();
        let dtString=moment(dt).format("YYYYMMDD-h-mm-ss");

        fs.writeFile('migration'+dtString+'.log', MedRisMigration.fileContent, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            MedRisMigration.fileContent="";
        });
    },
    migrateDossier: async function (startDate,endDate,offset) {
        let dataToCreate=[];
        let rowDossier;
        let patientModel={};
        let filtersDossier=[];
        filtersDossier.push({
            name:'DEL',value:0
        });
        filtersDossier.push({name:'dateDossier',value1:startDate,value2:endDate,compare:'between'});

       let  rowsMedRIS= await  dbUtilityMedris.read({limit:1,offset:offset,filters:filtersDossier},'DOSSIER','');

        if (rowsMedRIS.length) {
            rowDossier = rowsMedRIS[0];
            let filters = [{name: 'patientMigrationId', value: ""+rowDossier.idPatient+""}];

            let _patientResultsArray= await dbUtility.read({limit: 1, filters: filters,fieldsArray:['patientId']}, 'PATIENT');

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
                let visit=  await dbUtility.insertRecords(dataToCreate,"VISIT",false);


                let regoObj = {};
                regoObj.regoId = uuid.v4();
                regoObj.visitId = patientModel.visitId;
                regoObj.patientId = patientModel.patientId;
                regoObj.regoCodeRegime = '1';
                regoObj.regoCodeCaisse = '1';
                regoObj.regoCodeCentre = '1';


                let rego = await  dbUtility.saveRecord(regoObj,"REGO",false);


                let visitBalanceObj={};
                visitBalanceObj.visitBalanceId=uuid.v4();
                visitBalanceObj.visitId=patientModel.visitId;
                let visitBalance= dbUtility.saveRecord(visitBalanceObj,"VISIT_BALANCE",false);


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

                let worklist = dbUtility.insertRecords([worklistObj],"WORKLIST",false);

                return worklist;
            }
            else{
                MedRisMigration.fileContent+=rowDossier.idPatient +' patient not found in SMARTMED \r\n';
                return true;

            }
        }
        else {
            fs.writeFile('migration.log', 'Dossier not found \n', (err) => {
                if (err) throw err;
                console.log('The file has been saved!');

            })
        }
    },


    migrateExamen: async function (mind,maxd,offset,startDate,endDate) {
        let dataToCreate=[];
        let visitId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:startDate,value2:endDate,compare:'between'});
        let _visitRowsArray=await dbUtility.read({limit: 1,offset:offset,fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT')
        if(_visitRowsArray.length)
        {
            let visitMigrationId=_visitRowsArray[0].visitMigrationId;
            visitId=_visitRowsArray[0].visitId;
            let filtersExamen=[{name:'idDossier',value:parseInt(visitMigrationId)},{name:'DEL',value:0}];

            let mainTableObject={tableName:'dossier_examen',filters:filtersExamen};
            let joinTablesArray=[];
            joinTablesArray.push({tableName:'examen',fieldsArray:['codeExamen','designationExamen']});

             let _rowsExamen= await dbUtilityMedris.joinQuery(mainTableObject,joinTablesArray,'no');
            if(_rowsExamen)
            {
                if(_rowsExamen && _rowsExamen.length)
                {
                    let examenCode="";
                    let i=0;
                    _rowsExamen.forEach(_rowExamen=>{
                        i++;
                        examenCode+= _rowExamen['Examen.codeExamen'];
                        if(i<_rowsExamen.length)
                            examenCode+="|";
                    }) ;
                     let worklistParam={};
                    worklistParam.idName='visitId';
                    worklistParam.idValue=visitId;
                    worklistParam.worklistStudies=examenCode;
                   let saveWorklist= await dbUtility.saveRecord(worklistParam,'WORKLIST');
                   return saveWorklist;

                }
                else return false;
            }
        }
        else return false;


    },
    migrateExamens: async function(mind,maxd,startDate,endDate)
    {

        for (let i = mind; i < maxd; i++) {
            let offset=i;
            await MedRisMigration.migrateExamen(mind,maxd,offset,startDate,endDate);
        }


    },

    migrateCrs: async function(mind,maxd,startDate,endDate)
    {
        for (let i = mind; i < maxd; i++) {
            let offset=i;
            await MedRisMigration.migrateCr(mind,maxd,offset,startDate,endDate);
        }
    },
    migrateCr: async function (mind,maxd,offset,startDate,endDate) {
        let visitId;
        let visitMigrationId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:startDate,value2:endDate,compare:'between'});


        let _visitRowsArray= await dbUtility.read({
            limit: 1,
            offset:offset,
            fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT');
        if(_visitRowsArray.length)
        {
            visitMigrationId=_visitRowsArray[0].visitMigrationId;
            visitId=_visitRowsArray[0].visitId;
            let filtersExamen=[{name:'idDossier',value:visitMigrationId},{name:"DEL",value:0}];

            let _rowsExamen= await dbUtilityMedris.read({filters:filtersExamen},'dossier_compte_rendu','');

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
                    docName=docName.replace('.rtf','.htm');
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

                let insertResult=  await dbUtility.insertRecords(dataToInsertArray,"REPORT",false);
                return insertResult;
            }
            else{
                MedRisMigration.fileContent+=visitMigrationId +' visitId has not report found \r\n';
                return false;
            }

        }
        else
            return false;
    }
};
//MedRisMigration.migratePatient(50000,55000);
//MedRisMigration.migrateCorrespondant();
//MedRisMigration.migrateCityIdForCorrespondant();
//MedRisMigration.migrateMedecin();
//MedRisMigration.migrateDossiers(0,5,'2018-01-01','2018-12-31');
//MedRisMigration.migrateExamens(0,500,'2018-01-01','2018-12-31');
MedRisMigration.migrateCrs(0,200,'2018-01-01','2018-12-31');
