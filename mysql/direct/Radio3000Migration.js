const fs = require('fs');
let dbUtilityRadio3000=require('../common/DbUtilityRadio3000'); //TODO uncomment to do medris migration
let dbUtility=require('../common/DbUtility');
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let Radio3000Migration = {
    fileContent:"",
    migrateRadiologue: function (params, callback) {
        let dataToCreate=[];
        let dataUserToCreate=[];
        let filtersArray=[{name:"VALIDE_RADIOLOGUE",value:0}];
        dbUtilityRadio3000.read({limit:"no",filters:filtersArray}, "RADIOLOGUE")
            .then(function (rows) {
                rows.forEach(row=>{
                        let userModel={};
                        let doctorModel={};
                        userModel.userId=row.code_radiologue;
                        doctorModel.userId=row.code_radiologue;
                        //userModel.cityId=row['Adresse.Commune.IDE_COMMUNE'];
                        userModel.userCatId=3;
                        userModel.userFName=row.PRENOM_RADIOLOGUE;
                        userModel.userLName=row.NOM_RADIOLOGUE;
                        userModel.userInitiales=row.NOM_RADIOLOGUE;
                         userModel.userLogin=row.NOM_RADIOLOGUE;
                        userModel.userPass=row.CP_radiologue;
                        userModel.userZipCode=row.codePostalMedecin;
                        userModel.userAddress=row.Adresse_radiologue;
                        userModel.userMigrationId=row.code_radiologue;
                        userModel.active=true;


                        doctorModel.active=true;
                        doctorModel.doctorId=row.code_radiologue;
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
                console.error("Error Radio3000Migration.js => Function migrateRadiologue : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateWorklist: function (params, callback) {
        let dataToCreate=[];
       // let filtersArray=[{name:"DEL",value:0}];
        dbUtilityRadio3000.read({limit:"no"}, "WORKLIST")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.deviceId=row.CODE_WORKLIST;
                    switch (row.MODTYPE_WORKLIST)
                    {
                        case  'CR':
                            userModel.modalityId=1;
                            userModel.deviceTypeId=4;
                            break;
                        case  'US':
                            userModel.modalityId=5;
                            userModel.deviceTypeId=3;
                            break;

                        case  'MG':
                            userModel.modalityId=3;
                            userModel.deviceTypeId=6;
                            break;

                    }

                    userModel.siteId=params.siteId||1;


                    userModel.deviceName=row.NOM_WORKLIST;
                    userModel.deviceModel="";
                    userModel.deviceAET=row.MODAETITLE_WORKLIST;
                    userModel.deviceAgreementDate=null;
                    userModel.deviceInstallationDate=null;


                    userModel.deviceAgreementNumber=null;

                    userModel.deviceTrademark=null;
                    userModel.devicePower=null;

                    userModel.deviceMigrationId=row.CODE_WORKLIST;
                    userModel.active=true;

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
                console.error("Error Radio3000Migration.js => Function migrateWorklist : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateStudies: function (params, callback) {
        let dataToCreate=[];

        dbUtilityRadio3000.read({limit:"no"},'EXAMEN','')
            .then(function (rows) {
                rows.forEach(row=>{

                    let siteGroupeModel={};
                    siteGroupeModel.studyId=row.CODE_EXAMEN;
                    siteGroupeModel.studyMigrationId=row.CODE_EXAMEN;
                    siteGroupeModel.studyTypeId=1;
                    siteGroupeModel.studyCode=row.LIBELLE_EXAMEN;
                    siteGroupeModel.studyName=row.LIBELLELONG_EXAMEN;
                    siteGroupeModel.studyDuration=0;
                    siteGroupeModel.studyRequireDoctor=false;
                    siteGroupeModel.studyRequireTech=true;
                    siteGroupeModel.active=true;
                    if(row.VALIDE_EXAMEN!==0)
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
                console.error("Error dbUtilityRadio3000.js => Function migrateStudies : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    /**
     * dans cette fonction il manque
     * le studyActeCodeGroupement,studyActeAcceptedModificators
     * On peut également utiliser la fonction "corrigerCodeGroupementApresMigration"
     * il faut absolument le calculer sinon les codes Anp dans les cotations sont fausse
     * @param params
     * @param callback
     */
    migrateStudiesActe: function (params, callback) {
        let dataToCreate=[];
        let promiseArray=[];
        let i=1;
        dbUtilityRadio3000.read({limit:"no"},'Examen','')
            .then(function (rows) {
                rows.forEach(row=>{

                    if(row.ACTE_CCAM)
                    {
                        let codesCCAMsArray=(row.COTATIONT0_EXAMEN).split('+');
                        codesCCAMsArray.forEach(_codeCcam=>{
                            i++;
                            let siteGroupeModel={};
                            siteGroupeModel.studyActeId=i;
                            siteGroupeModel.studyId=row.CODE_EXAMEN;
                            siteGroupeModel.studyActeCode=_codeCcam;
                            siteGroupeModel.studyActeType=1;//CCAM
                            siteGroupeModel.studyActeAmount=0;
                            siteGroupeModel.studyActeAmountDepassement=0;
                            siteGroupeModel.studyActeAssociationNonPrevu=0;
                            siteGroupeModel.studyActeQuantity=1;
                            siteGroupeModel.studyActeAdditionalAmount=0;
                            siteGroupeModel.studyActeCoefficient=1;
                            siteGroupeModel.studyActeMigrationId=i;
                            siteGroupeModel.active=true;
                            // siteGroupeModel.studyActeCodeGroupement=
                            dataToCreate.push(siteGroupeModel);
                        });
                    }
                    else {
                        i++;
                        let siteGroupeModel={};
                        siteGroupeModel.studyActeId=i;
                        siteGroupeModel.studyId=row.CODE_EXAMEN;
                        siteGroupeModel.studyActeCode=row.COTATIONT0_EXAMEN;
                        siteGroupeModel.studyActeType=2;//NGAP
                        siteGroupeModel.studyActeAmount=0;
                        siteGroupeModel.studyActeAmountDepassement=0;
                        siteGroupeModel.studyActeAssociationNonPrevu=0;
                        siteGroupeModel.studyActeQuantity=1;
                        siteGroupeModel.studyActeAdditionalAmount=0;
                        siteGroupeModel.studyActeCoefficient=1;
                        siteGroupeModel.studyActeMigrationId=i;
                        // siteGroupeModel.studyActeCodeGroupement=
                        siteGroupeModel.active=true;
                        dataToCreate.push(siteGroupeModel);
                    }

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
                console.error("Error Radio3000Migration.js => Function migrateStudiesActe : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateMedecin: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"valide_medecin",value:0}];

        dbUtilityRadio3000.read({limit:"no",filters:filtersArray}, "MEDECIN")
            .then(function (rows) {
                rows.forEach(row=>{
                    let userModel={};
                    userModel.referringPhysicianId=uuid.v4();
                    userModel.referringPhysicianMigrationId=row.code_medecin;
                    userModel.referringPhysicianFName=row.prenom_medecin;
                    if( userModel.prenom_medecin)
                    {
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?Ü',"é");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?¥',"ç");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?ö',"ë");
                        userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('ã©',"é");

                    }
                    userModel.referringPhysicianLName=row.nom_medecin;
                    userModel.referringPhysicianSearch=userModel.referringPhysicianLName +" "+userModel.referringPhysicianFName;
                    userModel.referringPhysicianPhoneNumber=row.tel_medecin;


                    userModel.referringPhysicianEmail=row.EMAIL_MEDECIN;

                   // userModel.referringPhysicianEmail=row.politesseCorrespondant;

                    userModel.referringPhysicianGender=0;

                    userModel.referringPhysicianTitle=0;
                    userModel.cityId=0;
                    userModel.referringPhysicianZipCode=row.cp_medecin;
                     userModel.referringPhysicianAddress=row.adresse_medecin;


                    userModel.active=true;
                    if(userModel.referringPhysicianFName && userModel.referringPhysicianLName)
                        dataToCreate.push(userModel);
                });
                let p1=dbUtility.insertRecords(dataToCreate,"referring_physician",false);
                p1.then(function (insertId) {
                    callback(null, {
                        data: "save Medecin  was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error Radio3000Migration.js => Function dbUtilityRadio3000 : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },

    migrateMedecinDelta: function (params, callback) {
        let dataToCreate=[];
        let filtersArray=[{name:"valide_medecin",value:0}];

        let promiseMedRadio3000=dbUtilityRadio3000.read({limit:"no",filters:filtersArray}, "MEDECIN");
        let promiseRefPhy=dbUtility.read({limit:"no"}, "referring_physician");
        Promise.all([promiseMedRadio3000,promiseRefPhy])
            .then(function (_resultsArray) {
                let medArray=_resultsArray[0];
                let refPhyArray=_resultsArray[1];

                    medArray.forEach(_medObj=>{
                        let medExists=false;
                        refPhyArray.forEach(_refPhyObj=>{
                            if(parseInt(_refPhyObj.referringPhysicianMigrationId)===_medObj.code_medecin)
                                medExists=true;
                        });
                        if(!medExists)
                        {
                            let userModel={};
                            let row=_medObj;
                            userModel.referringPhysicianId=uuid.v4();
                            userModel.referringPhysicianMigrationId=row.code_medecin;
                            userModel.referringPhysicianFName=row.prenom_medecin;
                            if( userModel.prenom_medecin)
                            {
                                userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?Ü',"é");
                                userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?¥',"ç");
                                userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?ö',"ë");
                                userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('ã©',"é");

                            }
                            userModel.referringPhysicianLName=row.nom_medecin;
                            userModel.referringPhysicianSearch=userModel.referringPhysicianLName +" "+userModel.referringPhysicianFName;
                            userModel.referringPhysicianPhoneNumber=row.tel_medecin;


                            userModel.referringPhysicianEmail=row.EMAIL_MEDECIN;

                            // userModel.referringPhysicianEmail=row.politesseCorrespondant;

                            userModel.referringPhysicianGender=0;

                            userModel.referringPhysicianTitle=0;
                            userModel.cityId=0;
                            userModel.referringPhysicianZipCode=row.cp_medecin;
                            userModel.referringPhysicianAddress=row.adresse_medecin;


                            userModel.active=true;
                            if(userModel.referringPhysicianFName && userModel.referringPhysicianLName)
                                dataToCreate.push(userModel);
                        }
                    });

                let p1=dbUtility.insertRecords(dataToCreate,"referring_physician",false);
                p1.then(function (insertId) {
                    callback(null, {
                        data: "save Medecin delta was successful",
                        success: true,
                        msg: ''
                    });
                })
            })
            .catch(function (error) {
                console.error("Error Radio3000Migration.js => Function dbUtilityRadio3000 : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migratePatient: function (params, callback) {
        let dataToCreate=[];
        dbUtilityRadio3000.read({limit:'no'}, "PATIENT")
            .then(function (rows) {
                rows.forEach(row=>{
                    let patientModel={};
                    patientModel.patientId=uuid.v4();
                    patientModel.cityId=0;
                   // patientModel.patientMigrationField=row.idCorrespondant;
                    //patientModel.referringPhysicianId=1;
                    patientModel.patientMigrationId=row.code_patient;
                    patientModel.patientFname=row.PRENOM_PATIENT;
                    patientModel.patientLName=row.NOM_PATIENT;
                    patientModel.patientPacsId=params.siteId+"_"+row.code_patient;
                    patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;

                    patientModel.patientGender=0;
                    if(row.Sexe_patient && row.Sexe_patient==='2')
                        patientModel.patientGender=1;
                    if(row.Sexe_patient && row.Sexe_patient==='1')
                        patientModel.patientGender=2;

                    if(row.titre_patient && row.titre_patient==="Mr")//M
                        patientModel.patientTitle=1;
                    if(row.titre_patient && row.titre_patient==="Mlle")//MLLE
                        patientModel.patientTitle=3;
                    if(row.titre_patient && row.titre_patient==="Mme")//MME
                        patientModel.patientTitle=2;
                    if(row.titre_patient && row.titre_patient==="Enf")//Enf
                        patientModel.patientTitle=4;


                    if(row.Date_patient)
                        patientModel.patientBirthday=moment(row.Date_patient).format('Y-M-D');
                    else
                        patientModel.patientBirthday='1900-01-01';

                    patientModel.patientSocialNumber='';
                    patientModel.patientSocialKey='';
                    patientModel.patientAddress=row.adresse_patient;
                    patientModel.patientIns="";
                    patientModel.patientInsKey="";
                    patientModel.patientPhoneNumber=row.Tel_patient;
                    patientModel.patientEmail=row.EMAIL_PATIENT;
                    patientModel.patientZipCode=row.cp_patient;
                   // patientModel.patientAllergies=row.alergiePatient;
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
                console.error("Error Radio3000Migration.js => Function migratePatient : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migratePatientDelta: function (params, callback) {

        dbUtilityRadio3000.read({limit:'no'}, "PATIENT")
            .then(function (rows) {
                callback(null, {
                    data: "save patient delta  was successful",
                    success: true,
                    msg: ''
                });
                rows.forEach(row=>{
                    dbUtility.read({filters:[{name:"patientMigrationId",value:row.code_patient}]},"patient")
                        .then(_result=>{

                            if(_result.length)
                            {

                            }
                            else{
                                let patientModel={};
                                patientModel.patientId=uuid.v4();
                                patientModel.cityId=0;
                                // patientModel.patientMigrationField=row.idCorrespondant;
                                //patientModel.referringPhysicianId=1;
                                patientModel.patientMigrationId=row.code_patient;
                                patientModel.patientFname=row.PRENOM_PATIENT;
                                patientModel.patientLName=row.NOM_PATIENT;
                                patientModel.patientPacsId=params.siteId+"_"+row.code_patient;
                                patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;

                                patientModel.patientGender=0;
                                if(row.Sexe_patient && row.Sexe_patient==='2')
                                    patientModel.patientGender=1;
                                if(row.Sexe_patient && row.Sexe_patient==='1')
                                    patientModel.patientGender=2;

                                if(row.titre_patient && row.titre_patient==="Mr")//M
                                    patientModel.patientTitle=1;
                                if(row.titre_patient && row.titre_patient==="Mlle")//MLLE
                                    patientModel.patientTitle=3;
                                if(row.titre_patient && row.titre_patient==="Mme")//MME
                                    patientModel.patientTitle=2;
                                if(row.titre_patient && row.titre_patient==="Enf")//Enf
                                    patientModel.patientTitle=4;


                                if(row.Date_patient)
                                    patientModel.patientBirthday=moment(row.Date_patient).format('Y-M-D');
                                else
                                    patientModel.patientBirthday='1900-01-01';

                                patientModel.patientSocialNumber='';
                                patientModel.patientSocialKey='';
                                patientModel.patientAddress=row.adresse_patient;
                                patientModel.patientIns="";
                                patientModel.patientInsKey="";
                                patientModel.patientPhoneNumber=row.Tel_patient;
                                patientModel.patientEmail=row.EMAIL_PATIENT;
                                patientModel.patientZipCode=row.cp_patient;
                                // patientModel.patientAllergies=row.alergiePatient;
                                patientModel.active=true;

                                if(patientModel.patientFname && patientModel.patientFname){
                                    dbUtility.insertRecords([patientModel],"PATIENT",false)
                                        .then(function (insertId) {
                                            console.log("insert" +patientModel );
                                        })
                                        .catch(function (error) {
                                            console.error("Error Radio3000Migration.js => Function migratePatientDelta : " + error);

                                        })
                                }

                            }
                        })
                        .catch(function (error) {
                            console.error("Error Radio3000Migration.js => Function migratePatientDelta : " + error);

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



    migrateMedecinTraitantForPatient1: function (params, callback) {
        let promiseArray=[];
        let filtersMTArray=[{name:'ACTIF',value:0}];

        let mainTableObject={tableName:'DOSSIER_MEDECIN_TRAITANT',filters:filtersMTArray};
      //  mainTableObject.order=[["CODE_DOSSIER", "ASC"]];
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'DOSSIER'});

          dbUtilityRadio3000.joinQuery(mainTableObject,joinTablesArray,params.limit,true,"",params.offset)
            .then(function (rows) {
                callback(null, {
                    data: " migrateMedecinTraitantForPatient1  was successful",
                    success: true,
                    msg: ''
                });
                rows.forEach(row=>{
                    let userModel={};
                    userModel.idName='patientMigrationId';
                    userModel.idValue=row['Dossier.code_patient'];
                    userModel.patientMigrationField=row.CODE_MEDECIN;
                   dbUtility.saveRecord(userModel,'patient');
                });

            })
            .catch(function (error) {
                console.error("Error Radio3000Migration.js => Function migrateMedecinTraitantForPatient : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateMedecinTraitantForPatient2: function (params, callback) {
        let dataToUpdate=[];
        dbUtility.read({limit:'no'}, "referring_physician")
            .then(function (rows) {
                callback(null, {
                    data: " migrateMedecinTraitantForPatient2  was successful",
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
                console.error("Error Radio3000Migration.js => Function migrateMedecinTraitantForPatient2 : " + error);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'

                });
            })
    },
    migrateDossiers:function(params,callback)
    {
        callback(null, {
            data: "save dossier was successful",
            success: true,
            msg: ''

        });
         dbUtilityRadio3000.read({},'RADIOLOGUE','')
            .then(_radiologueArray=>{
                let promiseArray=[];
                for (let i = params.mind; i < params.maxd; i++) {
                    params.offset=i;
                    params.radArray=_radiologueArray;
                    promiseArray.push(Radio3000Migration.migrateDossier(params));
                }
                let dt=new Date();
                let dtString=moment(dt).format("YYYYMMDD-h-mm-ss");
                if(promiseArray.length)
                    Promise.all(promiseArray)
                        .then(function (insertId) {
                            fs.writeFile('migration'+dtString+'.log', Radio3000Migration.fileContent, (err) => {
                                if (err) throw err;
                                console.log('The file has been saved!');
                                Radio3000Migration.fileContent="";
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
            });



    },
    migrateDossier: function (params) {
        let dataToCreate=[];
        let rowDossier;
        let patientModel={};
        let filtersDossier=[];
        let patientObj;

        filtersDossier.push({name:'date_dossier',value1:params.startDate,value2:params.endDate,compare:'between'});

       return dbUtilityRadio3000.read({limit:1,offset:params.offset,filters:filtersDossier},'DOSSIER','')
            .then(function (rows) {
                    if (rows.length) {
                        rowDossier = rows[0];
                        let filters = [{name: 'patientMigrationId', value: ""+rowDossier.code_patient+""}];

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
                         patientObj=_patientResultsArray[0];

                        patientModel.visitId=uuid.v4();
                        patientModel.siteId=params.siteId;
                        patientModel.patientId=patientObj.patientId;
                        patientModel.remplacantId=null;
                        patientModel.establishmentId=null;
                        patientModel.visitInvoiceType=2;
                        patientModel.doctorId=rowDossier.code_radiologue;
                        patientModel.visitDate=moment(new Date(rowDossier.date_dossier)).format('Y-M-D');
                        patientModel.visitTime=moment(new Date(rowDossier.heure_dossier)).format('HH:mm:ss');

                        patientModel.visitIsDone=true;
                        patientModel.visitMigrationId=rowDossier.code_dossier;
                        patientModel.visitCotationStatus=rowDossier.statutCotation;
                        patientModel.visitIsAmo=false;
                        patientModel.visitIsAmc=true;
                        patientModel.active=true;


                        dataToCreate.push(patientModel);
                        return dbUtility.insertRecords(dataToCreate,"VISIT",false);


                    }
                    else{
                        Radio3000Migration.fileContent+=rowDossier.code_patient +' patient not found \r\n';
                        return true;

                    }
                })
           .then(_result=>{

               if(_result) {
                   let regoObj = {};
                   regoObj.regoId = uuid.v4();
                   regoObj.visitId = patientModel.visitId;
                   regoObj.patientId = patientModel.patientId;
                   regoObj.regoCodeRegime = '1';
                   regoObj.regoCodeCaisse = '1';
                   regoObj.regoCodeCentre = '1';


               return dbUtility.saveRecord(regoObj,"REGO",false);
               }
               else
                   return false;
           })
           .then(_result=>{


               let patientParam={};
               patientParam.idName='patientId';
               patientParam.idValue=patientObj.patientId;
               let numeroAssure=rowDossier.numero_assure;

               patientParam.patientSocialNumber=numeroAssure.substring(0,numeroAssure.length-2);

               patientParam.patientSocialKey=numeroAssure.substring(numeroAssure.length-2);

               return dbUtility.saveRecord(patientParam,"PATIENT",false);
           })
           .then(_result=>{


               let visitBalanceObj={};
               visitBalanceObj.visitBalanceId=uuid.v4();
               visitBalanceObj.visitId=patientModel.visitId;


               return dbUtility.saveRecord(visitBalanceObj,"VISIT_BALANCE",false);
           })
           .then(_result=>{


               let worklistObj={};
               worklistObj.worklistId=patientModel.visitId;
               worklistObj.visitId=patientModel.visitId;
               worklistObj.patientId=patientModel.patientId;
               worklistObj.siteId=patientModel.siteId;
               worklistObj.worklistDoctor=null;
               (params.radArray).forEach(_rad=>{
                  if(_rad.code_radiologue===rowDossier.code_radiologue)
                      worklistObj.worklistDoctor=_rad.NOM_RADIOLOGUE.substring(0,1)+'.'+_rad.PRENOM_RADIOLOGUE.substring(0,1);
               });

               worklistObj.worklistLastCrStatus=3;

               return dbUtility.saveRecord(worklistObj,"WORKLIST",false);
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

                    let filtersExamen=[{name:'code_dossier',value:visitMigrationId}];
                    return dbUtilityRadio3000.read({filters:filtersExamen},'EXAMEN_DOSSIER','')
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

                            examenCode+= _rowExamen['Libelle_examen'];
                            if(i<_rowsExamen.length)
                                examenCode+="|";

                        }) ;
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
            await Radio3000Migration.migrateExamen(params);
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
            await Radio3000Migration.migrateCr(params);
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
            order:[["visitMigrationId", "ASC"]],
            fieldsArray:['visitMigrationId','visitId'],filters:filtersDossier}, 'VISIT')
            .then(_visitRowsArray=>{
                if(_visitRowsArray.length)
                {
                    visitMigrationId=_visitRowsArray[0].visitMigrationId;
                    visitId=_visitRowsArray[0].visitId;
                    let filtersExamen=[{name:'code_dossier',value:visitMigrationId}];
                    return dbUtilityRadio3000.read({filters:filtersExamen},'COMPTE_RENDU','');

                }
                else return false;
                   })
            .then(_rowsExamen=>{
                if(_rowsExamen && _rowsExamen.length)
                {

                    let dataToInsertArray= [];
                    _rowsExamen.forEach(_rowDocument=>{
                        let reportObj={};
                        reportObj.reportId=uuid.v4();
                        reportObj.visitMigrationId=_rowDocument.code_dossier;
                        reportObj.reportMigrationId=_rowDocument.code_cr;
                        // reportObj.studyId=_rowDocument.IDU_EXAMEN;
                        reportObj.doctorId=2;
                        reportObj.visitId=visitId;
                        reportObj.reportName="";
                        let pathArray=(_rowDocument.Chemin_cr).split("\\");
                        //console.log(pathArray);
                        let docDossier=pathArray[2]+"/"+pathArray[3];
                        let docName=pathArray[pathArray.length-1];
                        docName=docName.replace('.D00','.htm');
                        reportObj.reportPath="migrated/"+docDossier+"/"+docName;
                        reportObj.reportHtmlPath=reportObj.reportPath;
                        reportObj.reportContentIsHtml=true;
                        reportObj.reportDate=new Date();
                        reportObj.reportStatus=3;//validated
                        reportObj.active=true;
                        dataToInsertArray.push(reportObj);
                    });

                    return dbUtility.insertRecords(dataToInsertArray,"REPORT",false);
                }
                else{
                    Radio3000Migration.fileContent+=visitMigrationId +' visitId has not report found \r\n';
                    return false;
                }
            })
    }
};
module.exports = Radio3000Migration;