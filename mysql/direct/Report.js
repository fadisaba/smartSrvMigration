var models = require("../models");
let moment = require('../node_modules/moment');
const fs = require('fs');
let Hl7GeneratorReq=require("../require/Hl7GeneratorReq");
let ReportReq=require('../require/ReportReq');
let commonFunctions=require("../common/CommonFunctions");
//let mammoth = require("mammoth");
let Report = {
    deleteReport: function (params, callback) {
          let dbUtility = global.App.DbUtility;
        try {
            return models.sequelize.transaction(
                {
                    isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
                },
                function (t) {
                    if (!params.reportId)
                        throw Error(' deleteReport :  reportId is undefined');
                    if (!params.visitId)
                        throw Error(' deleteReport :  visitId is undefined');
                    let reportReq=new ReportReq();
                   return reportReq.deleteReport(params.reportId, params.visitId,t);
                })
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
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },

    saveReport:function(_params,_callback)
    {
        let  today = new Date();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();
        let yearFolder=yyyy;
        let monthFolder=yearFolder+"/"+mm;
        let fileName=monthFolder+"/"+_params.reportObj.reportId;

        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
            if(!_params.reportObj)
                throw Error('Report.js saveReport : reportObj is undefined');
            if(!_params.reportHeaderObj)
                throw Error('Report.js saveReport : reportHeaderObj is  undefined');

            // chain all your queries here. make sure you return them.
                var dbUtility = global.App.DbUtility;
                if(!_params.reportObj.reportPath)
                {
                    _params.reportObj.reportPath=fileName+".txt";
                    _params.reportObj.reportHtmlPath=fileName+".txt";
                    if(!_params.reportObj.reportContentIsHtml)
                    {
                        _params.reportObj.reportHtmlPath=fileName+".html";
                    }
                }
                return dbUtility.saveRecord(_params.reportObj,'REPORT',t)

                    .then(_visitId=>{
                   return dbUtility.saveRecord(_params.reportHeaderObj,'REPORT_HEADER',t) ;
                     })
                    .then(_result=>{
                        return dbUtility.deleteRecordById('REPORT_HAS_STUDY','reportId',_params.reportObj.reportId,t)
                    })
                    .then(_result=>
                    {
                        return dbUtility.saveData(_params.reportStudyArray,[],[],'REPORT_HAS_STUDY','reportHasStudyId',t)

                    })
                    .then(_result=>
                    {
                        let worklistParam={};
                        worklistParam.idName='visitId';
                        worklistParam.idValue=_params.reportObj.visitId;
                        worklistParam.worklistLastCrStatus=_params.reportObj.reportStatus;
                        return dbUtility.saveRecord(worklistParam,'WORKLIST',t);
                    })

        }).then(function (result) {

            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            var reportDir=global.App.appConf.reportDir;
            fs.existsSync(reportDir+"/"+_params.siteId) || fs.mkdirSync(reportDir+"/"+_params.siteId);
            fs.existsSync(reportDir+"/"+yearFolder) || fs.mkdirSync(reportDir+"/"+yearFolder);
            fs.existsSync(reportDir+"/"+monthFolder) || fs.mkdirSync(reportDir+"/"+monthFolder);

            fs.writeFile(reportDir+"/"+_params.reportObj.reportPath,_params.reportObj.reportContent,(err) => {
                if (err)
                {
                    console.error(err);
                    _callback(null, {
                        data: [],
                        success: false,
                        msg: err.message
                    });

                }
                if(_params.reportObj.reportStatus===3)// validated report
                {
                    let hl7GeneratorReq=new Hl7GeneratorReq();
                     hl7GeneratorReq.generateOruMsgByVisitId(_params.reportObj.visitId);
                }
                // create the report header file
                fs.writeFile(reportDir+"/"+_params.reportObj.reportPath+'_header.txt',_params.reportHeaderObj.reportHeaderContent,(err) => {
                    if (err)
                    {
                        console.error(err);
                        _callback(null, {
                            data: [],
                            success: false,
                            msg: err.message
                        });

                    }
                    _callback(null, {
                        data: "",
                        success: true,
                        msg: ''

                    });
                });
            });
            if(!_params.reportObj.reportContentIsHtml)
            {
                // we create the html report file if the report content is not in html format
                fs.writeFile(reportDir+"/"+_params.reportObj.reportHtmlPath,_params.reportObj.reportHtmlContent,(err) => {
                    if (err)
                    {
                        console.error(err);
                        _callback(null, {
                            data: [],
                            success: false,
                            msg: err.message
                        });
                    }
                });
            }

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
    getReportBodyAndHeaderContent:function(_params,_callback)
    {
        if(!_params.reportId)
            throw Error('Report.js getReportBodyAndHeaderContent : reportId is undefined');
        let dbUtility = global.App.DbUtility;

        let mainTableObject= {
            tableName: 'REPORT',
            filters: [{name:'reportId',value:_params.reportId}]
        };

        let joinTableArray= [{
            tableName: 'report_header'
        }];
        dbUtility.joinQuery(mainTableObject,joinTableArray,1)
            .then(_resultArray=>
            {
                let reportObject=_resultArray[0];
                let reportDir=global.App.appConf.reportDir;
                // get the report body
                fs.readFile(reportDir+"/"+reportObject.reportPath,'utf8', function (_err,_reportBodyData) {
                    if (_err)
                    {
                        console.error(_err);
                        _callback(null, {
                            data: [],
                            success: false,
                            msg: _err.message
                        });
                    }
                    else
                    {
                        let reportBodyContent=_reportBodyData;

                        // get the report header
                        fs.readFile(reportDir+"/"+reportObject.reportPath+"_header.txt",'utf8',
                            function (_err,_reportHeaderData) {
                                if (_err)
                                {
                                    _callback(null, {
                                        data: [],
                                        success: false,
                                        msg: _err.message
                                    });
                                }
                                else {
                                    let reportHeaderContent=_reportHeaderData;
                                    _callback(null, {
                                        data: [reportBodyContent,reportHeaderContent,reportObject.reportContentIsHtml,reportObject['ReportHeaders.reportHeaderContentIsHtml']],
                                        success: true,
                                        msg: ''

                                    });
                                }

                            });
                    }

                });
            })
            .catch(function (_err) {
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
    getReportTemplateContentByStudyAndDoctor:function(_params,_callback){

        if(!_params.studyId)
            throw Error('Report.js getReportTemplateContentByStudyAndDoctor : studyId is undefined');
        if(!_params.doctorId)
            throw Error('Report.js getReportTemplateContentByStudyAndDoctor : doctorId is undefined');
        var dbUtility = global.App.DbUtility;

        dbUtility.read({filters:[{name:'studyId',value:_params.studyId}]},"REPORT_TEMPLATE_HAS_STUDY")
            .then(_resultArray=>
            {
                var reportTemplateId;

                _resultArray.forEach(
                    function(_reportTemplateObj)
                    {
                        if(_reportTemplateObj.studyId==_params.studyId &&!_reportTemplateObj.doctorId) // if doctorId is not set for this REPORT_TEMPLATE_HAS_STUDY
                            reportTemplateId=_reportTemplateObj.reportTemplateId;

                    }
                );
                _resultArray.forEach(
                    function(_reportTemplateObj)
                    {
                        if(_reportTemplateObj.studyId==_params.studyId &&_reportTemplateObj.doctorId==_params.doctorId)
                            reportTemplateId=_reportTemplateObj.reportTemplateId;
                    }
                );
                if(reportTemplateId)
                {
                     dbUtility.read({
                            filters:[{name:'reportTemplateId',value:reportTemplateId}],
                            fieldsArray:['reportTemplateContent','reportTemplateContentIsHtml'],
                            limit:1
                    }, "REPORT_TEMPLATE")
                         .then(_resultArray=>{
                             var result= {};
                             var buffer=_resultArray[0].reportTemplateContent;
                             result.reportTemplateContent=buffer.toString();
                             result.reportTemplateContentIsHtml=_resultArray[0].reportTemplateContentIsHtml;
                             _callback(null, {
                                 data: result,
                                 success: true,
                                 msg: ''

                             });
                         })
                }
                else
                {
                    _callback(null, {
                        data: null,
                        success: true,
                        msg: ''

                    });
                }
            })
            .catch(function (_err) {
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
    getInfosForReportTemplateFields:function(_params,_callback) {

        try{
         if(!_params.visitId)
         throw Error('Report.js getInfosForReportTemplateFields : visitId is undefined');


         let dbUtility = global.App.DbUtility;
         let reportReq=new ReportReq();
         reportReq.getInfosForReportTemplateFields(_params.visitId,_params.visitStudyArray)
        // dbUtility.read({limit:1,filters:[{name:'visitId',value:_params.visitId}]},"VISIT")
         .then(_resultVisit=>
         {
             let patient=_resultVisit[0][0];
             let doctor=_resultVisit[1][0];
             let studies=_resultVisit[2];
             let visit=_resultVisit[3][0];
             let refPh=_resultVisit[4][0]||null;
            // let report=_resultVisit[4][0];


             let doctorResultArray=[];
             let mtTraitantResultArray=[];
             let studyResultArray=[];
             studies.forEach(_studyObj=>{
                 studyResultArray.push({
                     studyName:_studyObj['Study.studyName'],
                     studyCode:_studyObj['Study.studyCode'],
                     deviceName:_studyObj['Device.deviceName'],
                     deviceModel:_studyObj['Device.deviceModel'],
                     deviceAgreementDate:_studyObj['Device.deviceAgreementDate'],
                     deviceAET:_studyObj['Device.deviceAET'],
                     deviceAgreementNumber:_studyObj['Device.deviceAgreementNumber'],
                     deviceInstallationDate:_studyObj['Device.deviceInstallationDate'],
                     deviceTrademark:_studyObj['Device.deviceTrademark'],
                     devicePower:_studyObj['Device.devicePower']
                 });
            });

             if(refPh)
             {
                 let title=reportReq.getTitleLabel(refPh['ReferringPhysician.referringPhysicianTitle']);

                 mtTraitantResultArray.push({
                     referringPhysicianFName:refPh['ReferringPhysician.referringPhysicianFName'],
                     referringPhysicianLName:refPh['ReferringPhysician.referringPhysicianLName'],
                     referringPhysicianTitle:title
                 });
             }
             else{ // prendre le médecin traitant si le prescripteur n'est pas fourni
                 if(patient['ReferringPhysician.referringPhysicianId'])
                 {
                     let title=reportReq.getTitleLabel(patient['ReferringPhysician.referringPhysicianTitle']);

                     mtTraitantResultArray.push({
                         referringPhysicianFName:patient['ReferringPhysician.referringPhysicianFName'],
                         referringPhysicianLName:patient['ReferringPhysician.referringPhysicianLName'],
                         referringPhysicianTitle:title
                     });
                 }
             }
             doctorResultArray.push({
                 userLName:doctor['User.userLName'],
                 userFName:doctor['User.userFName'],
                 doctorSignature:doctor.doctorSignature
             });


             patient.patientTitle=reportReq.getTitleLabel(patient.patientTitle);
             patient.patientSocialNumber=patient.patientSocialNumber+" "+patient.patientSocialKey;
             patient.patientPhoneNumber=patient.patientPhoneNumber || patient.patientMobileNumber;

             patient.patientAge=moment(visit.visitDate).diff(moment(new Date(patient.patientBirthday)),'years');

             //console.log(patient);
             let reportObj={};
             reportObj.reportDate=new Date();

             let resultArray=[doctorResultArray,mtTraitantResultArray,studyResultArray,[patient],[visit],[reportObj]];


             _callback(null, {
                 data: resultArray,
                 success: true,
                 msg: ''

             });
         })
         .catch(function (_err) {
         console.error(_err);
             _callback(null, {
             data: [],
             success: false,
             msg: _err.message
            });
         });
        }
    catch(_err) {
        console.error(_err);
        _callback(null, {
            data: [],
            success: false,
            msg: _err.message
        });
    }

         },

    searchKeyword: function(data, callback){
//@meta doctorId
// previous comment is mandatory if we want to use metadata option

        var doctorId=data.metadata.doctorId;
        var queryTexte=data.query;
        var limit=data.limit;
        var params={};
        params.filters=[{name:'doctorId',value:doctorId},{name:'reportKeywordName',value:queryTexte}];
        params.fieldsArray=['reportKeywordId','reportKeywordName'];
        params.limit=limit;
        global.App.DbUtility.read(params,'report_keyword')
            .then(function(rows){
                callback(null, {
                    data: rows,
                    success:true,
                    msg:''

                });
            })
            .catch(function(error)
            {

                console.error(error);
                callback(null, {
                    data: [],
                    success:false,
                    msg:'Error'

                });
            });
    },
    getReportKeywordContent:function(_params,_callback) {
        if(!_params.reportKeywordId)
            throw Error('Report.js getReportKeywordContent : reportKeywordId is undefined');
        var dbUtility = global.App.DbUtility;
        var params={};
        params.filters=[{name:'reportKeywordId',value:_params.reportKeywordId}];
        params.fieldsArray=['reportKeywordContent'];
        dbUtility.read(params,'report_keyword')
            .then(function(_resultArray){
                var buffer=_resultArray[0].reportKeywordContent;
                _callback(null, {
                    data: buffer.toString(),
                    success:true,
                    msg:''

                });
            })
            .catch(function(error)
            {
                console.error(error);
                _callback(null, {
                    data: [],
                    success:false,
                    msg:'Error'

                });
            });
    },

    regenerateORUMessage:function(_params,_callback)
    {
        try {
            if (!_params.visitId)
                throw   Error(' visitId :  is undefined');
            let hl7GeneratorReq=new Hl7GeneratorReq();
            let promise =  hl7GeneratorReq.generateOruMsgByVisitId(_params.visitId);
            commonFunctions.executePromiseThenCallback(promise, _callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, _callback);
        }
    },
    convertReportToHtml:function()
    {
        mammoth.convertToHtml({path: "../docs/reports/migrated/492729.doc"})
            .then(function(result){
                var html = result.value; // The generated HTML
                var messages = result.messages; // Any messages, such as warnings during conversion
            })
            .done();
    }
    };
module.exports = Report;
