let models  = require('../models');
let StatReq=require("../require/StatReq");
let commonFunctions=require("../common/CommonFunctions");
let Stat = {
    /**
     * @param _params
     * @param _callback
     */
    getChiffreAffaireReglementVisitNumber:function(_params,_callback)
    {
       try {
            if (!_params.startDateSql)
                    throw Error(' startDateSql :  is undefined');
            if (!_params.endDateSql)
                    throw Error(' endDateSql :  is undefined');
            let statReq=new StatReq();
            let promise = statReq.getChiffreAffaireReglementVisitNumber(_params.startDateSql,_params.endDateSql,_params.doctorId,_params.siteId);
            commonFunctions.executePromiseThenCallback(promise, _callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, _callback);
        }
    },
    getStudyVisitNumber:function(_params,_callback)
    {
        try {
            if (!_params.startDateSql)
                throw Error(' startDateSql :  is undefined');
            if (!_params.endDateSql)
                throw Error(' endDateSql :  is undefined');
            let statReq=new StatReq();
            let promise = statReq.getStudyVisitNumber(_params.startDateSql,_params.endDateSql,_params.doctorId,_params.siteId);
            commonFunctions.executePromiseThenCallback(promise, _callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, _callback);
        }
    }
};
module.exports = Stat;
