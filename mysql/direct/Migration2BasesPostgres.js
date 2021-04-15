let uuid = require('node-uuid');
let dbUtility = require('../common/DbUtility');
let moment = require('../node_modules/moment');
let Migration = {


deleteExistingPatient:async function()
{
    let logArr=[];
    let patientMigrateArray= await dbUtility.read({filters:[{name:'patientMigrationField',compare:'notnull'}],limit:'no'},
        "patient","_migrate");
    for (let i = 0; i < patientMigrateArray.length; i++) {
        let models = require("../models");
        let query='select * from patient where  "deletedAt" is null and "patientId"= \''+patientMigrateArray[i].patientId+'\'';
        let Sequelize = require("sequelize");
        let resultRows=await models.sequelize.query(
            query
            , {type: Sequelize.QueryTypes.SELECT});
        if(resultRows.length)
            logArr.push(resultRows[0].patientId);

    }
    console.log(logArr);
}    ,
        migratePatient:async function()
        {
            let patientUpdated=0;
            let patientInserted=0;
            let filtersArray=[{name:"patientMigrationField",compare:'notnull'}];
            let patientMigrateArray= await dbUtility.read({filters:filtersArray,limit:'no'}, "patient","_migrate");
            patientMigrateArray.forEach(_item=>{
                _item.patientBirthday=moment(_item.patientBirthday).format('Y-MM-DD');
            });
            let models = require("../models");
            let Sequelize = require("sequelize");

            for (let i = 0; i < patientMigrateArray.length; i++) {
                patientMigrateArray[i].patientBirthday=moment(patientMigrateArray[i].patientBirthday).format('Y-MM-DD');


                let query='select * from patient where  "deletedAt" is not null and "patientId"= \''+patientMigrateArray[i].patientId+'\'';

                let resultRows=await models.sequelize.query(
                    query
                    , {type: Sequelize.QueryTypes.SELECT});
                if(resultRows.length)
                {
                    let query='update patient set   "deletedAt" = null where  "patientId"= \''+patientMigrateArray[i].patientId+'\'';

                    await models.sequelize.query(
                        query
                        , {type: Sequelize.QueryTypes.SELECT});
                    patientUpdated++;
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
        let filtersArray = [{name: "visitMigrationId", compare: 'notnull'}];
        //    let filtersArray=[];
        filtersArray.push({name: 'visitDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "visit", "_migrate");
       /* visitMigrateArray.forEach(function (_item) {
            _item.visitDate = moment(_item.visitDate).format('Y-MM-DD');
        });*/
        for (let i = 0; i < visitMigrateArray.length; i++) {
            visitMigrateArray[i].visitDate = moment(visitMigrateArray[i].visitDate).format('Y-MM-DD');
           // await dbUtility.insertRecords([visitMigrateArray[i]], "visit", false);
        }

       let resultArray =await dbUtility.insertRecords(visitMigrateArray, "visit", false);
        console.log(": migration visit successful");
        return 'test';

    },

    migrateWorklist: async function (_sqlStartDate, _sqlEndDate) {
        //let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];

        let filtersArray=[{name:"visitMigrationDate",compare:'notnull'}];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let worklistMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "worklist", "_migrate");

        let resultArray = await  dbUtility.insertRecords(worklistMigrateArray, "worklist", false);
        console.log(": migration worklist successful");
        return resultArray;

    },

    migrateReport: async function (_sqlStartDate, _sqlEndDate) {
        let filtersArray=[{name:"reportMigrationId",compare:'notnull'}];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let reportMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "report", "_migrate");
        reportMigrateArray.forEach(function (_item) {
            _item.reportDate = moment(_item.reportDate).format('Y-MM-DD');
        });

        let resultArray = await dbUtility.insertRecords(reportMigrateArray, "report", false);
        console.log(": migration report successful");
        return resultArray;

    },

    migrateRego: async function (_sqlStartDate, _sqlEndDate) {
        //  let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let filtersArray = [];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let regoMigrateArray = await dbUtility.read({limit: "no", filters: filtersArray}, "REGO", "_migrate");

        let resultArray = await dbUtility.insertRecords(regoMigrateArray, "REGO", false);
        console.log(": migration REGO successful");
        return resultArray;

    },

    migrateVisitBalance: async function (_sqlStartDate, _sqlEndDate) {
        //  let filtersArray=[{name:"visitMigrationId",compare:'notnull'}];
        let filtersArray = [];
        filtersArray.push({name: 'visitMigrationDate', value1: _sqlStartDate, value2: _sqlEndDate, compare: 'between'});
        let visitBalanceMigrateArray = await dbUtility.read({
            limit: "no",
            filters: filtersArray
        }, "VISIT_BALANCE", "_migrate");

        let resultArray = await dbUtility.insertRecords(visitBalanceMigrateArray, "VISIT_BALANCE", false);
        console.log(": migration VISIT_BALANCE successful");
        return resultArray;

    },


    migrateAllTable: async function (_sqlStartDate, _sqlEndDate) {

        await Migration.migrateVisit(_sqlStartDate, _sqlEndDate);
        await Migration.migrateWorklist(_sqlStartDate, _sqlEndDate);
        await Migration.migrateReport(_sqlStartDate, _sqlEndDate);
      // await Migration.migrateRego(_sqlStartDate, _sqlEndDate);
       // await Migration.migrateVisitBalance(_sqlStartDate, _sqlEndDate);
        console.log(": migration ALL successful");

    }

};

//Migration.deleteExistingPatient();
//Migration.migratePatient(); // 2
Migration.migrateAllTable('2016-07-01', '2016-12-31');// ok 2020 -2019 -2018
