let models = require("../models");
let moment = require('../node_modules/moment');
let AvailbydayReq = require('../require/AvailbydayReq');
let RoomReq = require('../require/RoomReq');
let uuid = require('node-uuid');
let ResourceSch = {
    saveResourceSch: function (_params, _callback) {
        let dbUtility = global.App.DbUtility;
        let dateOnlySqlFormat = '';


        if(!_params.dataToBeSaved)
            throw  Error('ResourceSch function saveResourceSch :  the dataToBeSaved param is missed');
        if (!_params.startDateIso)
            throw  Error('ResourceSch function saveResourceSch :  the startDateIso param is missed');
        if (!_params.endDateIso)
            throw  Error('ResourceSch function saveResourceSch :  the endDateIso param is missed');

        let startDateIso=_params.startDateIso;
        let endDateIso=_params.endDateIso;

        let resourceSchArray = dbUtility.getToDeleteToAddToModifyData(_params.dataToBeSaved);


        dateOnlySqlFormat=moment(startDateIso).format('Y-MM-DD');
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                // chain all your queries here. make sure you return them.
                return dbUtility.saveData(resourceSchArray.dataToAddArr,
                    resourceSchArray.dataToUpdateArr, resourceSchArray.dataToDeleteArr,
                    "RESOURCE_SCH", "resourceSchId", t);
            }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback

            let promiseArray=[];
            let paramsUserAvailByDay = {};
            paramsUserAvailByDay.filters = [{name: 'userAvailbydayDate', value: dateOnlySqlFormat}];
            promiseArray.push(dbUtility.read(paramsUserAvailByDay, 'USER_AVAILBYDAY'));

            let paramsResourceSch={};
            paramsResourceSch.filters = [{name: 'resourceSchStartDate', value: startDateIso,compare:'gte'},
                {name: 'resourceSchEndDate', value: endDateIso,compare:'lte'}];
            paramsResourceSch.limit="no";

            promiseArray.push(dbUtility.read(paramsResourceSch, 'RESOURCE_SCH'));

            Promise.all(promiseArray)
                .then( _resultPromise=> {
                let userAndRoomCatByDayMap = new Map();

                let resultUserAvailByDayArray=_resultPromise[0];
                let resourceSchArray=_resultPromise[1];

                resourceSchArray.forEach(
                    _resourceSch => {
                        let key=_resourceSch.userId+""+_resourceSch.roomCatId;
                        if (userAndRoomCatByDayMap.get(key)) {
                            let userAndRoomCat = userAndRoomCatByDayMap.get(key);
                            userAndRoomCat.push({
                                'startDate': _resourceSch.resourceSchStartDate,
                                'endDate': _resourceSch.resourceSchEndDate,
                                'userId':_resourceSch.userId,
                                'roomCatId':_resourceSch.roomCatId,
                                'siteId':_resourceSch.siteId
                            });
                            userAndRoomCatByDayMap.set(key, userAndRoomCat);
                        }
                        else{
                            let userAndRoomCat={
                                'startDate': _resourceSch.resourceSchStartDate,
                                'endDate': _resourceSch.resourceSchEndDate,
                                'userId':_resourceSch.userId,
                                'roomCatId':_resourceSch.roomCatId,
                                'siteId':_resourceSch.siteId
                            };
                            userAndRoomCatByDayMap.set(key, [userAndRoomCat]);
                        }

                    });

                let usersByDayToSave=[];


                    resultUserAvailByDayArray.forEach(
                        _userAvailbydayObj => {
                            let userAvailToDelete={};
                            userAvailToDelete.userAvailbydayId=_userAvailbydayObj.userAvailbydayId;
                            userAvailToDelete.toDelete = true;

                            usersByDayToSave.push(userAvailToDelete);

                        });

                for (let [userAndRoomCatId, userByDayArray] of userAndRoomCatByDayMap) {



                    let userAvailFound = resultUserAvailByDayArray.find(
                        _userAvailbydayObj => {
                            let key=_userAvailbydayObj.userId+""+_userAvailbydayObj.roomCatId;
                            return userAndRoomCatId === key;
                        });
                    if (userAvailFound) {
                        //let userAvailToUpdate={};
                        userAvailFound.userAvailbydayCode = AvailbydayReq.calculateAvailCode(userByDayArray,userAvailFound.userAvailbydayCode);
                        userAvailFound.added = true;
                        userAvailFound.userAvailbydayDate = startDateIso;
                        userAvailFound.userAvailbydayId=uuid.v4();
                        usersByDayToSave.push(userAvailFound);
                    }
                    else {
                        let userAvailbydayObj = {};
                        userAvailbydayObj.userId = userByDayArray[0].userId;
                        userAvailbydayObj.roomCatId = userByDayArray[0].roomCatId;
                        userAvailbydayObj.userAvailbydayDate = startDateIso;
                        userAvailbydayObj.userAvailbydayCode = AvailbydayReq.calculateAvailCode(userByDayArray,null);
                        userAvailbydayObj.siteId=userByDayArray[0].siteId;
                        userAvailbydayObj.added = true;
                        usersByDayToSave.push(userAvailbydayObj);
                    }
                }
                let userAvailbydayObject = dbUtility.getToDeleteToAddToModifyData(usersByDayToSave);
                 dbUtility.saveData(userAvailbydayObject.dataToAddArr,
                    userAvailbydayObject.dataToUpdateArr, userAvailbydayObject.dataToDeleteArr,
                    "USER_AVAILBYDAY", "userAvailbydayId")
            })
                .then(_result=>
                {
                    _callback(null, {
                        data: "",
                        success: true,
                        msg: ''
                    });
                })
                .catch(_err=>
                {
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
    getRoomsIdAssociatedToStudy:function(_params,_callback)
    {
        let studyId=_params.studyId;
        RoomReq.getRoomAssociatedToStudy(studyId)
            .then(_resultArray=>{
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
    getUserAvailByDay:function(_params,_callback)
    {
        let dateSqlFormat=_params.dateSqlFormat;
        AvailbydayReq.getAvailUser(dateSqlFormat)
            .then(_resultArray=>{
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
module.exports = ResourceSch;