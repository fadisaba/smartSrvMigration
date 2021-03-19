let uuid = require('node-uuid');
let dbUtility = require('../common/DbUtility');
let moment = require('../node_modules/moment');
let Migration = {
    /*
        migratePatient:async function()
        {
            let filtersArray=[{name:"patientMigrationId",value:'A11045572941'}];
            let patientMigrateArray= await dbUtility.read({limit:"1",filters:filtersArray}, "patient","_migrate");
            patientMigrateArray[0].patientId=uuid.v4();
            patientMigrateArray[0].patientBirthday=moment(patientMigrateArray[0].patientBirthday).format('Y-M-D');
            let patientArrray=dbUtility.insertRecords(patientMigrateArray,"patient",false);
            console.log("migration patient successful");

        },*/
    migrateVisit: async function (_sqlStartDate, _sqlEndDate) {
        let filtersArray = [{name: "visitMigrationId", compare: 'notnull'}];
        //    let filtersArray=[];
        filtersArray.push({name: 'visitDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "visit", "_migrate");
        visitMigrateArray.forEach(function (_item) {
            _item.visitDate = moment(_item.visitDate).format('Y-M-D');
        });

        let resultArray = dbUtility.insertRecords(visitMigrateArray, "visit", false);
        console.log(": migration visit successful");

    },

    migrateWorklist: async function (_sqlStartDate, _sqlEndDate) {
        //let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let filtersArray = [];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let worklistMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "worklist", "_migrate");

        let resultArray = dbUtility.insertRecords(worklistMigrateArray, "worklist", false);
        console.log(": migration worklist successful");

    },

    migrateReport: async function (_sqlStartDate, _sqlEndDate) {
        let filtersArray=[{name:"reportMigrationId",compare:'notnull'}];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "report", "_migrate");

        let resultArray = dbUtility.insertRecords(reportMigrateArray, "report", false);
        console.log(": migration report successful");

    },

    migrateRego: async function (_sqlStartDate, _sqlEndDate) {
        //  let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let filtersArray = [];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let regoMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "REGO", "_migrate");

        let resultArray = dbUtility.insertRecords(regoMigrateArray, "REGO", false);
        console.log(": migration REGO successful");

    },

    migrateVisitBalance: async function (_sqlStartDate, _sqlEndDate) {
        //  let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let filtersArray = [];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitBalanceMigrateArray = await dbUtility.read({
            limit: "no",
            filters: filtersArray
        }, "VISIT_BALANCE", "_migrate");

        let resultArray = dbUtility.insertRecords(visitBalanceMigrateArray, "VISIT_BALANCE", false);
        console.log(": migration VISIT_BALANCE successful");

    },


    migrateAllTable: async function (_sqlStartDate, _sqlEndDate) {

        await Migration.migrateVisit(_sqlStartDate, _sqlEndDate);
        await Migration.migrateWorklist(_sqlStartDate, _sqlEndDate);
        await Migration.migrateReport(_sqlStartDate, _sqlEndDate);
        await Migration.migrateRego(_sqlStartDate, _sqlEndDate);
        await Migration.migrateVisitBalance(_sqlStartDate, _sqlEndDate);
        console.log(": migration VISIT_BALANCE successful");

    }

};
//Migration.migrateAllTable('2021-02-05', '2021-02-05');