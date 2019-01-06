class ReportReq{
    constructor()
    {

    }
    deleteReport(_reportId,_visitId,_transac){
        let dbUtility = global.App.DbUtility;
        return dbUtility.deleteRecordById('REPORT','reportId',_reportId,_transac)
            .then(_result=>{
                return dbUtility.deleteRecordById('REPORT_HAS_STUDY','reportId',_reportId,_transac)
            })
            .then(_result=>{
                let worklistParam={};
                worklistParam.idName='visitId';
                worklistParam.idValue=_visitId;
                worklistParam.worklistLastCrStatus=0;
                return dbUtility.saveRecord(worklistParam,'WORKLIST',_transac);
            });
    }
    getInfosForReportTemplateFields(_visitId,_visitStudyArray)
    {
        let dbUtility = global.App.DbUtility;
        return dbUtility.read({limit:1,filters:[{name:'visitId',value:_visitId}]},"VISIT")
            .then(_resultVisit=>
            {
                let visitObject=_resultVisit[0];
                let patientMainTableObject= {
                    tableName: 'PATIENT',
                    filters: [{name:'patientId',value:visitObject.patientId}]
                };
                // referringPhysicianId of the current patient
                let patientJoinTableArray= [{
                    tableName: 'REFERRING_PHYSICIAN',
                    required: false
                }];
                let pPatient=dbUtility.joinQuery(patientMainTableObject,patientJoinTableArray,1);

                let doctorMainTableObject= {tableName: 'DOCTOR',
                    filters: [{name:'doctorId',value:visitObject.doctorId}]
                };
                let doctorJoinTableArray= [{tableName: 'USER',fieldsArray:['userLName','userFName']}];
                let pDoctor=dbUtility.joinQuery(doctorMainTableObject,doctorJoinTableArray,1);


                let studyMainTableObject= {tableName: 'STUDY_VISIT',
                    filters: [{name:'visitId',value:visitObject.visitId}]
                };
                let studyJoinTableArray= [{tableName: 'STUDY',fieldsArray:['studyCode','studyName']},
                    {tableName: 'DEVICE',fieldsArray:['deviceName','deviceModel','deviceAgreementDate','deviceAET'
                            ,'deviceAgreementNumber','deviceInstallationDate','deviceTrademark','devicePower']}];
                let pStudy=dbUtility.joinQuery(studyMainTableObject,studyJoinTableArray);

                let pVisit=dbUtility.read({limit:1,filters:[{name:'visitId',value:_visitId}]},"VISIT");

                let refPhMainTableObject= {
                    tableName: 'VISIT_HAS_RPH',
                    filters: [{name:'visitId',value:_visitId},{name:'patientIsOrientedBy',value:true}]
                };
                let refPhJoinTableArray= [{
                    tableName: 'REFERRING_PHYSICIAN'
                }];
                let pRefPhy=dbUtility.joinQuery(refPhMainTableObject,refPhJoinTableArray,1);

                   return Promise.all([pPatient,pDoctor,pStudy,pVisit,pRefPhy]);

            });
    }
    getTitleLabel(_titleCode){
        let result="";
        switch (_titleCode)
        {
            case 1:
                result="Mr.";
                break;
            case 2:
                result="Mme.";
                break;
            case 3:
                result="Mlle.";
                break;
        }
        return result;
    }

}
module.exports=ReportReq;