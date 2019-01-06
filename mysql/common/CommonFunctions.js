let CommonFunctions = {
    /**
     *
     * @param promise : Promise
     * @param callback : Function
     */
    executePromiseThenCallback:function(promise,callback) {
        promise
            .then(function (result) {
                callback(null, {
                    data: result,
                    success: true,
                    msg: ''

                });
            }).catch(function (_err) {
            console.error(_err.stack);
            callback(null, {
                data: [],
                success: false,
                msg: _err.message
            });
        })
    },

    catchWidthCallback:function(_err,_callback) {
        console.error(_err.stack);
        _callback(null, {
            data: [],
            success: false,
            msg: _err.message
        });
    }
};
module.exports = CommonFunctions;