    let models = require('../models');
let RoomReq = {
    getRoomAssociatedToStudy: function (_studyId,_siteId) {
        //Creating a promise
        let dbUtility = global.App.DbUtility;
        return new Promise(
            function (resolve, reject) {

                let roomsIdAndCatIdAssoicatedToStudyArray = [];
                let deviceTable = {};
                deviceTable.tableName = "DEVICE_HAS_STUDY";
                deviceTable.fieldsArray = ["studyId"];
                deviceTable.filters = [{name: 'studyId', value: _studyId}];

                let joinDeviceTableArray = [
                    {
                        tableName: "DEVICE", fieldsArray: ["deviceId"]
                    }
                ];
                let promiseDevice = dbUtility.joinQuery(deviceTable, joinDeviceTableArray, "no");


                let roomTable = {};
                roomTable.tableName = "ROOM_HAS_DEVICE";
                roomTable.fieldsArray = ["roomId", 'deviceId'];

                let joinRoomTableArray = [
                    {
                        tableName: "ROOM",
                        fieldsArray: ['roomCatId'],
                        filters:[{name:'siteId',value:_siteId}]
                    }
                ];
                let promiseRoom = dbUtility.joinQuery(roomTable, joinRoomTableArray, "no");

                Promise.all([promiseRoom, promiseDevice])
                    .then(_resultsArray => {
                        let roomsAndDevicesArray = _resultsArray[0];
                        let deviceAndStudyArray = _resultsArray[1];
                        roomsAndDevicesArray.forEach(_roomsAndDeviceObj => {

                            let associatedRoom = deviceAndStudyArray.find(
                                _deviceAndStudyObj => {
                                    return _roomsAndDeviceObj['deviceId'] === _deviceAndStudyObj['Device.deviceId'];
                                });
                            if (associatedRoom)
                                roomsIdAndCatIdAssoicatedToStudyArray.push({
                                    roomId: _roomsAndDeviceObj.roomId,
                                    roomCatId: _roomsAndDeviceObj['Room.roomCatId']
                                });
                        });
                        resolve(roomsIdAndCatIdAssoicatedToStudyArray);

                    });

            });
    }
};
module.exports = RoomReq;