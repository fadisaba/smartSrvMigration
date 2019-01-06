let models  = require('../models');
let Sequelize = require("sequelize");
let WorklistGeneratorReq=require("../require/WorklistGeneratorReq");
let Hl7GeneratorReq=require("../require/Hl7GeneratorReq");
let VisitReq = {
    saveStudyInWorklist:function(_visitId)
    {
        let dbUtility= global.App.DbUtility;
        return new Promise(
            function (resolve, reject) {
                let studiesCodeArray=[];
                let studiesIdsArray=[];

                let mainTable={};
                mainTable.tableName="STUDY_VISIT";
                mainTable.filters=[{name:'visitId',value:_visitId}];
                let joinTablesArray=[
                    {
                        tableName:"STUDY",joinObject :{
                            tableName:'STUDY_ACTE',

                        }
                    }

                ];

                dbUtility.joinQuery(mainTable,joinTablesArray)
                    .then(_resStudiesVisitArray=>{
                        _resStudiesVisitArray.forEach(_studyVisitObject=> {
                            if(studiesIdsArray.indexOf(_studyVisitObject.studyId)===-1)
                            {
                                studiesCodeArray.push(_studyVisitObject['Study.studyCode']);
                                studiesIdsArray.push(_studyVisitObject.studyId);
                            }

                            }
                        );
                        let worklistModel={};
                        worklistModel.idName="worklistId";
                        worklistModel.idValue=_visitId;
                        worklistModel.worklistStudies=studiesCodeArray.join("|");
                        worklistModel.worklistStudiesIds=studiesIdsArray.join("|");
                        global.App.DbUtility.saveRecord(worklistModel,"worklist")
                            .then(resolve).catch(reject);
                    })
            }
        );
    },
    deleteStudyVisitAndVisitStudyHasActe:function(_studyVisitId,_transac)
    {
        return new Promise(
            function (resolve, reject) {

                if(!_studyVisitId)
                    throw Error('deleteStudyVisitAndVisitStudyµHasActe : _studyVisitId is undefined');
                let dbUtility= global.App.DbUtility;
                return dbUtility.deleteRecordById('STUDY_VISIT','studyVisitId',_studyVisitId,_transac)
                    .then(
                        _res=>
                        {
                             return dbUtility.deleteRecordById('STUDY_VISIT_HAS_ACTE','studyVisitId',_studyVisitId,_transac);}
                    )
                    .then(resolve).catch(reject);
            }
        );

    },
    getStudyVisitNewNumber:function(_addNumber)
    {
        let dbUtility = global.App.DbUtility;
        let addNumber=_addNumber||1;

        return dbUtility.updateField("COUNTER",
            {"counterValue": Sequelize.literal('"counterValue" +'+ addNumber+'')},
            {counterName:'studyVisitNumber'})
            .then(_result=>{
                let paramsCounter = {};
                paramsCounter.filters = [{name: 'counterName', value: 'studyVisitNumber'}];
                return dbUtility.read(paramsCounter, 'COUNTER')
            })
    },
    getVisitNewNumber:function(_addNumber)
    {
        let dbUtility = global.App.DbUtility;
        let addNumber=_addNumber||1;

        return dbUtility.updateField("COUNTER",
            {"counterValue": Sequelize.literal('"counterValue" +'+ addNumber+'')},
            {counterName:'visitNumber'})
            .then(_result=>{
                let paramsCounter = {};
                paramsCounter.filters = [{name: 'counterName', value: 'visitNumber'}];
                return dbUtility.read(paramsCounter, 'COUNTER')
            })
    },
    closeVisit:function(_visitId,_visitIsDone)
    {
        let dbUtility = global.App.DbUtility;
        let visitIsDone;
        if(_visitIsDone)
            visitIsDone=false;
        else
            visitIsDone=true;
        return dbUtility.updateField("VISIT",
            {"visitIsDone": visitIsDone},
            {visitId:_visitId})
            .then(_result=>{
                let worklistGeneratorReq=new WorklistGeneratorReq();
                return worklistGeneratorReq.deleteWorklistFileByVisitId(_visitId);
            })
    },
    generateWorklistAndOrmByVisitId(_visitId)
    {
        let dbUtility = global.App.DbUtility;

         let mainTableObject={tableName:'STUDY_VISIT',fieldsArray:['studyId','studyVisitId'],
             filters:[{name:'visitId',value:_visitId}]};
         let joinTablesArray=[];
         joinTablesArray.push({tableName:'STUDY',fieldsArray:['studyId'],
             filters:[{name:'studyGenerateDicomWl',value:true}]});
        let promiseArray=[];
        let worklistXml=new WorklistGeneratorReq();
        let hl7GeneratorReq=new Hl7GeneratorReq();

         return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
             .then(_resultStudyArrayResult=>{
                 _resultStudyArrayResult.forEach(_studyVisitObj=>{
                     promiseArray.push(worklistXml.generateWorklist(_studyVisitObj.studyVisitId,_studyVisitObj.studyId));
                     promiseArray.push(hl7GeneratorReq.generateOrmMsgByStudyVisitId("SC","SC",_studyVisitObj.studyId,_studyVisitObj.studyVisitId));
                 });
                 return Promise.all(promiseArray);
             });
    },
    checkIfVisitCanBeDeleted:function(_visitId)
    {
        let dbUtility= global.App.DbUtility;
        if(!_visitId)
            throw Error('deleteVisit : _visitId is undefined');
        let invoiceFilters = [
            {name: 'visitId', value: _visitId},
            {name: 'invoiceIsValidated', value: true, compare: 'eq'},//is validated
            {name: 'invoiceIsCancelled', value: false, compare: 'eq'},// is not cancelled
        ];
        let paramsInvoice = {};
        paramsInvoice.filters = invoiceFilters;
        return dbUtility.read(paramsInvoice, 'INVOICE')
            .then(_InvoicesArray => {
                return (!_InvoicesArray.length);// there si an invoice for this visit witch is not cancelled
            });
    },
    deleteVisit:function(_visitId,_transac)
    {
        return new Promise(
            function (resolve, reject) {

                if(!_visitId)
                    throw Error('deleteVisit : _visitId is undefined');

                let dbUtility= global.App.DbUtility;
                return VisitReq.checkIfVisitCanBeDeleted(_visitId)
                    .then(_resultBool=>{
                        if(_resultBool)
                            return dbUtility.deleteRecordById('STUDY_VISIT_HAS_ACTE','visitId',_visitId,_transac);
                        else throw Error('Suppression impossible, une facture a été validée');
                    })
                    .then(
                        _res=>
                        {
                            return dbUtility.deleteRecordById('STUDY_VISIT','visitId',_visitId,_transac);}
                    )
                    .then(
                        _res=>
                        {
                            return dbUtility.deleteRecordById('VISIT_BALANCE','visitId',_visitId,_transac);
                        }
                    )
                    .then(
                        _res=>
                        {
                            return dbUtility.deleteRecordById('VISIT','visitId',_visitId,_transac);
                        }
                    )
                    .then(
                        _res=>
                        {
                            return dbUtility.deleteRecordById('WORKLIST','visitId',_visitId,_transac);
                        }
                    )
                    .then(resolve).catch(reject);
            }
        );
    }
};
module.exports = VisitReq;