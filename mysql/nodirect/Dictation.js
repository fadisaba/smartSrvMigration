let models = require("../models");
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

let Dictation = {

    getDictationFile:function(_formData)
    {
        if(!_formData)
            throw Error('Dictation.js getDictationFile : _formData is undefined');

        let fileName=_formData.dictationPath;
        let filePath=global.App.appConf.dictateFolder+"/"+fileName;
        return readFile(filePath);

    }
    };
module.exports = Dictation;
