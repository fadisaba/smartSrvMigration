'use strict';
let models = require('../models');
let uuid = require('node-uuid');
class UserHasLogReq {
    constructor() {
    }
    saveUserHasLog(_userId,_userHasLogTableName,_userHasLogTableUuId,_userHasLogTableIntegerId,_userHasLogActionCode,_userHasLogLabelTexte,_visitId,t)
    {

        // we check if the ipp exists for the _establishmentId
        let dbUtility = global.App.DbUtility;

        let userHasLogObj={};
        userHasLogObj.userHasLogId=uuid.v4();
        userHasLogObj.userId=_userId;
        userHasLogObj.userHasLogTableName=_userHasLogTableName;
        userHasLogObj.userHasLogActionCode=_userHasLogActionCode;
        if(_userHasLogTableUuId)
            userHasLogObj.userHasLogTableUuId=_userHasLogTableUuId;
        if(_visitId)
            userHasLogObj.visitId=_visitId;
        if(_userHasLogTableIntegerId)
            userHasLogObj.userHasLogTableIntegerId=_userHasLogTableIntegerId;
        userHasLogObj.userHasLogDateTime=new Date();
        userHasLogObj.active=true;


        return dbUtility.saveRecord(userHasLogObj, 'USER_HAS_LOG', t)
            .then(_result=>{
                if(_userHasLogLabelTexte)
                {
                    let userHasLogLabelObj={};
                    userHasLogLabelObj.userHasLogLabelId=uuid.v4();
                    userHasLogLabelObj.userHasLogId=userHasLogObj.userHasLogId;
                    userHasLogLabelObj.userHasLogLabelText=_userHasLogLabelTexte;
                    userHasLogLabelObj.active=true;
                    return dbUtility.saveRecord(userHasLogLabelObj, 'USER_HAS_LOG_LABEL', t)
                }
                else return "";
            })

    }
}
module.exports = UserHasLogReq;
