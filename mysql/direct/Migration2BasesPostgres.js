let uuid = require('node-uuid');
let dbUtility = require('../common/DbUtility');
let moment = require('../node_modules/moment');
let Migration = {

 dataBaseToMigrate:"_migrate",

        migratePatient:async function()
        {
            let patientUpdated=0;
            let patientInserted=0;
            let filtersArray=[];
            let patientMigrateArray= await dbUtility.read({filters:filtersArray,limit:'no'}, "patient",Migration.dataBaseToMigrate);
            patientMigrateArray.forEach(_item=>{
                _item.patientBirthday=moment(_item.patientBirthday).format('Y-MM-DD');
            });
            let models = require("../models");
            let Sequelize = require("sequelize");

            for (let i = 0; i < patientMigrateArray.length; i++) {
                patientMigrateArray[i].patientBirthday=moment(patientMigrateArray[i].patientBirthday).format('Y-MM-DD');


                let query='select * from patient where    "patientId"= \''+patientMigrateArray[i].patientId+'\'';

                let resultRows=await models.sequelize.query(
                    query
                    , {type: Sequelize.QueryTypes.SELECT});
                if(resultRows.length)
                {
                }
                else{
                    await dbUtility.insertRecords([patientMigrateArray[i]], "patient", false);
                    patientInserted++;
                }


                // await dbUtility.insertRecords([visitMigrateArray[i]], "visit", false);
            }
          //  let result= await  dbUtility.insertRecords(patientMigrateArray,"patient",false);
            console.log("migration patient successful");
            console.log("inserted "+patientInserted);
            console.log("updated "+patientUpdated);
            return "test";

        },
    migrateVisit: async function (_sqlStartDate, _sqlEndDate) {
        let filtersArray = [];
            let nb=0;
       // filtersArray.push({name: 'visitDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "visit", Migration.dataBaseToMigrate);

        for (let i = 0; i < visitMigrateArray.length; i++) {
            visitMigrateArray[i].visitDate = moment(visitMigrateArray[i].visitDate).format('Y-MM-DD');

            await dbUtility.insertRecords([visitMigrateArray[i]], "visit", false);
            nb++;
        }

     //  let resultArray =await dbUtility.insertRecords(visitMigrateArray, "visit", false);
        console.log("visit inserted "+nb);

        return 'test';

    },

    migrateWorklist: async function (_sqlStartDate, _sqlEndDate) {
        //let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let nb=0;
        let filtersArray=[];
     //   filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let worklistMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "worklist", Migration.dataBaseToMigrate);

        for (let i = 0; i < worklistMigrateArray.length; i++) {

            await dbUtility.insertRecords([worklistMigrateArray[i]], "worklist", false);
            nb++;
        }

       // let resultArray = await  dbUtility.insertRecords(worklistMigrateArray, "worklist", false);
        console.log("worklist inserted "+nb);
        return nb;

    },
    migrateRego: async function (_sqlStartDate, _sqlEndDate) {
        let nb=0;
        let filtersArray = [];
      //  filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let regoMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "REGO", Migration.dataBaseToMigrate);
        for (let i = 0; i < regoMigrateArray.length; i++) {

           let res= await dbUtility.read({limit: "no", filters: [{name:'regoId',value:regoMigrateArray[i].regoId,compare:'eq'}]}, "REGO");
            if(res.length===0){
                let res2= await dbUtility.read({limit: "no", filters: [{name:'patientId',value:regoMigrateArray[i].patientId,compare:'eq'}]}, "patient");
                if(res2.length) {
                    await dbUtility.insertRecords([regoMigrateArray[i]], "REGO", false);
                    nb++;
                }
            }

        }

        console.log("REGO inserted "+nb);
        return nb;

    },
    migrateVisitBalance: async function (_sqlStartDate, _sqlEndDate) {
        let nb=0;
        let filtersArray = [];

       // filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitBalanceMigrateArray = await dbUtility.read({
            limit: "no",
            filters: filtersArray
        }, "VISIT_BALANCE", Migration.dataBaseToMigrate);

        for (let i = 0; i < visitBalanceMigrateArray.length; i++) {

            await dbUtility.insertRecords([visitBalanceMigrateArray[i]], "VISIT_BALANCE", false);
            nb++;
        }

        // let resultArray = await  dbUtility.insertRecords(worklistMigrateArray, "worklist", false);
        console.log("VISIT_BALANCE inserted "+nb);
        return nb;


    },
    migrateRegc: async function (_sqlStartDate, _sqlEndDate) {
        let nb=0;
        let filtersArray = [];
        //  filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let regoMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "REGC", Migration.dataBaseToMigrate);
        for (let i = 0; i < regoMigrateArray.length; i++) {

            let res= await dbUtility.read({limit: "no", filters: [{name:'regcId',value:regoMigrateArray[i].regoId,compare:'eq'}]}, "REGC");
            if(res.length===0){
                let res2= await dbUtility.read({limit: "no", filters: [{name:'patientId',value:regoMigrateArray[i].patientId,compare:'eq'}]}, "patient");
                if(res2.length) {
                    await dbUtility.insertRecords([regoMigrateArray[i]], "REGC", false);
                    nb++;
                }
            }
        }

        console.log("REGC inserted "+nb);
        return nb;

    },
    migrateReport: async function (_sqlStartDate, _sqlEndDate) {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "report", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            _item.reportDate = moment(_item.reportDate).format('Y-MM-DD');
            _item.reportPath = "sav/"+_item.reportPath;
            _item.reportHtmlPath = "sav/"+_item.reportHtmlPath;
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "report", false);
        console.log(reportMigrateArray.length +": migration report successful");
        return resultArray;
    },

    migrateInvoice: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "invoice", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            _item.invoiceDate = moment(_item.invoiceDate).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "invoice", false);
        console.log(reportMigrateArray.length +": migration invoice successful");
        return resultArray;
    },

    migrateAccounting_entry: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "accounting_entry", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            _item.invoiceDate = moment(_item.invoiceDate).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "accounting_entry", false);
        console.log(reportMigrateArray.length +": migration accounting_entry successful");
        return resultArray;
    } ,
    migrateInvoice_has_fse: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "invoice_has_fse", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.invoiceHasFseDateMiseEnLot)
                _item.invoiceHasFseDateMiseEnLot = moment(_item.invoiceHasFseDateMiseEnLot).format('Y-MM-DD');
            if(_item.invoiceHasFseDateTeletransmission)
                _item.invoiceHasFseDateTeletransmission = moment(_item.invoiceHasFseDateTeletransmission).format('Y-MM-DD');
           // _item.invoiceHasFseDateDreTeletransmission = moment(_item.invoiceHasFseDateDreTeletransmission).format('Y-MM-DD');
            if(_item.invoiceHasFseDateRetourNoemi)
            _item.invoiceHasFseDateRetourNoemi = moment(_item.invoiceHasFseDateRetourNoemi).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "invoice_has_fse", false);
        console.log(reportMigrateArray.length +": migration invoice_has_fse successful");
        return resultArray;
    },
    migratePayment: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "payment", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.paymentEntryDate)
                _item.paymentEntryDate = moment(_item.paymentEntryDate).format('Y-MM-DD');
            if(_item.paymentDate)
                _item.paymentDate = moment(_item.paymentDate).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "payment", false);
        console.log(reportMigrateArray.length +": migration payment successful");
        return resultArray;
    },
    migrateInvoiceHasPayment: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "invoice_has_payment", Migration.dataBaseToMigrate);


        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "invoice_has_payment", false);
        console.log(reportMigrateArray.length +": migration invoice_has_payment successful");
        return resultArray;
    },
    migratePatient_doc: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "patient_doc", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.patientDocDate)
                _item.patientDocDate = moment(_item.patientDocDate).format('Y-MM-DD');
                    _item.patientDocPath = "sav/"+_item.patientDocPath;
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "patient_doc", false);
        console.log(reportMigrateArray.length +": migration patient_doc successful");
        return resultArray;
    },
    migratePatientMerge: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "patient_merge", Migration.dataBaseToMigrate);
        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "patient_merge", false);
        console.log(reportMigrateArray.length +": migration PatientMerge successful");
        return resultArray;
    },
    migrateReportHeader: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "report_header", Migration.dataBaseToMigrate);

        let newArray=[];
        for (let i = 0; i < reportMigrateArray.length; i++) {


            let res= await dbUtility.read({limit: "no", filters: [{name:'reportId',value:reportMigrateArray[i].reportId,compare:'eq'}]}, "report");
                if(res.length) {
                    newArray.push(reportMigrateArray[i]);
                }

        }
        let resultArray = await dbUtility.insertRecords(newArray, "report_header", false);
        console.log(newArray.length +": migration ReportHeader successful");
        return resultArray;
    },

    migrateRsp: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "rsp", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.rspMoneyTransferDate)
                _item.rspMoneyTransferDate = moment(_item.rspMoneyTransferDate).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "rsp", false);
        console.log(reportMigrateArray.length +": migration rsp successful");
        return resultArray;
    },
    migrateRspFse: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "rsp_fse", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.rspFseDateVirement)
                _item.rspFseDateVirement = moment(_item.rspFseDateVirement).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "rsp_fse", false);
        console.log(reportMigrateArray.length +": migration RspFse successful");
        return resultArray;
    },
    migrateRspHasPayment: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "rsp_has_payment", Migration.dataBaseToMigrate);


        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "rsp_has_payment", false);
        console.log(reportMigrateArray.length +": migration RspHasPayment successful");
        return resultArray;
    },
    migrateStudyVisit: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "study_visit", Migration.dataBaseToMigrate);


        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "study_visit", false);
        console.log(reportMigrateArray.length +": migration StudyVisit successful");
        return resultArray;
    },
    migrateStudyVisitHasActe: async function () {
        let filtersArray=[];
        //filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "study_visit_has_acte", Migration.dataBaseToMigrate);
        reportMigrateArray.forEach(function (_item) {
            if(_item.studyVisitHasActeDateEntentePrealable)
                _item.studyVisitHasActeDateEntentePrealable = moment(_item.studyVisitHasActeDateEntentePrealable).format('Y-MM-DD');

            if(_item.studyVisitHasActeDateActe)
                _item.studyVisitHasActeDateActe = moment(_item.studyVisitHasActeDateActe).format('Y-MM-DD');

        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "study_visit_has_acte", false);
        console.log(reportMigrateArray.length +": migration StudyVisitHasActe successful");
        return resultArray;
    },

};


//Migration.migratePatient(); // 2
//Migration.migrateVisit(); // 2
//Migration.migrateWorklist(); // 3
//Migration.migrateVisitBalance(); // 4
//Migration.migrateRego(); // 5
//Migration.migrateRegc(); // 6
//Migration.migrateReport(); // è
//Migration.migrateInvoice(); // è
//Migration.migrateAccounting_entry(); // è
//Migration.migrateInvoice_has_fse(); // è
//Migration.migratePayment(); // è
//Migration.migrateInvoiceHasPayment(); // è
//Migration.migratePatient_doc(); // è
//Migration.migratePatientMerge(); // è
//Migration.migrateReportHeader(); // è
//Migration.migrateRsp();
//Migration.migrateRspFse();
//Migration.migrateRspHasPayment();
//Migration.migrateStudyVisit();
//Migration.migrateStudyVisitHasActe();

