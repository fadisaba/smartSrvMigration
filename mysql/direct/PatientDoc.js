let models = require("../models");
const fs = require('fs');
let PatientDoc = {
    getPatientDocContent:function(_params,_callback)
    {
       let dbUtility = global.App.DbUtility;

        let promise;
        let filtersArray=[];
        if(_params.patientDocId)
            filtersArray=[{name:'patientDocId',value:_params.patientDocId}];
        else if(_params.ordonnanceVisit)
        {
            filtersArray=[{name:'docTypeId',value:"95beebc1-9a3f-4c23-b3ff-3d28d453ef35"}
            ,{name:'visitId',value:_params.visitId}];
        }
        else if(_params.mutuellePatient)
        {
            filtersArray=[{name:'docTypeId',value:"95beebc1-9a3f-4c23-b3ff-3d28d453ed24"}
                ,{name:'patientId',value:_params.patientId}];
        }

        dbUtility.read({filters:filtersArray},'PATIENT_DOC')
            .then(_resultArray=>
            {
                let patientDocObject=_resultArray[0];
                let patientDocDir=global.App.appConf.docDir;
                // get the report body
                fs.readFile(patientDocDir+"/patientDocs/"+patientDocObject.patientDocPath,'base64', function (_err,_imageData) {
                    /*if (_err)
                        throw _err;*/
                    if(_err) {
                        console.error(_err);
                        _callback(null, {
                            data: [],
                            success: false,
                            msg: _err.message
                        });
                        return;
                    }
                    /*var buffer = new Buffer(_imageData);
                    var string = buffer.toString('base64');*/
                    _callback(null, {
                        data: [_imageData],
                        success: true,
                        msg: ''

                    });
                });
            })
            .catch(function (_err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                console.error(_err);
                _callback(null, {
                    data: [],
                    success: false,
                    msg: _err.message
                });
            });
    }

    };
module.exports = PatientDoc;
