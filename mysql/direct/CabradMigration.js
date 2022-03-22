const fs = require('fs');
var unrtf = require('unrtf');
let dbUtilityCabrad=require('../common/dbUtilityCabrad');
let dbUtility=require('../common/DbUtility');
//let smartMeDbName='_migrate';
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let CabradMigration = {
    migrationIdPrefix:"",
    siteId:1,
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








    migrateUnPrescripteur:async function(_obj)
    {
        let row = _obj;
        let userModel={};
        userModel.referringPhysicianId=uuid.v4();
        userModel.referringPhysicianMigrationId=CabradMigration.migrationIdPrefix+''+row.oid;
        userModel.referringPhysicianFName="";
        if(row.prenom)
            userModel.referringPhysicianFName=(row.prenom).trim();
        if( userModel.referringPhysicianFName)
        {
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?Ü',"é");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?¥',"ç");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('?ö',"ë");
            userModel.referringPhysicianFName=(userModel.referringPhysicianFName).replace('ã©',"é");

        }
        userModel.referringPhysicianLName="";

        if(row.nom)
            userModel.referringPhysicianLName=(row.nom).trim();
        userModel.referringPhysicianSearch=userModel.referringPhysicianLName +" "+userModel.referringPhysicianFName;

        if(row.teleph)
            userModel.referringPhysicianPhoneNumber=(row.teleph).trim();
        else
            userModel.referringPhysicianPhoneNumber="";

        userModel.referringPhysicianEmail=(row.email).trim();
        userModel.referringPhysicianAddress=(row.adres1).trim();
        if(row.burdis)
            userModel.referringPhysicianAddress+="\n"+(row.codpos).trim()+" "+(row.burdis).trim();

        if(row.code_postal)
            userModel.referringPhysicianZipCode=(row.code_postal).trim();
        else
            userModel.referringPhysicianZipCode="";


        userModel.referringPhysicianGender=0;

        userModel.referringPhysicianTitle = 0;
        userModel.cityId = 0;
        if(row.specia)
            userModel.referringPhysicianSpeciality=(row.specia).trim();
        else
            userModel.referringPhysicianSpeciality="";

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
        if(row.commen)
            patientModel.patientMobileNumber=(row.commen).trim();
        patientModel.patientMobileNumber="";

        if(row.adres1)
         patientModel.patientAddress=(row.adres1).trim();
        else
            patientModel.patientAddress="";
        if(row.adres2)
            patientModel.patientAddress+= "\n "+(row.adres2).trim();
        if(row.codpos)
         patientModel.patientZipCode=(row.codpos).trim();
        else
            patientModel.patientZipCode="" ;
        if(row.burdis && row.codpos)
            patientModel.patientAddress+="\n"+(row.codpos).trim()+" "+(row.burdis).trim();
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
        if(row.prenom)
            patientModel.patientFname=(row.prenom).trim();
        else
            patientModel.patientFname="";
        if(row.nom)
            patientModel.patientLName=(row.nom).trim();
        else
            patientModel.patientLName="";

        if(row.nomjfi)
        patientModel.patientSecondName=(row.nomjfi).trim();
        else
            patientModel.patientSecondName="";

        patientModel.patientPacsId=CabradMigration.migrationIdPrefix+row.codpat;
        patientModel.patientSearch=patientModel.patientLName+" "+patientModel.patientFname;

        patientModel.patientGender=0;
        patientModel.patientTitle=0;

        if(row.codciv)
        {
            if(row.codciv==='M. ') // Mr
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

        if(row.numsec)
        patientModel.patientSocialNumber=(row.numsec).trim();
        else patientModel.patientSocialNumber="";
        if(row.clesec)
        patientModel.patientSocialKey=(row.clesec).trim();
        else
            patientModel.patientSocialKey="";
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

    migrateDossier: async function (startDate, endDate, recuprerRego) {
        let dataToCreate = [];
        let rowDossier;
        let patientModel = {};
        let filtersDossier = [];
        filtersDossier.push({name: 'datexa', value1: startDate, value2: endDate, compare: 'between'});
        //    filtersDossier.push({name:'annule',value:'0',compare:'eq'});
        let rows = await dbUtilityCabrad.read({limit: 'no', filters: filtersDossier}, 'fconsu', '');
        for (let i = 0; i < rows.length; i++) {
            let rowDossier = rows[i];

            let patientId = CabradMigration.migrationIdPrefix + rowDossier.codpat;
            let filters = [{name: 'patientMigrationId', value: "" + patientId + ""}];

            let _patientResultsArray = await dbUtility.read({
                limit: 1,
                filters: filters,
                fieldsArray: ['patientId']
            }, 'PATIENT');

            if (_patientResultsArray && _patientResultsArray.length) {
                let patientObj = _patientResultsArray[0];
                patientModel.visitId = uuid.v4();
                patientModel.siteId = CabradMigration.siteId;
                patientModel.patientId = patientObj.patientId;

                patientModel.establishmentId = null;
                patientModel.visitInvoiceType = 2;
                patientModel.doctorId = 2035;
                patientModel.visitDate = moment(new Date(rowDossier.datexa)).format('Y-M-D');
                // calcul de l'heure cleass ex 911 to 09:11:00
                let timeLenght = (rowDossier.cleass).length;
                patientModel.visitTime = (rowDossier.cleass).slice(-timeLenght, -2) + ':' + (rowDossier.cleass).slice(-2, timeLenght) + ':00';

                patientModel.visitIsBySocialCard = true;
                patientModel.visitIsHospitalized = false;
                patientModel.visitIsUrgent = false;
                patientModel.visitHospitVisitNumber = 0;
                patientModel.visitIsDone = true;
                patientModel.visitMigrationId = CabradMigration.migrationIdPrefix + rowDossier.oid;
                patientModel.visitPacsId = CabradMigration.migrationIdPrefix + rowDossier.oid;
                patientModel.visitCotationStatus = 3;
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
                let worklistStudies = "";

                if ((rowDossier.codex1).trim()) worklistStudies += "|" + (rowDossier.codex1).trim();
                if ((rowDossier.codex2).trim()) worklistStudies += "|" + (rowDossier.codex2).trim();
                if ((rowDossier.codex3).trim()) worklistStudies += "|" + (rowDossier.codex3).trim();
                if ((rowDossier.codex4).trim()) worklistStudies += "|" + (rowDossier.codex4).trim();
                if (worklistStudies.length)
                    worklistStudies = worklistStudies.slice(1);

                worklistObj.worklistDoctor="Reprise";

                worklistObj.worklistStudies = worklistStudies;

                if (rowDossier.codrad) {
                    let rowsPs = await dbUtilityCabrad.read({
                        limit: 'no',
                        filters: [{name: 'codrad', value: rowDossier.codrad}]
                    }, 'fradio', '');
                    if (rowsPs.length) {
                        worklistObj.worklistDoctor = rowsPs[0].nomrad
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
                if (rowDossier.codcsl) {
                    let dataToInsertArray = [];
                    let reportObj = {};
                    reportObj.reportId = uuid.v4();
                    reportObj.visitMigrationId = patientModel.visitMigrationId;
                    reportObj.reportMigrationId = patientModel.visitMigrationId;
                    reportObj.studyId = 0;
                    reportObj.doctorId = patientModel.doctorId;
                    reportObj.visitId = patientModel.visitId;
                    reportObj.reportName = worklistObj.worklistStudies;
                    reportObj.docName = rowDossier.codcsl + '.htm';
                    reportObj.reportPath = "migrated" + "/contren/" + reportObj.docName;
                    reportObj.reportHtmlPath = reportObj.reportPath;
                    reportObj.reportContentIsHtml = false;
                    //  _item.reportDate = moment(_item.reportDate).format('Y-MM-DD');
                    reportObj.reportDate = patientModel.visitDate;
                    reportObj.reportStatus = 3; // valide
                    reportObj.active = true;
                    dataToInsertArray.push(reportObj);
                    let insertResult = await dbUtility.insertRecords(dataToInsertArray, "REPORT", false);
                }
            }
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
/*
ALTER TABLE public.fpresc
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fpresc
ADD COLUMN "updatedAt" integer;

ALTER TABLE public.fmalad
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fmalad
ADD COLUMN "updatedAt" integer;

ALTER TABLE public.fconsu
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fconsu
ADD COLUMN "updatedAt" integer;

ALTER TABLE public.fradio
ADD COLUMN "createdAt" integer;
ALTER TABLE public.fradio
ADD COLUMN "updatedAt" integer;
*/

//CabradMigration.migratePrescripteurs();
//CabradMigration.migratePatient(80000,0);
CabradMigration.migrateDossier('2017-01-01','2017-12-31',false);




