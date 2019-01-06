let models=require('../models');
let WorklistGeneratorReq=require('../require/WorklistGeneratorReq');
let commonFunctions=require("../common/CommonFunctions");
let Worklist={
    generateWorklist: function (params, callback) {
        try {

            if (!params.studyVisitId)
                    throw Error(' generateWorklist : studyVisitId is undefined');

            let worklistGeneratorReq=new WorklistGeneratorReq(params.studyVisitId);

            let promise = worklistGeneratorReq.generateWorklist();
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    }
};
module.exports=Worklist;