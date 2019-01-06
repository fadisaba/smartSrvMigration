let models = require("../models");
let visitReq=require("../require/VisitReq");
let PatientHasIppReq=require("../require/PatientHasIppReq");
let UserHasLogReq=require("../require/UserHasLogReq");
let WorklistGeneratorReq=require("../require/WorklistGeneratorReq");
let Hl7GeneratorReq=require("../require/Hl7GeneratorReq");
let commonFunctions=require("../common/CommonFunctions");
let Visit = {
    /**
     * This function is used for standard RIS patient Receiving
     * @param _params
     * @param _callback
     */
    saveVisitAndStudyVisit:function(_params,_callback)
    {
        let visitObj=_params.visitObj;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
            if(!_params.visitObj)
                throw Error('saveVisitAndStudyVisit : visitObj is undefined');
            if(!_params.studyVisitDataToBeSaved)
                throw Error('saveVisitAndStudyVisit : studyVisitDataToBeSaved is  undefined');

            let studyVisitObject=global.App.DbUtility.getToDeleteToAddToModifyData(_params.studyVisitDataToBeSaved);
            // chain all your queries here. make sure you return them.
           return global.App.DbUtility.saveRecord(visitObj,'VISIT',t)
               .then(
                   function(_visit)
                   {
                       // console.error(_visit);
                       return global.App.DbUtility.saveData(studyVisitObject.dataToAddArr,
                           studyVisitObject.dataToUpdateArr,studyVisitObject.dataToDeleteArr,
                           "STUDY_VISIT","studyVisitId",t);
                   })


        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback

            let worklistModel={};

            worklistModel.worklistId=visitObj.visitId;
            worklistModel.visitId=visitObj.visitId;
            worklistModel.patientId=visitObj.patientId;
            worklistModel.siteId=visitObj.siteId;
            worklistModel.worklistDoctor=_params.worklistDoctor;
            let studiesArray=_params.studiesArray;
            let studiesCodeArray=[];
            let studiesIdsArray=[];
            studiesArray.forEach(function(_item)
            {
                studiesCodeArray.push(_item.studyCode);
                studiesIdsArray.push(_item.studyId);
            });
            worklistModel.worklistStudies=studiesCodeArray.join("|");
            worklistModel.worklistStudiesIds=studiesIdsArray.join("|");

            global.App.DbUtility.saveRecord(worklistModel,"worklist")
                .then(function()
                {
                    _callback(null, {
                        data: "",
                        success: true,
                        msg: ''

                    });
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
    /**
     * used to create or replace a studyVisit (for example the cotation window)
     * @param _params
     * @param _callback
     */
    createOrReplaceStudyVisit:function(_params,_callback)
    {
        let studyVisitObj=_params.studyVisitObj;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if(!_params.studyVisitObj)
                    throw Error('createOrReplaceStudyVisit : studyVisitObj is undefined');
                if(!_params.studyVisitObj.studyId)
                    throw Error('createOrReplaceStudyVisit : studyVisitObj.studyId is undefined');
                if(!_params.studyVisitObj.visitId)
                    throw Error('createOrReplaceStudyVisit : studyVisitObj.visitId is undefined');

                let dbUtility= global.App.DbUtility;
                // chain all your queries here. make sure you return them.
                if(!studyVisitObj.studyVisitIdToReplace)
                {
                    // we add a study
                    return visitReq.getStudyVisitNewNumber(1)
                        .then(_resultVisitNumberArray=>{
                            studyVisitObj.studyVisitPacsId=_resultVisitNumberArray[0].counterValue;
                            return dbUtility.saveRecord(studyVisitObj,'STUDY_VISIT',t);
                        });
                }
                else {
                    // we replace a study
                    return dbUtility.saveRecord(studyVisitObj,'STUDY_VISIT',t)
                        .then(_result=> {
                                return visitReq.deleteStudyVisitAndVisitStudyHasActe(studyVisitObj.studyVisitIdToReplace,t);
                        })
                }

            })
            .then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                let promiseArray=[];
                let worklistGeneratorReq=new WorklistGeneratorReq();
                promiseArray.push(worklistGeneratorReq.generateWorklist(studyVisitObj.studyVisitId,studyVisitObj.studyId));
                let hl7GeneratorReq=new Hl7GeneratorReq();
                promiseArray.push(hl7GeneratorReq.generateOrmMsgByStudyVisitId("SC","SC",studyVisitObj.studyId,studyVisitObj.studyVisitId));
                promiseArray.push(visitReq.saveStudyInWorklist(studyVisitObj.visitId));

                // we will get all studies to save into the worklist table
                Promise.all(promiseArray)
                            .then(function()
                            {
                                _callback(null, {
                                    data: "",
                                    success: true,
                                    msg: ''

                                });
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

    /**
     * delete one studyvisit (for example  used in the cotation window)
     * @param _params
     * @param _callback
     */
    deleteStudyVisit:function(_params,_callback)
    {
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if(!_params.studyVisitId)
                    throw Error('deleteStudyVisit : studyVisitId is undefined');
                if(!_params.visitId)
                    throw Error('deleteStudyVisit : visitId is undefined');
                let studyVisitId=_params.studyVisitId;
                let dbUtility= global.App.DbUtility;
                // chain all your queries here. make sure you return them.
                let worklistXml=new WorklistGeneratorReq();
                let hl7GeneratorReq=new Hl7GeneratorReq();
                return hl7GeneratorReq.deleteOrmMessageByStudyVisitId(studyVisitId)
                    .then(_result=>{
                        return worklistXml.deleteWorklistFileByStudyVisitId(studyVisitId);
                    })
                    .then(_res=>{
                        return visitReq.deleteStudyVisitAndVisitStudyHasActe(studyVisitId,t);
                    });

            })
            .then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback

                // we will get all studies to save into the worklist table
                visitReq.saveStudyInWorklist(_params.visitId)
                    .then(function()
                    {
                        _callback(null, {
                            data: "",
                            success: true,
                            msg: ''

                        });
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

    /**
     * This function is used for French RIS patient Receiving
     * @param _params
     * @param _callback
     */
    saveVisitAndStudyVisitAndRefPh:function(_params,_callback)
    {
        let visitObj=_params.visitObj;
        let userIdForLog=_params.userIdForLog;
        let dbUtility = global.App.DbUtility;
        let userLogPromiseArray=[];
        let userHasLog=new UserHasLogReq();
        let studyVisitToAddArray=[];
        let studyVisitToDeleteArray=[];
        let hl7GeneratorReq=new Hl7GeneratorReq();
        let visitId=visitObj?visitObj.visitId:_params.visitId;
        let visitRefPhObject=global.App.DbUtility.getToDeleteToAddToModifyData(_params.visitRefPhDataToBeSaved);
        if(visitRefPhObject && visitRefPhObject.dataToAddArr)
        {
            (visitRefPhObject.dataToAddArr).forEach(_item=>{
                if(!_item.referringPhysicianId)
                {
                    throw Error(' referringPhysicianId :  Veuillez spécifier le médecin prescripteur');
                }
            })
        }
        if(visitRefPhObject && visitRefPhObject.dataToUpdateArr)
        {
            (visitRefPhObject.dataToAddArr).forEach(_item=>{
                if(!_item.referringPhysicianId)
                {
                    throw Error(' referringPhysicianId :  Veuillez spécifier le médecin prescripteur');
                }
            })
        }

        let studyVisitObject=global.App.DbUtility.getToDeleteToAddToModifyData(_params.studyVisitDataToBeSaved);
        if(studyVisitObject && studyVisitObject.dataToAddArr)
        {
            (studyVisitObject.dataToAddArr).forEach(_item=>{
                if(!_item.deviceId)
                {
                    throw Error('deviceId :  Veuillez spécifier l\'appareil');
                }
            })
        }

        if(studyVisitObject && studyVisitObject.dataToUpdateArr)
        {
            (studyVisitObject.dataToUpdateArr).forEach(_item=>{
                if(!_item.deviceId)
                {
                    throw Error('deviceId :  Veuillez spécifier l\'appareil');
                }
            })
        }

        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {



                // chain all your queries here. make sure you return them.

                userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'VISIT',visitId,'','','Enregistrement de la consultation',visitId,t));
                let promiseNewVisit;
                if(visitObj && visitObj.added)
                    promiseNewVisit=visitReq.getVisitNewNumber();
                else
                    promiseNewVisit=Promise.resolve([]);

                return promiseNewVisit
                    .then(_resultNewVisitArray=>{
                        if(_resultNewVisitArray.length)
                            visitObj.visitPacsId=_resultNewVisitArray[0].counterValue;

                        return dbUtility.saveRecord(visitObj,'VISIT',t);
                    })

                    .then(_visit=>{
                        if(studyVisitObject.dataToAddArr.length){
                            return visitReq.getStudyVisitNewNumber(studyVisitObject.dataToAddArr.length);

                        }
                        else
                            return Promise.resolve([]);
                    })
                    .then(
                        function(_studyVisitNewNumberArray)
                        {
                            if(_studyVisitNewNumberArray && _studyVisitNewNumberArray.length)
                            {
                                let studyVisitNewNumber=_studyVisitNewNumberArray[0].counterValue;
                                let i=0;
                                studyVisitObject.dataToAddArr.forEach(_studyVisitObj=>{
                                    i++;
                                    _studyVisitObj.studyVisitPacsId=studyVisitNewNumber-i;


                                    studyVisitToAddArray.push(_studyVisitObj);
                                });
                            }
                            // console.error(_visit);
                            let visitId=visitObj?visitObj.visitId:_params.visitId;
                            if(studyVisitObject.dataToAddArr.length){
                                userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'VISIT',visitId,'','','Ajout de '+studyVisitObject.dataToAddArr.length+' examen(s) depuis  l\'accueil du patient',visitId,t));

                            }
                                 return global.App.DbUtility.saveData(studyVisitObject.dataToAddArr,
                                studyVisitObject.dataToUpdateArr,studyVisitObject.dataToDeleteArr,
                                "STUDY_VISIT","studyVisitId",t);

                        })
                    .then(
                        function(_studyVisit)
                        {
                            let promiseArray=[];
                            let visitId=visitObj?visitObj.visitId:_params.visitId;
                            if(studyVisitObject.dataToDeleteArr.length)
                                userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'VISIT',visitId,'','','Suppression de '+studyVisitObject.dataToDeleteArr.length+' examen(s) depuis l\'accueil du patient',visitId,t));
                            studyVisitObject.dataToDeleteArr.forEach(_studyVisitToDeleteObj=>{
                                promiseArray.push(dbUtility.deleteRecordById("STUDY_VISIT_HAS_ACTE","studyVisitId",_studyVisitToDeleteObj.studyVisitId,t));
                                promiseArray.push(hl7GeneratorReq.generateOrmMsgByStudyVisitId("CA","CA",_studyVisitToDeleteObj.studyId,_studyVisitToDeleteObj.studyVisitId));
                                studyVisitToDeleteArray.push(_studyVisitToDeleteObj);

                            });
                            return Promise.all(promiseArray);
                        })
                    .then(
                        function(_result)
                        {
                            return dbUtility.saveData(visitRefPhObject.dataToAddArr,
                                visitRefPhObject.dataToUpdateArr,visitRefPhObject.dataToDeleteArr,
                                "VISIT_HAS_RPH","visitHasRphId",t);

                        }
                    )
                    .then(_result=>{
                        if(visitObj&& visitObj.establishmentId && visitObj.visitIppPatient)
                        {
                            let patientHasIppReq=new PatientHasIppReq();
                            return patientHasIppReq.savePatientIpp(visitObj.patientId,visitObj.visitIppPatient,visitObj.establishmentId,userIdForLog,t)
                        }
                        else return '';

                    })
                    .then(_result=> {
                        return Promise.all(userLogPromiseArray);
                    })


            }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback


            let worklistModel={};

            worklistModel.worklistId=_params.visitId;
            worklistModel.visitId=_params.visitId;
            worklistModel.patientId=_params.patientId;
            worklistModel.siteId=_params.siteId;
            worklistModel.worklistDoctor=_params.worklistDoctor;

            // save studies to worklist table
            let studiesArray=_params.studiesArray;
            let studiesCodeArray=[];
            let studiesIdsArray=[];
            studiesArray.forEach(function(_item)
            {
                studiesCodeArray.push(_item.studyCode);
                studiesIdsArray.push(_item.studyId);
            });
            worklistModel.worklistStudies=studiesCodeArray.join("|");
            worklistModel.worklistStudiesIds=studiesIdsArray.join("|");

            // saving referring physician to worklist table
            let refPhArray=_params.refPhArray;
            let refPhSearchArray=[];
            refPhArray.forEach(function(_item)
            {
                refPhSearchArray.push(_item.referringPhysicianSearch);

            });
            worklistModel.worklistMedPresc=refPhSearchArray.join("|");
            dbUtility.saveRecord(worklistModel,"worklist")
                .then(function()
                {
                      // generate dicom worklist and hl7 files
                    /** Generate Worklist files****/
                    let promiseArray=[];
                    let worklistxml=new WorklistGeneratorReq();
                    let hl7GeneratorReq=new Hl7GeneratorReq();

                    studyVisitToAddArray.forEach(_studyVisitObj=>{

                    promiseArray.push(worklistxml.generateWorklist(_studyVisitObj.studyVisitId,_studyVisitObj.studyId));
                    promiseArray.push(hl7GeneratorReq.generateOrmMsgByStudyVisitId("SC","SC",_studyVisitObj.studyId,_studyVisitObj.studyVisitId));
                });
                    studyVisitToDeleteArray.forEach(_studyVisitObj=>{
                        let worklistxml=new WorklistGeneratorReq();
                        promiseArray.push(worklistxml.deleteWorklistFileByStudyVisitPacsId(visitId,_studyVisitObj.studyVisitPacsId));

                    });

                    /** Generate hl7 files****/
                   // promiseArray.push(hl7GeneratorReq.generatePatientUpdateMsgByVisitId(_params.visitId));

                    Promise.all(promiseArray)
                        .catch(_err=>{
                            console.error(_err);
                        });


                    _callback(null, {
                        data: "",
                        success: true,
                        msg: ''

                    });
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
    closeVisit: function (params, callback) {
        try {

            if (!params.visitId)
                throw Error(' visitId :  is undefined');

            let promise = visitReq.closeVisit(params.visitId,params.visitIsDone);
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    /**
     * this function is used for test only
     * @param params
     * @param callback
     */
    generateOrm: function (params, callback) {
        try {

            if (!params.studyVisitId)
                throw Error(' studyVisitId :  is undefined');

            if (!params.studyId)
                throw Error(' studyId :  is undefined');

            let hl7GeneratorReq=new Hl7GeneratorReq();
            let promise = hl7GeneratorReq.generateOrmMsgByStudyVisitId("SC","SC",params.studyId,params.studyVisitId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },

    /**
     * this function is used for test only
     * @param params
     * @param callback
     */
    generatePatientUpdateHl7: function (params, callback) {
        try {

            if (!params.visitId)
                throw Error(' visitId :  is undefined');


            let hl7GeneratorReq=new Hl7GeneratorReq();
            let promise = hl7GeneratorReq.generatePatientUpdateMsgByVisitId(params.visitId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },

    /**
     * this function is used for test only
     * @param params
     * @param callback
     */
    generateObxOruSegmentHl7: function (params, callback) {
        try {

            if (!params.visitId)
                throw Error(' visitId :  is undefined');


            let hl7GeneratorReq=new Hl7GeneratorReq();
            let promise = hl7GeneratorReq.generateOruMsgByVisitId(params.visitId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    generateWorklistAndOrmByVisitId: function (params, callback) {
        try {
            if (!params.visitId)
                throw Error(' visitId :  is undefined');

            let promise = visitReq.generateWorklistAndOrmByVisitId(params.visitId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    deleteVisit:function(_params,_callback)
    {
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if(!_params.visitId)
                    throw Error('deleteVisit : visitId is undefined');
                let visitId=_params.visitId;

                return visitReq.deleteVisit(visitId,t);
            })
            .then(function (result) {
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



};
module.exports = Visit;
