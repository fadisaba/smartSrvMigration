let models = require("../models");
let uuid = require('node-uuid');
let UserHasLogReq=require("../require/UserHasLogReq");
let StudyVisitHasActe = {
    saveStudyVisitHasActe:function(_params,_callback)
    {
        let userLogPromiseArray=[];
        let userHasLog=new UserHasLogReq();
        if(!_params.userIdForLog)
            throw Error('saveStudyVisitHasActe : userIdForLog is undefined');
        let userIdForLog=_params.userIdForLog;

        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if(!_params.visitId)
                    throw Error('saveStudyVisitHasActe : visitId is undefined');

                if(!_params.studyVisitHasActeDataToBeSaved)
                    throw Error('saveStudyVisitHasActe : studyVisitHasActeDataToBeSaved is  undefined');
               let studyVisitHasActeDataToBeSaved=global.App.DbUtility.getToDeleteToAddToModifyData(_params.studyVisitHasActeDataToBeSaved);
                let visitObj={
                    idValue:_params.visitId,
                    idName:"visitId"

                };
                if(_params.status){
                    visitObj.visitCotationStatus=_params.status;
                    let labelLog="";
                    if(_params.status===3)
                        labelLog="Validation de la cotation";
                    else if(_params.status===2)
                        labelLog="Enregistrement de de la cotation";
                    else if(_params.status===1)
                        labelLog="Mise la cotation en attente";
                    userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'VISIT',_params.visitId,'','',labelLog,_params.visitId,t));
                }


                return global.App.DbUtility.saveRecord(visitObj,'VISIT',t)
                    .then(
                        function(_visit)
                        {
                            // console.error(_visit);
                            return global.App.DbUtility.saveData(studyVisitHasActeDataToBeSaved.dataToAddArr,
                                studyVisitHasActeDataToBeSaved.dataToUpdateArr,studyVisitHasActeDataToBeSaved.dataToDeleteArr,
                                "STUDY_VISIT_HAS_ACTE","studyVisitHasActeId",t);
                        })
                    .then(_result=> {
                        return Promise.all(userLogPromiseArray);
                    })

            }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            _callback(null, {
                data: "",
                success: true,
                msg: ''

            });

        }).catch(function (_err) {
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
module.exports = StudyVisitHasActe;
