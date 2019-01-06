'use strict';
let models = require('../models');
let uuid = require('node-uuid');
class PatientHasIppReq {
    constructor() {
    }
    savePatientIpp(_patientId,_ipp,_establishmentId,_userIdToLog,t)
    {
        // we check if the ipp exists for the _establishmentId
        let dbUtility = global.App.DbUtility;

        let params = {};
        params.filters = [{name: 'patientId', value: _patientId},
                            {name: 'patientHasIppNumero', value: _ipp},
                            {name: 'establishmentId', value: _establishmentId}
                            ];
       return dbUtility.read(params, 'PATIENT_HAS_IPP')
           .then(_resultPatientHasIpp=>{
               if(!_resultPatientHasIpp.length) // if the ipp doesn't exists, we add it to the patient_has_ipp table
               {
                       let patientHasIppObj={};
                           patientHasIppObj.patientHasIppId=uuid.v4();
                           patientHasIppObj.patientId=_patientId;
                           patientHasIppObj.patientHasIppNumero=_ipp;
                           patientHasIppObj.establishmentId=_establishmentId;
                           patientHasIppObj.active=true;
                          return dbUtility.saveRecord(patientHasIppObj, 'PATIENT_HAS_IPP', t);
               }
               else
                   return '';
           })
    }
}
module.exports = PatientHasIppReq;
