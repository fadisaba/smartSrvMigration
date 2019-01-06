'use strict';
let models = require('../models');
let uuid = require('node-uuid');
class StatReq {
    constructor() {
    }
    getChiffreAffaireReglementVisitNumber(_startDateSql,_endDateSql,_doctorId,_siteId)
    {
        let dbUtility = global.App.DbUtility;
        let CA=0;
        let reglement=0;
        let visitNumber=0;
        let visitFiltersArray=[];
        visitFiltersArray.push({name:'visitDate',value1:_startDateSql,value2:_endDateSql,compare:'between'});
        if(_doctorId)
            visitFiltersArray.push({name:'doctorId',value:_doctorId,compare:'eq'});
        if(_siteId)
            visitFiltersArray.push({name:'siteId',value:_siteId,compare:'eq'});

        let mainTableObject={tableName:'VISIT',fieldsArray:['visitId'],filters:visitFiltersArray};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'VISIT_BALANCE'});

        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(function(_resultArray)
            {
                _resultArray.forEach(_item=>{
                    CA+=  Math.round((_item['VisitBalance.visitBalancePatientAmount']+_item['VisitBalance.visitBalanceRegoAmount']+_item['VisitBalance.visitBalanceRegcAmount'])*100)/100;
                    visitNumber++;
                    reglement+=Math.round((_item['VisitBalance.visitBalancePatientPaidAmount']+_item['VisitBalance.visitBalanceRegoPaidAmount']+_item['VisitBalance.visitBalanceRegcPaidAmount'])*100)/100;
                });
                CA=Math.round((CA)*100)/100;
                reglement=Math.round((reglement)*100)/100;

                let result={
                    ca:CA,
                    regle:reglement,
                    nbVisit:visitNumber,
                    doctorId:_doctorId,
                    siteId:_siteId

                };
                return Promise.resolve(result)
            });


    }
    getStudyVisitNumber(_startDateSql,_endDateSql,_doctorId,_siteId)
    {
        let dbUtility = global.App.DbUtility;
        let studyVisitNumber;
        let visitFiltersArray=[];
        visitFiltersArray.push({name:'visitDate',value1:_startDateSql,value2:_endDateSql,compare:'between'});
        if(_doctorId)
            visitFiltersArray.push({name:'doctorId',value:_doctorId,compare:'eq'});
        if(_siteId)
            visitFiltersArray.push({name:'siteId',value:_siteId,compare:'eq'});

        let mainTableObject={tableName:'VISIT',fieldsArray:['visitId'],filters:visitFiltersArray};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'STUDY_VISIT',fieldsArray:['studyVisitId']});

        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(function(_resultArray)
            {
                let result={
                    studyVisitNumber:_resultArray.length,
                    doctorId:_doctorId,
                    siteId:_siteId
                };
                return Promise.resolve(result)
            });
    }
}
module.exports = StatReq;
