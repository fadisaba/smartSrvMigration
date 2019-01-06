let models  = require('../models');
let UserHasLogReq=require("../require/UserHasLogReq");
let commonFunctions=require("../common/CommonFunctions");
let UserLog = {
    /**
     * @param _params
     * @param _callback
     */
    saveUserLog:function(_params,_callback)
    {
       /* try {
            if (!_params.visitId)
                throw Error(' visitId :  is undefined');

            let userHasLog=new UserHasLogReq();
            userHasLog.saveUserHasLog(userIdForLog,'VISIT',visitId,'','','Enregistrement de la consultation',visitId);

            let promise = visitReq.generateWorklistAndOrmByVisitId(params.visitId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }*/

    }



};
module.exports = UserLog;
