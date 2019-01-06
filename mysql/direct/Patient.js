let PatientReq  = require('../require/PatientReq');
let commonFunctions=require("../common/CommonFunctions");
let Hl7GeneratorReq=require("../require/Hl7GeneratorReq");
'use strict';
 let Patient = {
	 getPatientHistory:function(params, callback){
//@meta patientId,isDoctor
// previous comment is mandatory if we want to use metadata option
         let patientId=params.metadata.patientId;
         let isDoctor=params.metadata.isDoctor;
		 let dbUtility = global.App.DbUtility;
		 let p1=PatientReq.getReportsForHistory(patientId);

		 let mainTableObject={};
		 mainTableObject.tableName='PATIENT_DOC';
         mainTableObject.fieldsArray=[['patientDocPath', 'path'],['patientDocPath', 'htmlPath'],['patientDocName', 'name']];
         let joinTablesArray=[];
		 joinTablesArray.push(
             {
                 tableName:'VISIT',
                 filters:[{name:'patientId',value:patientId}],
                 fieldsArray:['visitDate','doctorId']
         },
             {
                 tableName:'DOC_TYPE',
                 fieldsArray:['docTypeName','docTypeId']
             });
		 let p2=dbUtility.joinQuery(mainTableObject,joinTablesArray);
		 let promiseArray=[p1];
		 if(!isDoctor)
         {
             promiseArray.push(p2);
         }

		 Promise.all(promiseArray).then(function(values) {
		     if(values[1]&& values[1].length)
             {
                 values[1].forEach(_item=>{
                     _item.docDate=_item['Visit.visitDate'];
                    _item.type=_item['DocType.docTypeName'];
                    _item.doctor=_item['Visit.doctorId'];
                 });
             }
			 let result=values[0];
		     if(values[1])
		         result=result.concat(values[1]);
				 callback(null, {
					 data: result,
					 success:true,
					 msg:''
				 });
		 },
			 function(err) {
				 console.error(err);
				 callback(null, {
					 data: [],
					 success:false,
					 msg:'Error'
				 });
			 });
	 },
	searchPatient: function(data, callback){
		var queryTexte=data.query;
		var page=data.page||0;
		var start=data.start||0;
		var limit=data.limit||20;

		        var mainTableObject={};
		        mainTableObject.tableName='PATIENT';
        		mainTableObject.filters=[];
        		if(queryTexte.indexOf("-")===4 && queryTexte.length===10)//il s'agit de la date de naissance FORMAT yyyy-mm-dd
				{
                    mainTableObject.filters.push({
                        name:'patientBirthday',value:queryTexte
                    });
				}
				else{
                    mainTableObject.filters.push({
                        name:'patientSearch',value:queryTexte,startBy:true
                    });
				}
		        var joinTablesArray=[];
		        joinTablesArray.push({tableName:'CITY',required:false});
		global.App.DbUtility.joinQuery(mainTableObject,joinTablesArray,20)
		.then(function(rows){
			rows.forEach(_row=>{
				_row.cityName=_row['City.cityName'];
			});
			callback(null, {
				data: rows,
				success:true,
				msg:''

			});
		})
			.catch(function(error)
			{

				console.error(error);
				callback(null, {
					data: [],
					success:false,
					msg:'Error'

				});
			});
	},

     addPatient: function (params, callback) {
         try {
             if (!params.dataToBeSaved)
                 throw Error(' dataToBeSaved :  is undefined');

             let promise = PatientReq.addPatient(params.dataToBeSaved);
             promise
                 .then(_result=> {
                     /** Generate hl7 files****/
                     let hl7GeneratorReq=new Hl7GeneratorReq();
                     hl7GeneratorReq.generatePatientCreateMsgByPatientId(params.dataToBeSaved.patientId,params.siteId);
                     callback(null, {
                         data: _result,
                         success: true,
                         msg: ''

                     });
                 }).catch(_err=> {
                 console.error(_err.stack);
                 callback(null, {
                     data: [],
                     success: false,
                     msg: _err.message
                 });
             });


         }
         catch (_err) {
             commonFunctions.catchWidthCallback(_err, callback);
         }
     },
     updatePatient: function (params, callback) {
         try {
             if (!params.dataToBeSaved)
                 throw Error(' dataToBeSaved :  is undefined');

             let promise = PatientReq.updatePatient(params.dataToBeSaved);
             promise.then(_result=> {
                 /** Generate hl7 files****/
                 let hl7GeneratorReq=new Hl7GeneratorReq();
                 hl7GeneratorReq.generatePatientCreateMsgByPatientId(params.dataToBeSaved.patientId,params.siteId);
                 callback(null, {
                     data: _result,
                     success: true,
                     msg: ''

                 });
             }).catch(_err=> {
                 console.error(_err.stack);
                 callback(null, {
                     data: [],
                     success: false,
                     msg: _err.message
                 });
             });
         }
         catch (_err) {
             commonFunctions.catchWidthCallback(_err, callback);
         }
     }
};



module.exports = Patient;
