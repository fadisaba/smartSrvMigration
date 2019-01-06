var CommonUtil = {

    getReportFileContent: function (params, callback) {
        let fs = require('fs');
        fs.readFile(global.App.appConf.reportDir+''+params.path,'utf8', function (err,data) {
            if (err) {
                console.error("Error CommonUtil.js => Function getReportFileContent : " + err);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'
                });
            }
            callback(null, {
                data: data,
                success: true,
                msg: ''

            });
        });
    },
    getPatientDocFileContent: function (params, callback) {
        let fs = require('fs');
        fs.readFile(global.App.appConf.patientDocsDir+''+params.path,'base64', function (err,data) {
            if (err) {
                console.error("Error CommonUtil.js => Function getPatientDocFileContent : " + err);
                callback(null, {
                    data: [],
                    success: false,
                    msg: 'Error'
                });
            }
            callback(null, {
                data: data,
                success: true,
                msg: ''

            });
        });
    }
};
module.exports = CommonUtil;