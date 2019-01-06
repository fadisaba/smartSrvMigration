var models = require("../models");
var StudyDoc = {

    getInfoToFillStudyDocFields:function(_params,_callback) {
         if(!_params.appointmentId)
            throw Error('Report.js getInfoToFillStudyDocFields : appointmentId is undefined');

       /* if(!_params.studyId)
            throw Error('Report.js getInfoToFillStudyDocFields : studyId is undefined');*/

         let dbUtility = global.App.DbUtility;

         dbUtility.read({limit:1,filters:[{name:'appointmentId',value:_params.appointmentId}]},"APPOINTMENT")
         .then(_appointmentResultArray=>
         {
             let appointmentObject=_appointmentResultArray[0];


             let pPatient=dbUtility.read({limit:1,filters:[{name:'patientId',value:appointmentObject.patientId}]},"PATIENT");

             /*let doctorMainTableObject= {
                 tableName: 'DOCTOR',
                 filters: [{name:'doctorId',value:visitObject.doctorId}]
                 };
             let doctorJoinTableArray= [{
                 tableName: 'USER'
                 }];
             let pDoctor=dbUtility.joinQuery(doctorMainTableObject,doctorJoinTableArray,1);*/

            /* let pStudy=dbUtility.read({limit:1,filters:[{name:'studyId',value:_params.studyId}]},"STUDY");*/
                 Promise.all([pPatient])
                 .then(function (_result) {
                     let resultArray=[_result[0],_appointmentResultArray];

                 _callback(null, {
                 data: resultArray,
                 success: true,
                 msg: ''

                 });

                 });

         })

         .catch(function (_err) {
         console.error(_err);
         _callback(null, {
         data: [],
         success: false,
         msg: _err.message
         });
         });
         }
    };
module.exports = StudyDoc;
