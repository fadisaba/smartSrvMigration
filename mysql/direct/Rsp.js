let models  = require('../models');
let RspReq=require("../require/RspReq");
let commonFunctions=require("../common/CommonFunctions");
let Rsp = {
    /**
     * @param _params
     * @param _callback
     */
    saveRspFseByRsp:function(_params,_callback)
    {
        let rspObj=_params.rspObj;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if(!_params.rspObj)
                    throw Error('saveRspFseByRsp : rspObj is undefined');
                // chain all your queries here. make sure you return them.
                let rspReq=new RspReq();

                return rspReq.saveRspFseByRsp(rspObj,t)

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
    },
    /** this function is juste juste for one time for fatas and the we have to delete it****/
    updateRspForInvoiceHasFse: function (params, callback) {
        try {
            let rspReq=new RspReq();
            let promise = rspReq.updateRspForInvoiceHasFse();
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    /** this function is juste juste for one time for fatas and the we have to delete it****/
    calcAmcAndAmoAmountForRsp: function (params, callback) {
        try {
            let rspReq=new RspReq();
            let promise = rspReq.calcAmcAndAmoAmountForRsp();
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    }
};
module.exports = Rsp;
