let concurrentAccessReq=require("../require/concurrentAccessReq");
let commonFunctions=require("../common/CommonFunctions");
let ConcurrentAccess={
    checkConcurrentAccess:function(params,callback)
    {

        try {
            if (!params.tableId)
                throw Error('checkConcurrentAccess : _tableId is undefined');
            if (!params.moduleName)
                throw Error('checkConcurrentAccess : _moduleName is undefined');
            if (!params.userId)
                throw Error('checkConcurrentAccess : _userId is undefined');
            let promise = concurrentAccessReq.checkConcurrentAccess(params.tableId,params.moduleName,params.userId);
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    deleteConcurrentAccess:function(params,callback)
    {

        try {
            if (!params.tableId)
                throw Error('deleteConcurrentAccess : tableId is undefined');
            if (!params.moduleName)
                throw Error('deleteConcurrentAccess : moduleName is undefined');

             let promise = concurrentAccessReq.deleteConcurrentAccess(params.tableId,params.moduleName);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    } ,
    updateConcurrentAccessTime:function(params,callback)
    {

        try {
            if (!params.concurrentAccessId)
                throw Error('updateConcurrentAccessTime : _concurrentAccessId is undefined');

             let promise = concurrentAccessReq.updateConcurrentAccessTime(params.concurrentAccessId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    }
};
module.exports=ConcurrentAccess;
