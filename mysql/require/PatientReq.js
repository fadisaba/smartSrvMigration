'use strict';
let models  = require('../models');
let Sequelize = require("sequelize");

let PatientReq = {
	getReportsForHistory: function(_patientId){
		let patientId=_patientId;
        let promise=new Promise(
    function(resolve, reject) {
        let dbUtility = global.App.DbUtility;

        let mainTableObject={};
		mainTableObject.tableName='REPORT';
		mainTableObject.fieldsArray=[['reportPath', 'path'],['reportHtmlPath', 'htmlPath'],['reportName', 'name']];
        let joinTablesArray=[];
		joinTablesArray.push(
			{
				tableName:'VISIT',
				filters:[{name:'patientId',value:patientId,nolike:true}],
				fieldsArray:['visitDate']
			});
		dbUtility.joinQuery(mainTableObject,joinTablesArray)
			.then(_resultArray=>{
                _resultArray.forEach(_item=>{
                   _item.docDate=_item['Visit.visitDate'];
                });
				resolve(_resultArray);
			});

		//var where={where:{active:true}};
		//query.where=where;
		/*var visitInclude={};
		visitInclude.model=models.Visit;
		visitInclude.include=[
			{
				model:models.Patient,
				where:{patientId:patientId},
				attributes:[]

			}
		];
		visitInclude.attributes=[['visitDateTime', 'docDate']];

		query.include.push(visitInclude);

		models.Report.findAll(query).then(function(results) {
			resolve(results);
		});*/

     });
 return promise;

	},
    getPatientNewNumber:function(_addNumber)
    {
        let dbUtility = global.App.DbUtility;
        let addNumber=_addNumber||1;

        return dbUtility.updateField("COUNTER",
            {"counterValue": Sequelize.literal('"counterValue" +'+ addNumber+'')},
            {counterName:'patientNumber'})
            .then(_result=>{
                let paramsCounter = {};
                paramsCounter.filters = [{name: 'counterName', value: 'patientNumber',compare:'eq'}];
                return dbUtility.read(paramsCounter, 'COUNTER')
            })
    },
	addPatient:function(_patientDataObj){
		  let dbUtility = global.App.DbUtility;
        	return PatientReq.getPatientNewNumber(1)
            .then(_resultPatientNumberArray=>{
                let dbUtility = global.App.DbUtility;
                _patientDataObj.patientPacsId=_resultPatientNumberArray[0].counterValue;
                return dbUtility.saveRecord(_patientDataObj,'PATIENT');
            });
	},
    updatePatient:function(_patientDataObj){
        let dbUtility = global.App.DbUtility;
        return dbUtility.saveRecord(_patientDataObj,'PATIENT');
    }
};



module.exports = PatientReq;
