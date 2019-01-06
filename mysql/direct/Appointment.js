let models = require("../models");
let AvailbydayReq = require('../require/AvailbydayReq');
let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let AppointmentReq = require('../require/AppointmentReq');
let commonFunctions=require("../common/CommonFunctions");
let UserHasLogReq=require("../require/UserHasLogReq");
let Appointment = {
saveAppoinmentAndAppDetailAndRefPh:function(_params,_callback)
    {
        try {
            let appointmentObject = _params.appointmentObject;
            let userIdForLog = _params.userIdForLog;
            let userLogPromiseArray=[];
            let userHasLog=new UserHasLogReq();
            if (!appointmentObject.patientId) {
                throw Error('patientId :  Veuillez spécifier le patient');
            }
            let dbUtility = global.App.DbUtility;
            let resultAppDetailToUpdateFromDbArray;

            let appointmentRefPhDataObject = dbUtility.getToDeleteToAddToModifyData(_params.appointmentRefPhDataObject);

            if (appointmentRefPhDataObject && appointmentRefPhDataObject.dataToAddArr) {
                (appointmentRefPhDataObject.dataToAddArr).forEach(_item => {
                    if (!_item.referringPhysicianId) {
                        throw Error('referringPhysicianId :  Veuillez spécifier le médecin prescripteur');
                    }
                })
            }
            if (appointmentRefPhDataObject && appointmentRefPhDataObject.dataToUpdateArr) {
                (appointmentRefPhDataObject.dataToAddArr).forEach(_item => {
                    if (!_item.referringPhysicianId) {
                        throw Error('referringPhysicianId :  Veuillez spécifier le médecin prescripteur');
                    }
                })
            }
            let appDetailArray = dbUtility.getToDeleteToAddToModifyData(_params.appDetailArray);

            if (appDetailArray && appDetailArray.dataToAddArr) {
                (appDetailArray.dataToAddArr).forEach(_item => {
                    if (!_item.studyId) {
                        throw Error('studyId :  Veuillez spécifier l\'examen');
                    }
                })
            }

            return models.sequelize.transaction(
                {
                    isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
                },
                function (t) {



                    // chain all your queries here. make sure you return them.
                    return dbUtility.saveRecord(appointmentObject, 'APPOINTMENT', t)
                        .then(
                            function (_appointment) {
                                userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'APPOINTMENT',appointmentObject.appointmentId,'','','Enregistrement du rdv',appointmentObject.appointmentId,t));
                                if (appDetailArray.dataToUpdateArr.length) {
                                    let appDetailToUpdateFromDataBasePromiseArray = [];
                                    let appDetailsToModify = appDetailArray.dataToUpdateArr;
                                    appDetailsToModify.forEach(_appDetail => {
                                        let mainTableObject = {
                                            tableName: 'APP_DETAIL',
                                            filters: [{name: 'appDetailId', value: _appDetail.appDetailId}]
                                        };
                                        let joinTablesArray = [];
                                        joinTablesArray.push({
                                                tableName: 'STUDY',
                                                fieldsArray: ['studyRequireDoctor', 'studyRequireTech']
                                            },
                                            {tableName: 'ROOM', fieldsArray: ['roomCatId',]});

                                        appDetailToUpdateFromDataBasePromiseArray.push(dbUtility.joinQuery(mainTableObject, joinTablesArray, 'no'));
                                    });
                                    return Promise.all(appDetailToUpdateFromDataBasePromiseArray);
                                }
                                else return null;
                            })
                        .then(_resultAppDetailToUpdateFromDbArray => {

                            resultAppDetailToUpdateFromDbArray = _resultAppDetailToUpdateFromDbArray;
                            if (appDetailArray.dataToUpdateArr.length) {
                                let appDetailsToModify = appDetailArray.dataToUpdateArr;
                                appDetailsToModify.forEach(_appDetail => {

                                    _resultAppDetailToUpdateFromDbArray.forEach(_resultAppDetailArray => {
                                        if (_appDetail.appDetailId === _resultAppDetailArray[0].appDetailId) {
                                            let appDetailToDelete = Object.assign({}, _resultAppDetailArray[0]);

                                            userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'APPOINTMENT',appointmentObject.appointmentId,'','','Examen remplacé ou modifié',appDetailToDelete.appDetailId,t));

                                            if (appDetailArray.dataToDeleteArr.length)
                                                appDetailArray.dataToDeleteArr.push(appDetailToDelete);
                                            else
                                                appDetailArray.dataToDeleteArr = [appDetailToDelete];
                                        }
                                    });


                                    let appDetailToAdd = Object.assign({}, _appDetail);
                                    appDetailToAdd.appDetailId = uuid.v4();


                                    if (appDetailArray.dataToAddArr.length)
                                        appDetailArray.dataToAddArr.push(appDetailToAdd);
                                    else
                                        appDetailArray.dataToAddArr = [appDetailToAdd];

                                });

                            }
                            if(appDetailArray.dataToAddArr.length)
                                userLogPromiseArray.push(userHasLog.saveUserHasLog(userIdForLog,'APPOINTMENT',appointmentObject.appointmentId,'','',appDetailArray.dataToAddArr.length+ ' Examen(s) ajouté(s) au rdv',appointmentObject.appointmentId,t));

                            return dbUtility.saveData(appDetailArray.dataToAddArr,
                                [], appDetailArray.dataToDeleteArr,
                                "APP_DETAIL", "appDetailId", t);
                        })
                        .then(
                            function (_result) {
                                let appointmentDateSql = moment(appointmentObject.appointmentDate).format('Y-MM-DD');

                                let promiseArray = [];
                                let paramsRoomAvailByDay = {};
                                paramsRoomAvailByDay.filters = [{
                                    name: 'roomAvailbydayDate',
                                    value: appointmentDateSql
                                }];
                                promiseArray.push(dbUtility.read(paramsRoomAvailByDay, 'ROOM_AVAILBYDAY'));

                                let paramsUserAvailByDay = {};
                                paramsUserAvailByDay.filters = [{
                                    name: 'userAvailbydayDate',
                                    value: appointmentDateSql
                                }];
                                promiseArray.push(dbUtility.read(paramsUserAvailByDay, 'USER_AVAILBYDAY'));


                                return Promise.all(promiseArray);


                            })

                        .then(_resultAvailPromises => {
                            let userAvailbydayArray = _resultAvailPromises[1];
                            let roomAvailbydayArray = _resultAvailPromises[0];
                            if (!userAvailbydayArray)
                                throw  Error('users availabilities by day are not set for the doctor or physician');
                            if (!roomAvailbydayArray)
                                throw  Error('room availabilities by day are not set for appointment rooms');

                            let roomAvailbyDayDataToModifyArray = [];
                            let doctorAvailbyDayDataToModifyArray = [];
                            let manipAvailbyDayDataToModifyArray = [];

                            let appointmentReq = new AppointmentReq();
                            let availToUpdateObj = appointmentReq.getAvailabilitesToUpdate(appDetailArray.dataToAddArr, userAvailbydayArray, roomAvailbydayArray, "add");
                            if (availToUpdateObj.roomAvailbyDayDataToModifyArray)
                                roomAvailbyDayDataToModifyArray = availToUpdateObj.roomAvailbyDayDataToModifyArray;
                            if (availToUpdateObj.manipAvailbyDayDataToModifyArray)
                                manipAvailbyDayDataToModifyArray = availToUpdateObj.manipAvailbyDayDataToModifyArray;

                            if (availToUpdateObj.doctorAvailbyDayDataToModifyArray)
                                doctorAvailbyDayDataToModifyArray = availToUpdateObj.doctorAvailbyDayDataToModifyArray;


                            let availToUpdateObj1 = appointmentReq.getAvailabilitesToUpdate(appDetailArray.dataToDeleteArr, userAvailbydayArray, roomAvailbydayArray, "delete", roomAvailbyDayDataToModifyArray, doctorAvailbyDayDataToModifyArray, manipAvailbyDayDataToModifyArray);

                            if (availToUpdateObj1.roomAvailbyDayDataToModifyArray)
                                roomAvailbyDayDataToModifyArray = availToUpdateObj1.roomAvailbyDayDataToModifyArray;

                            if (availToUpdateObj1.manipAvailbyDayDataToModifyArray)
                                manipAvailbyDayDataToModifyArray = availToUpdateObj1.manipAvailbyDayDataToModifyArray;


                            if (availToUpdateObj1.doctorAvailbyDayDataToModifyArray)
                                doctorAvailbyDayDataToModifyArray = availToUpdateObj1.doctorAvailbyDayDataToModifyArray;


                            let userAvailbyDayDataToModifyArray = doctorAvailbyDayDataToModifyArray.concat(manipAvailbyDayDataToModifyArray);

                            return dbUtility.saveData([],
                                userAvailbyDayDataToModifyArray, [],
                                "USER_AVAILBYDAY", "userAvailbydayId", t)
                                .then(_result => {
                                    return dbUtility.saveData([],
                                        roomAvailbyDayDataToModifyArray, [],
                                        "ROOM_AVAILBYDAY", "roomAvailbydayId", t)
                                });
                        })
                        .then(
                            function (_result) {
                                return dbUtility.saveData(appointmentRefPhDataObject.dataToAddArr,
                                    appointmentRefPhDataObject.dataToUpdateArr, appointmentRefPhDataObject.dataToDeleteArr,
                                    "APPOINTMENT_HAS_RPH", "AppointmentHasRphId", t);
                            }
                        )
                        .then(_result=> {
                            return Promise.all(userLogPromiseArray);
                        });

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
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, _callback);
        }

    },
    deleteAppointment: function (params, callback) {

        let dbUtility = global.App.DbUtility;
        let userHasLog=new UserHasLogReq();
        let userIdForLog=params.userIdForLog;
        try {
            return models.sequelize.transaction(
                {
                    isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
                },
                function (t) {
                    if (!params.appointmentId)
                        throw Error(' deleteAppointment :  appointmentId is undefined');

                    if (!params.appointmentDate)
                        throw Error(' deleteAppointment :  appointmentDate is undefined');

                    let appointmentReq=new AppointmentReq();

                    return appointmentReq.deleteAppointment(params.appointmentId, params.appointmentDate,t)
                        .then(_result=>{
                            return userHasLog.saveUserHasLog(userIdForLog,'APPOINTMENT',params.appointmentId,'','','Suppression de rdv',params.appointmentId,t)
                        })
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
    }

    };
module.exports = Appointment;
