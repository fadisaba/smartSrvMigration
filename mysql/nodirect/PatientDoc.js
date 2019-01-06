let models = require("../models");
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);

let PatientDoc = {

    savePatientDoc:function(_formData)
    {
        let  today = new Date();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();
        let yearFolder=yyyy;
        let monthFolder=yearFolder+"/"+mm;
        let fileName=monthFolder+"/"+_formData.patientDocId;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
            if(!_formData)
                throw Error('PatientDoc.js savePatientDoc : _formData is undefined');

            // chain all your queries here. make sure you return them.
                let dbUtility = global.App.DbUtility;
                if(!_formData.patientDocPath)
                {
                    _formData.patientDocPath=fileName+".jpeg";

                }
                return dbUtility.saveRecord(_formData,'PATIENT_DOC',t)
                    .then(_result=>{
                        let reportDir=global.App.appConf.patientDocsDir;
                        fs.existsSync(reportDir+"/"+yearFolder) || fs.mkdirSync(reportDir+"/"+yearFolder);
                        fs.existsSync(reportDir+"/"+monthFolder) || fs.mkdirSync(reportDir+"/"+monthFolder);
                        let binaryData = new Buffer(_formData.imageData, 'base64').toString('binary');
                        return writeFile(reportDir+"/"+_formData.patientDocPath,binaryData,"binary");
                    });

        });
    }
    };
module.exports = PatientDoc;
