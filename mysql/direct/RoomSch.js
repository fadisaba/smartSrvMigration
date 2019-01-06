let models = require("../models");
let moment = require('../node_modules/moment');
let AvailbydayReq = require('../require/AvailbydayReq');
let RoomReq = require('../require/RoomReq');
let uuid = require('node-uuid');
let RoomSch = {
    saveRoomSch: function (_params, _callback) {
        let dbUtility = global.App.DbUtility;
        let dateOnlySqlFormat = '';


        if (!_params.dataToBeSaved)
            throw  Error('RoomSch function saveROOMSch :  the dataToBeSaved param is missed');
        if (!_params.startDateIso)
            throw  Error('RoomSch function saveROOMSch :  the startDateIso param is missed');
        if (!_params.endDateIso)
            throw  Error('RoomSch function saveROOMSch :  the endDateIso param is missed');

        let startDateIso=_params.startDateIso;
        let endDateIso=_params.endDateIso;

        let resourceSchArray = dbUtility.getToDeleteToAddToModifyData(_params.dataToBeSaved);

        dateOnlySqlFormat = moment(startDateIso).format('Y-MM-DD');
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                // chain all your queries here. make sure you return them.
                return dbUtility.saveData(resourceSchArray.dataToAddArr,
                    resourceSchArray.dataToUpdateArr, resourceSchArray.dataToDeleteArr,
                    "ROOM_SCH", "roomSchId", t);
            }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback

            let promiseArray = [];
            let paramsUserAvailByDay = {};
            paramsUserAvailByDay.filters = [{name: 'roomAvailbydayDate', value: dateOnlySqlFormat}];
            promiseArray.push(dbUtility.read(paramsUserAvailByDay, 'ROOM_AVAILBYDAY'));

            let paramsResourceSch = {};
            paramsResourceSch.filters = [{name: 'roomSchStartDate', value: startDateIso, compare: 'gte'},
                {name: 'roomSchEndDate', value: endDateIso, compare: 'lte'}];
            paramsResourceSch.limit = "no";

            promiseArray.push(dbUtility.read(paramsResourceSch, 'ROOM_SCH'));
            Promise.all(promiseArray)
                .then(_resultPromise => {

                    let resultRoomAvailByDayArray = _resultPromise[0];
                    let roomSchArray = _resultPromise[1];

                    let roomSchByDayArray=[];//an array of avail dates objects by day
                    roomSchArray.forEach(
                        _roomSch => {
                            if(!roomSchByDayArray[_roomSch.roomId])
                            {
                                roomSchByDayArray[_roomSch.roomId]={};
                                roomSchByDayArray[_roomSch.roomId].siteId=_roomSch.siteId;
                                roomSchByDayArray[_roomSch.roomId].datesArray=[];
                            }
                            roomSchByDayArray[_roomSch.roomId].datesArray.push(
                                { startDate: _roomSch.roomSchStartDate,
                                    endDate: _roomSch.roomSchEndDate});

                        });

                    let roomsByDayToSave = [];

                    resultRoomAvailByDayArray.forEach(
                        _roomAvailbydayObj => {
                            let roomAvailToDelete={};
                            roomAvailToDelete.roomAvailbydayId=_roomAvailbydayObj.roomAvailbydayId;
                            roomAvailToDelete.toDelete = true;
                            roomsByDayToSave.push(roomAvailToDelete);
                        });

                    roomSchByDayArray.forEach(
                        (_roomSchByDay,_key) => {
                            let roomAvailFound = resultRoomAvailByDayArray.find(
                                _roomAvailbydayObj => {
                                    return _key === _roomAvailbydayObj.roomId;
                                });
                            if (roomAvailFound) {

                                roomAvailFound.roomAvailbydayCode = AvailbydayReq.calculateAvailCode(_roomSchByDay.datesArray, roomAvailFound.roomAvailbydayCode);
                                roomAvailFound.added = true;
                                roomAvailFound.roomAvailbydayId=uuid.v4();
                                roomAvailFound.roomAvailbydayDate = startDateIso;
                                roomsByDayToSave.push(roomAvailFound);
                            }
                            else {
                                let roomAvailbydayObj = {};
                                roomAvailbydayObj.roomId = _key;
                                roomAvailbydayObj.roomAvailbydayDate = startDateIso;
                                roomAvailbydayObj.roomAvailbydayCode = AvailbydayReq.calculateAvailCode(_roomSchByDay.datesArray, "");
                                roomAvailbydayObj.siteId = _roomSchByDay.siteId;
                                roomAvailbydayObj.added = true;
                                roomsByDayToSave.push(roomAvailbydayObj);
                            }

                        });
                    let roomAvailbydayObject = dbUtility.getToDeleteToAddToModifyData(roomsByDayToSave);
                    dbUtility.saveData(roomAvailbydayObject.dataToAddArr,
                        roomAvailbydayObject.dataToUpdateArr, roomAvailbydayObject.dataToDeleteArr,
                        "ROOM_AVAILBYDAY", "roomAvailbydayId")
                })
                .then(_result => {
                    _callback(null, {
                        data: "",
                        success: true,
                        msg: ''
                    });
                })
                .catch(_err => {
                    console.error(_err);
                    _callback(null, {
                        data: [],
                        success: false,
                        msg: _err.message
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
    getRoomsIdAssociatedToStudy: function (_params, _callback) {
        let studyId = _params.studyId;
        RoomReq.getRoomAssociatedToStudy(studyId)
            .then(_resultArray => {
                _callback(null, {
                    data: _resultArray,
                    success: true,
                    msg: ''
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
    getUserAvailByDay: function (_params, _callback) {
        let dateSqlFormat = _params.dateSqlFormat;
        AvailbydayReq.getAvailUser(dateSqlFormat)
            .then(_resultArray => {
                _callback(null, {
                    data: _resultArray,
                    success: true,
                    msg: ''
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
    }
};
module.exports = RoomSch;