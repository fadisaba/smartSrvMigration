const fs = require('fs');
var unrtf = require('unrtf');
let dbUtilityCabrad=require('../common/dbUtilityCabrad');
let dbUtility=require('../common/DbUtility');
//let smartMeDbName='_migrate';
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let CabradMigration = {
    migrationIdPrefix:"s.",
  /*  setDoctorModel:function(_rowUserPs,_rowUser)
    {
        let doctorModel={};
        doctorModel.doctorId=_rowUser.userId;
        doctorModel.userId=_rowUser.userId;
        doctorModel.doctorIsSubstitute=false;
        if(_rowUserPs.type_ps==="R")
             doctorModel.doctorIsSubstitute=true;

        doctorModel.doctorHasSector2=true;
        doctorModel.doctorParametresAcs=1;
        doctorModel.doctorContratTarifaire=1;
        doctorModel.active=true;
        return doctorModel;
    },*/
    setUserCpsModel:function(_rowUserPs,_rowUser)
    {
        let userCpsModel={};
        userCpsModel.userCpsId=uuid.v4();
        userCpsModel.userId=_rowUser.userId;
        userCpsModel.siteId=1;
        userCpsModel.userCpsCodePorteur="1234";
        userCpsModel.userCpsAddedWihoutPyx=true;
        userCpsModel.userCpsTeletransmissionAuto=false;
        userCpsModel.userCpsType='0';
        userCpsModel.userCpsAdeli=_rowUserPs.num_nat;
        userCpsModel.userCpsCle=(_rowUserPs.num_nat).substring(0,8);
        userCpsModel.userCpsNumero=(_rowUserPs.num_nat).substring(8,9);
        userCpsModel.userCpsNumeroSituation="1";
        userCpsModel.userCpsCivilite=31;
        userCpsModel.userCpsNom=_rowUserPs.nom;
        userCpsModel.userCpsPrenom=_rowUserPs.prenom;
        userCpsModel.userCpsModeExercice='0';
        userCpsModel.userCpsSecteurActivite='33';
        userCpsModel.userCpsTypeIdStructure='3';
        userCpsModel.userCpsNumeroIdStructure='940004369';
        userCpsModel.userCpsCleIdStructure='9';
        userCpsModel.userCpsRaisonSocialeStructure='CENTRE D IMAGERIE MEDICALE';
        userCpsModel.userCpsCodeSpecialite='06';
        userCpsModel.userCpsSpecialite='Electroradiologie';
        userCpsModel.userCpsCodeConvention='3';
        userCpsModel.userCpsConvention='Conventionné';
        userCpsModel.userCpsZoneTarifaire='Zone A avec ID';
        userCpsModel.userCpsCodeZoneTarifaire='31';
        userCpsModel.userCpsZoneIk='Pas d\'indemnité kilométrique';
        userCpsModel.userCpsCodeZoneIk='00';
        userCpsModel.userCpsAgrement='Agrément A';
        userCpsModel.userCpsCodeAgrement='2';
        userCpsModel.userCpsCode2Agrement='0';
        userCpsModel.userCpsCode3Agrement='0';
        userCpsModel.userCpsHabilitationFact='1';
        userCpsModel.userCpsHabilitationLot='1';
        userCpsModel.active=true;
        return userCpsModel;

    },
    setUserModel:function(row)
    {
        let userModel={};
        userModel.userId=row.id_user;
        userModel.userCatId=1;
        if(row.id_user_profil===4)// medecin
            userModel.userCatId=3;

        if(row.id_user_profil===3)// manip
            userModel.userCatId=2;

        if(row.id_user_profil===2)// secretaire
            userModel.userCatId=1;

        if(row.id_user_profil===1)// admin
            userModel.userCatId=4;

        userModel.userFName=row.prenom;
        userModel.userLName=row.nom;
        userModel.userInitiales=(row.prenom).substring(0,1)+" "+(row.nom).substring(0,1);
        userModel.userLogin=row.login;
        userModel.userPass=row.login;
        userModel.userMigrationId=row.id_user;
        userModel.active=true;
        return userModel;
    },

    setUserModelFromPS:function(row)
    {
        let userModel = {};
        let userId = row.id_ps + 5000;
        let userInitiales = (row.prenom).substring(0, 1) +""+  (row.nom).substring(0, 1);
        userModel.userId = userId;
        userModel.userCatId = 3;//médecin
        userModel.userFName = row.prenom;
        userModel.userLName = row.nom;
        userModel.userInitiales = userInitiales;
        userModel.userLogin = userInitiales;
        userModel.userPass = userInitiales;
        userModel.userMigrationId = row.id_ps;
        userModel.active = true;
        return userModel;


        //user et doctor et user_cps (ps_situation)
    },
/*
    setDoctorModelFromPS:function(row)
    {
        let userModel = {};
        let userId = row.id_ps * 5000;
        let userInitiales = (row.prenom).substring(0, 1) + " " + (row.nom).substring(0, 1);
        userModel.userId = userId;
        userModel.userCatId = 3;//médecin
        userModel.userFName = row.prenom;
        userModel.userLName = row.nom;
        userModel.userInitiales = userInitiales;
        userModel.userLogin = userInitiales;
        userModel.userPass = userInitiales;
        userModel.userMigrationId = userId;
        userModel.active = true;
        return userModel;


        //user et doctor et user_cps (ps_situation)
    },
    setDoctorModelFromPSSituation:function(row)
    {
        let userModel = {};
        let userId = row.id_ps * 5000;
        let userInitiales = (row.prenom).substring(0, 1) + " " + (row.nom).substring(0, 1);
        userModel.userId = userId;
        userModel.userCatId = 3;//médecin
        userModel.userFName = row.prenom;
        userModel.userLName = row.nom;
        userModel.userInitiales = userInitiales;
        userModel.userLogin = userInitiales;
        userModel.userPass = userInitiales;
        userModel.userMigrationId = userId;
        userModel.active = true;
        return userModel;


        //user et doctor et user_cps (ps_situation)
    },*/

    setDoctorModel:function(_rowPs,_rowUser)
    {
        let doctorModel={};
        doctorModel.doctorId=_rowPs.id_ps;
        doctorModel.userId=_rowUser.userId;
        doctorModel.doctorIsSubstitute=false;
        if(_rowPs.type_ps==="R")
            doctorModel.doctorIsSubstitute=true;

        doctorModel.doctorHasSector2=true;
        doctorModel.doctorParametresAcs=1;
        doctorModel.doctorContratTarifaire=1;
        doctorModel.doctorMigrationId=_rowPs.id_ps;
        doctorModel.active=true;
        return doctorModel;
    },
    setUserCpsModelFromPS:function(_rowPs,_rowPsSituation,_rowUser)
    {
        let userCpsModel={};
        userCpsModel.userCpsId=uuid.v4();
        userCpsModel.userId=_rowUser.userId;
        userCpsModel.siteId=1;
        userCpsModel.userCpsCodePorteur="1234";
        userCpsModel.userCpsAddedWihoutPyx=true;
        userCpsModel.userCpsTeletransmissionAuto=false;
        userCpsModel.userCpsType='0';
        userCpsModel.userCpsAdeli=_rowPsSituation.num_nat;
        userCpsModel.userCpsCle=(_rowPsSituation.num_nat).substring(8,9);
        userCpsModel.userCpsNumero=(_rowPsSituation.num_nat).substring(0,8);
        userCpsModel.userCpsNumeroSituation=_rowPsSituation.numero_situation;
        userCpsModel.userCpsCivilite=_rowPsSituation.code_civilite;
        userCpsModel.userCpsNom=_rowPs.nom;
        userCpsModel.userCpsPrenom=_rowPs.prenom;
        userCpsModel.userCpsModeExercice=_rowPsSituation.mode_exercice;
        userCpsModel.userCpsSecteurActivite=_rowPsSituation.secteur_activite;
        userCpsModel.userCpsTypeIdStructure=_rowPsSituation.type_identif_structure;
        userCpsModel.userCpsNumeroIdStructure=_rowPsSituation.numero_identif_structure;
        userCpsModel.userCpsCleIdStructure=_rowPsSituation.cle_identif_structure;
        userCpsModel.userCpsRaisonSocialeStructure=_rowPsSituation.raison_sociale_structure;
        userCpsModel.userCpsCodeSpecialite=_rowPsSituation.code_specialite;
        userCpsModel.userCpsSpecialite='Electroradiologie';
        userCpsModel.userCpsCodeConvention=_rowPsSituation.code_convention;
        userCpsModel.userCpsConvention='Conventionné';
        userCpsModel.userCpsZoneTarifaire='Zone A avec ID';
        userCpsModel.userCpsCodeZoneTarifaire=_rowPsSituation.code_zone_tarifaire;
        userCpsModel.userCpsZoneIk='Pas d\'indemnité kilométrique';
        userCpsModel.userCpsCodeZoneIk=_rowPsSituation.code_zone_ik;
        userCpsModel.userCpsAgrement='Agrément A';
        userCpsModel.userCpsCodeAgrement=_rowPsSituation.code_agrement_1;
        userCpsModel.userCpsCode2Agrement=_rowPsSituation.code_agrement_2;
        userCpsModel.userCpsCode3Agrement=_rowPsSituation.code_agrement_3;
        userCpsModel.userCpsHabilitationFact=_rowPsSituation.habilitation_facture;
        userCpsModel.userCpsHabilitationLot=_rowPsSituation.habilitation_lot;
        userCpsModel.active=true;
        return userCpsModel;

    },






    migrateUser: async  function()
    {
        let filtersArray=[{name:"obsolete",value:'0'}];
        let usersArray =await dbUtilityCabrad.read({limit:"no",filters:filtersArray}, "user");
        for (let i = 0; i < usersArray.length; i++) {
            let userObj = usersArray[i];
            let userToSave=this.setUserModel(userObj);
            await dbUtility.saveRecord(userToSave,"user",false);
           /* if(userObj.id_user_profil===4)// medecin
            {

                let userPsArray =await dbUtilityCabrad.read({limit:"no",filters:[{name:'id_user',value:userObj.id_user,compare:'eq'}]}, "user_ps");
                if(userPsArray.length)
                {
                    for (let j = 0; j < userPsArray.length; j++) {
                        let psArray =await dbUtilityCabrad.read({limit:"no",filters:[{name:'id_ps',value:userPsArray[j].id_ps,compare:'eq'}]}, "ps");
                        if(psArray.length)
                        {
                            let psObj = psArray[0];
                            let userModel={};
                            userModel.userId=psObj.id_ps;
                            userModel.userCatId=4;
                            userModel.userFName=psObj.prenom;
                            userModel.userLName=psObj.nom;
                            userModel.userInitiales=(psObj.prenom).substring(0,1)+" "+(psObj.nom).substring(0,1);
                            userModel.userLogin=psObj.nom;
                            userModel.userPass=psObj.prenom;
                            userModel.active=true;

                            await dbUtility.saveRecord(userModel,"user",false);

                            let userCpsToSave=this.setUserCpsModel(psObj,userModel);
                            let doctorToSave=this.setDoctorModel(psObj,userModel);
                            await dbUtility.saveRecord(doctorToSave,"doctor",false);
                            await dbUtility.saveRecord(userCpsToSave,"user_cps",false);



                        }
                    }

                }
            }*/
        }
    },

    migratePS: async function () {

        let filtersArray = [{name: "obsolete", value: '0'}];
        let psArray = await dbUtilityCabrad.read({limit: "no", filters: filtersArray}, "ps");
        for (let i = 0; i < psArray.length; i++) {
            let psObj = psArray[i];
            let userToSave = this.setUserModelFromPS(psObj);
            await dbUtility.saveRecord(userToSave, "user", false);
            let doctorToSave = this.setDoctorModel(psObj, userToSave);
            await dbUtility.saveRecord(doctorToSave, "doctor", false);
           console.log(psObj.num_nat);
            let psSituationArray = await dbUtilityCabrad.read({
                limit: "no",
                filters: [{name: 'num_nat', value: psObj.num_nat, compare: 'eq'}]
            }, "ps_situation");



            if (psSituationArray.length) {
                for (let j = 0; j < psSituationArray.length; j++) {
                    let userCpsToSave = this.setUserCpsModelFromPS(psObj, psSituationArray[j], userToSave);
                    await dbUtility.saveRecord(userCpsToSave, "user_cps", false);
                }
            }
        }
    },

    migrateUnPrescripteur:async function(_obj)
    {
        let row = _obj;
        let userModel={};
        userModel.referringPhysicianId=uuid.v4();
        userModel.referringPhysicianMigrationId=CabradMigration.migrationIdPrefix+''+row.oid;
        userModel.referringPhysicianFName=row.prenom;
        if( userModel.referringPhysicianFName)
        {
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?Ü',"é");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?¥',"ç");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?ö',"ë");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('ã©',"é");

        }
        userModel.referringPhysicianLName=row.nom;
        userModel.referringPhysicianSearch=userModel.referringPhysicianLName +" "+userModel.referringPhysicianFName;

        userModel.referringPhysicianPhoneNumber=row.teleph;
        userModel.referringPhysicianEmail=row.email;
        userModel.referringPhysicianAddress=row.adres1;
        if(row.burdis)
            userModel.referringPhysicianAddress+="\n"+row.codpos+" "+row.burdis;
        userModel.referringPhysicianZipCode=row.code_postal;

        userModel.referringPhysicianGender=0;

        userModel.referringPhysicianTitle=0;
        userModel.cityId=0;
        userModel.referringPhysicianSpeciality=row.specia;
        userModel.active=true;
        if(userModel.referringPhysicianFName && userModel.referringPhysicianLName)
            await dbUtility.insertRecords([userModel],"referring_physician",false);

    },
    migratePrescripteurs:async  function () {
       let rows =await dbUtilityCabrad.read({limit:"no",filters:[]}, "fpresc");
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let prescId=row.oid;
            let filtersArray=[{name:'referringPhysicianMigrationId',value:prescId+"",compare:'eq'}];
            let rowsSmartMed =await dbUtility.read({limit:"no",filters:filtersArray}, "referring_physician");

            if(rowsSmartMed.length===0){
                await this.migrateUnPrescripteur(row);

                console.log('correspondant saved numero: '+i);
            }

        }
                console.log('save Correspondant  was successful');
    },

    migrateUnPatient:async function(_patientObj)
    {
        let row=_patientObj;
        let patientModel={};
        patientModel.patientId=uuid.v4();
        patientModel.cityId=0;
        patientModel.patientPhoneNumber="";
        patientModel.patientMobileNumber=row.commen;
        patientModel.patientAddress=row.adres1;
        if(row.adres2)
            patientModel.patientAddress+= "\n "+row.adres2;
        patientModel.patientZipCode=row.codpos;
        if(row.burdis)
            patientModel.patientAddress+="\n"+row.codpos+" "+row.burdis;
        patientModel.patientEmail="";



        let rowsPrescCabrad =await dbUtilityCabrad.read({filters:[{name:'codpre',value:row.codpr1,compare:'eq'}]}, "fpresc");
        if(rowsPrescCabrad.length)
        {
            let prescId=CabradMigration.migrationIdPrefix+''+rowsPrescCabrad[0].oid;

            let rowsPresc= await dbUtility.read({limit:"no",filters:
                    [{name:'referringPhysicianMigrationId',value:prescId,compare:'eq'}]}, "referring_physician");

            if(rowsPresc.length)
            {
                patientModel.referringPhysicianId =rowsPresc[0].referringPhysicianId;
            }
        }

        //patientModel.referringPhysicianId=1;
        patientModel.patientMigrationId=CabradMigration.migrationIdPrefix+row.codpat;
        patientModel.patientFname=row.prenom;
        patientModel.patientLName=row.nom;
        patientModel.patientSecondName=row.nomjfi;
        patientModel.patientPacsId=CabradMigration.migrationIdPrefix+row.codpat;
        patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;

        patientModel.patientGender=0;
        patientModel.patientTitle=0;
        if(row.codciv)
        {
            if(row.codciv==='M.') // Mr
            {
                patientModel.patientTitle=1;
                patientModel.patientGender=1;
            }
            if(row.codciv==='MME') // mme
            {
                patientModel.patientTitle=2;
                patientModel.patientGender=2;
            }
            if(row.codciv==='MLE') // Mlle
            {
                patientModel.patientTitle=3;
                patientModel.patientGender=2;
            }
            if(row.codciv==='ENF') // enfant
            {
                patientModel.patientTitle=4;
            }
        }
        if(row.datnai && row.datnai!=="00000000000000")
        {
            patientModel.patientBirthday=moment(row.datnai).format('Y-MM-DD');
        }
        else
            patientModel.patientBirthday='1900-01-01';

        patientModel.patientSocialNumber=row.numsec;
        patientModel.patientSocialKey=row.clesec;
        patientModel.active=true;
        if(patientModel.patientFname && patientModel.patientFname)
            await dbUtility.insertRecords([patientModel],"PATIENT",false)
    },
    migratePatient:async function(_limit,_offset)
    {

        let rows =await dbUtilityCabrad.read({limit:_limit,offset:_offset,filters:[]}, "fmalad");
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let filtersArray=[{name:'patientMigrationId',value:row.codpat+"",compare:'eq'}];
            let rowsMedRis =await dbUtility.read({limit:"no",filters:filtersArray}, "patient");
            if(rowsMedRis.length===0){
                await this.migrateUnPatient(row);
                console.log('patient saved numero: '+i);
            }
        }
        console.log('save patients  was successful');
    },

    migrateStudies: function () {
        let dataToCreate=[];

        dbUtilityCabrad.read({limit:"no"},'EXAMEN','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyId=row.id_examen;
                    siteGroupeModel.studyTypeId=row.id_examen_type_stat;
                    siteGroupeModel.studyCode=row.code;
                    siteGroupeModel.studyName=row.libelle;
                    siteGroupeModel.studyDuration=row.rdv_duree;
                    if(row.ps_obligatoire==='1')
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
                        siteGroupeModel.studyFtNumber=1;

                    siteGroupeModel.studyGenerateDicomWl=true;

                    siteGroupeModel.active=true;
                    dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"STUDY",false)
                    .then(function (insertId) {
                      console.log('save study was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error ErisMigration.js => Function migrateStudies : " + error);
            })
    },

    migrateStudiesActe: function () {
        let dataToCreate=[];
        let filtersArray=[];
        dbUtilityCabrad.read({limit:"no",filters:filtersArray},'examen_cotation','')
            .then(function (rows) {
                rows.forEach(row=>{
                    let siteGroupeModel={};
                    siteGroupeModel.studyActeId=row.id_examen_cotation;
                    siteGroupeModel.studyId=row.id_examen;
                    siteGroupeModel.studyActeCode=row.code_acte;
                    siteGroupeModel.studyActeType=1;//CCAM
                    siteGroupeModel.studyActeAmount=0;
                    siteGroupeModel.studyActeAmountDepassement=0;
                    siteGroupeModel.studyActeAssociationNonPrevu='';
                    siteGroupeModel.studyActeQuantity=1;
                    siteGroupeModel.studyActeAdditionalAmount=0;
                    siteGroupeModel.studyActeCoefficient=1;
                    siteGroupeModel.studyActeMigrationId=row.id_examen_cotation;

                    siteGroupeModel.active=true;

                        dataToCreate.push(siteGroupeModel);
                });
                return dbUtility.insertRecords(dataToCreate,"STUDY_ACTE",false)
                    .then(function (insertId) {
                        console.log('save study_acte was successful');
                    })
            })
            .catch(function (error) {
                console.error("Error ErisMigration.js => Function migrateStudiesActe : " + error);
            })
    },

    migrateDossier: async function (startDate,endDate,recuprerRego) {
        let dataToCreate=[];
        let rowDossier;
        let patientModel={};
        let filtersDossier=[];
        filtersDossier.push({name:'date_dossier',value1:startDate,value2:endDate,compare:'between'});
        filtersDossier.push({name:'annule',value:'0',compare:'eq'});
       let  rows= await  dbUtilityCabrad.read({limit:'no',filters:filtersDossier},'DOSSIER','');
        for (let i = 0; i < rows.length; i++) {
            let  rowDossier = rows[i];

            let filters = [{name: 'patientMigrationId', value: ""+rowDossier.id_identite+""}];

            let _patientResultsArray= await dbUtility.read({limit: 1, filters: filters,fieldsArray:['patientId']}, 'PATIENT');

            if(_patientResultsArray && _patientResultsArray.length)
            {
                let patientObj=_patientResultsArray[0];
                patientModel.visitId=uuid.v4();
                patientModel.siteId=rowDossier.id_cabinet;
                patientModel.patientId=patientObj.patientId;
                patientModel.remplacantId=rowDossier.id_remplacant;
                patientModel.establishmentId=null;
                patientModel.visitInvoiceType=2;
                patientModel.doctorId=rowDossier.id_ps;

                patientModel.visitDate=moment(new Date(rowDossier.date_dossier)).format('Y-M-D');
                patientModel.visitTime=moment(new Date(rowDossier.date_dossier)).format('HH:mm:ss');

                patientModel.visitIsBySocialCard=true;


                patientModel.visitIsHospitalized=false;
                patientModel.visitIsUrgent=false;
                patientModel.visitHospitVisitNumber=0;
                patientModel.visitIsDone=true;

                patientModel.visitMigrationId=rowDossier.id_dossier;
                patientModel.visitPacsId=rowDossier.id_dossier;
               // patientModel.groupVacId=rowDossier.id_groupe_vacation;
                patientModel.visitCotationStatus=3;
               // patientModel.visitMigrationField1=rowDossier.idCorrespondantMT;
              //  patientModel.visitMigrationField2=rowDossier.idCorrespondant2;
                patientModel.visitIsAmo=false;
                patientModel.visitIsAmo=true;
                patientModel.visitIsAmc=false;

                patientModel.active=true;
                dataToCreate.push(patientModel);

                let visit=  await dbUtility.saveRecord(patientModel,"VISIT",false);

                let worklistObj={};
                worklistObj.worklistId=patientModel.visitId;
                worklistObj.visitId=patientModel.visitId;
                worklistObj.patientId=patientModel.patientId;
                worklistObj.siteId=patientModel.siteId;
                worklistObj.worklistStudies="";
                let  rowsDossierAffichage= await  dbUtilityCabrad.read({limit:'no',
                    filters:[{name:'id_dossier',value:rowDossier.id_dossier}]
                },'dossier_affichage','');
                if(rowsDossierAffichage.length)
                {
                    worklistObj.worklistStudies=  rowsDossierAffichage[0].examen;
                }
                worklistObj.worklistDoctor="";
                if(rowDossier.id_ps)
                {
                    let  rowsPs= await  dbUtilityCabrad.read({limit:'no',
                        filters:[{name:'id_ps',value:rowDossier.id_ps}]
                    },'ps','');
                    if(rowsPs.length)
                    {
                        worklistObj.worklistDoctor=rowsPs[0].nom+" "+ rowsPs[0].prenom;
                    }
                }
                worklistObj.worklistLastCrStatus=3;

                let worklist = await dbUtility.saveRecord(worklistObj,"WORKLIST",false);

                if(recuprerRego)
                {
                    let regoObj = {};
                    regoObj.regoId = uuid.v4();
                    regoObj.visitId = patientModel.visitId;
                    regoObj.patientId = patientModel.patientId;
                    regoObj.regoCodeRegime = '1';
                    regoObj.regoCodeCaisse = '1';
                    regoObj.regoCodeCentre = '1';


                     await  dbUtility.saveRecord(regoObj,"REGO",false);

                }
            }
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
         //   console.log(visitMigrationId)
            if(visitMigrationId)
            {
                let filtersExamen=[{name:'idDossier',value:parseInt(visitMigrationId)},{name:'DEL',value:0}];

                let mainTableObject={tableName:'dossier_examen',filters:filtersExamen};
                let joinTablesArray=[];
                joinTablesArray.push({tableName:'examen',fieldsArray:['codeExamen','designationExamen']});

                let _rowsExamen= await dbUtilityCabrad.joinQuery(mainTableObject,joinTablesArray,'no');
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
                    }
                    else return false;
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

    migrateCr: async function (startDate,endDate) {
        let visitId;
        let visitMigrationId;
        let filtersDossier=[];
        filtersDossier.push({name:'visitDate',value1:startDate,value2:endDate,compare:'between'});


        let _visitRowsArray= await dbUtility.read({limit:'no',
            fieldsArray:['visitMigrationId','visitId','doctorId'],filters:filtersDossier}, 'VISIT');
        /*if(_visitRowsArray.length)
        {*/
            for (let i = 0; i < _visitRowsArray.length; i++) {


            visitMigrationId=_visitRowsArray[i].visitMigrationId;
            visitId=_visitRowsArray[i].visitId;
            let filtersExamen=[{name:'id_dossier',value:visitMigrationId,compare:'eq'},{name:'annule',value:0,compare:'eq'}];

            let _rowsExamen= await dbUtilityCabrad.read({filters:filtersExamen},'compte_rendu','');

            if(_rowsExamen && _rowsExamen.length)
            {
                let dataToInsertArray= [];
                _rowsExamen.forEach(function(_rowCr) {
                    let reportObj={};
                    reportObj.reportId=uuid.v4();
                    reportObj.visitMigrationId=_rowCr.id_dossier;
                    reportObj.reportMigrationId=_rowCr.id_compte_rendu;
                    reportObj.studyId=0;
                    reportObj.doctorId=_visitRowsArray[i].doctorId;
                    reportObj.visitId=visitId;
                    reportObj.reportName=_rowCr.titre;
                    reportObj.docName=_rowCr.id_compte_rendu+'.htm';
                    reportObj.reportPath="migrated/"+_rowCr.lien+"/"+reportObj.docName;
                    reportObj.reportHtmlPath=reportObj.reportPath;
                    reportObj.reportContentIsHtml=false;
                  //  _item.reportDate = moment(_item.reportDate).format('Y-MM-DD');
                    reportObj.reportDate=_rowCr.dateheure;
                    reportObj.reportStatus=3; // valide
                    reportObj.active=true;
                    dataToInsertArray.push(reportObj);
                });

                let insertResult=  await dbUtility.insertRecords(dataToInsertArray,"REPORT",false);
            }


        }
    },


};

/*ALTER TABLE public.fpresc
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fpresc
ADD COLUMN "updatedAt" integer;*/

/*ALTER TABLE public.fmalad
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fmalad
ADD COLUMN "updatedAt" integer;*/

 /*ALTER TABLE `fpresc` ADD `createdAt` INT NULL DEFAULT NULL AFTER `specia`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/

/*ALTER TABLE `ident_adm` ADD `createdAt` INT NULL DEFAULT NULL AFTER `id_identite`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `ident_pat` ADD `createdAt` INT NULL DEFAULT NULL AFTER `nir_cle`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `identite` ADD `createdAt` INT NULL DEFAULT NULL AFTER `id_identite`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `dossier_affichage` ADD `createdAt` INT NULL DEFAULT NULL AFTER `examen`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `dossier` ADD `createdAt` INT NULL DEFAULT NULL AFTER `annule`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `orgadest_param_etebac` ADD `createdAt` INT NULL DEFAULT NULL AFTER `libelle`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/




/*ALTER TABLE `specialite` ADD `createdAt` INT NULL DEFAULT NULL AFTER `code_specialite`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `correspondant` ADD `createdAt` INT NULL DEFAULT NULL AFTER `prenom`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `coordonnee` ADD `createdAt` INT NULL DEFAULT NULL AFTER `commentaire`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `commune` ADD `createdAt` INT NULL DEFAULT NULL AFTER `ville`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/

/*ALTER TABLE `user_ps` ADD `createdAt` INT NULL DEFAULT NULL AFTER `id_user`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `user` ADD `createdAt` INT NULL DEFAULT NULL AFTER `obsolete`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `ps_situation` ADD `createdAt` INT NULL DEFAULT NULL AFTER `type_carte`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
/*ALTER TABLE `ps` ADD `createdAt` INT NULL DEFAULT NULL AFTER `obsolete`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/

/*ALTER TABLE `compte_rendu` ADD `createdAt` INT NULL DEFAULT NULL AFTER `annule`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;*/
//MedRisMigration.migratePatient(50000,55000);


//ErisMigration.migratePS();
//ErisMigration.migrateStudiesActe();
//ErisMigration.migrateCorrespondant();
//ErisMigration.migratePatient(49999,1);

//ErisMigration.migrateUserAndDoctor();
//ErisMigration.migrateOrgEtbac();



//ErisMigration.migrateDossier('2021-01-01','2021-06-10',true);

//ErisMigration.migrateCr('2021-01-01','2021-06-10');

//CabradMigration.migratePrescripteurs();
CabradMigration.migratePatient(49999,1);