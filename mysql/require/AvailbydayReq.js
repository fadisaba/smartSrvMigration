let models  = require('../models');
let AvailbydayReq = {

    /**
     * This function allow to calculate the availCode
     * @param _timeArray has this format : [{startDate:startDateTimeValue,endDate:endDateTimeValue},{startDate:startDateTimeValue,endDate:endDateTimeValue}]
     * @param _initialCode : string the initial availCode.
     * @returns string
     */
    calculateAvailCode:function(_timeArray,_initialCode)
    {
        let availCodeArray;
        if(_initialCode)
        {
            availCodeArray=_initialCode.split("");
        }
        else{
            availCodeArray='111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
            availCodeArray=availCodeArray.split("");
        }
        for (let i = 0; i < availCodeArray.length; i++) {
             if(availCodeArray[i]==="0")
                 availCodeArray[i]="1"; // replace 0 by 1 (0 available 1 not available)
        }
        for (let i = 0; i < _timeArray.length; i++) {
            let obj = _timeArray[i];
            let startDateArray=obj.startDate.toISOString().split('T');
            let endDateArray=obj.endDate.toISOString().split('T');

            let startHour=parseInt(startDateArray[1].split(':')[0]);
            let startMinute=parseInt(startDateArray[1].split(':')[1]);
            let endHour=parseInt(endDateArray[1].split(':')[0]);
            let endMinute=parseInt(endDateArray[1].split(':')[1]);
            let startIndex=startHour*12+(startMinute/5);
            let endIndex=endHour*12+(endMinute/5)-1 ;
            for (let i = startIndex; i <=endIndex; i++) {
                if(availCodeArray[i]==="1")
                    availCodeArray[i]="0";
            }
        }
        return availCodeArray.join("");
    },
    /**
     * this function return an availability code that represents the sum of  availabilities code for a all roomCat
     * @param _userAvailForCurrentRoomCat
     * @param _userAvailForTheOthersRoomCatArray
     * @returns {string}
     */
    calculateUserAvailabilities:function(_userAvailForCurrentRoomCat,_userAvailForTheOthersRoomCatArray)
    {
        let userAvailabilityCodesArray=[];
        let resultArray;
         resultArray=(_userAvailForCurrentRoomCat.userAvailbydayCode).split("");
        _userAvailForTheOthersRoomCatArray.forEach(_userAvailabilityObj=>{
            userAvailabilityCodesArray.push(_userAvailabilityObj.userAvailbydayCode.split(""));
            });

        for (let i = 0; i < userAvailabilityCodesArray.length; i++) {
            let userCodeArray = userAvailabilityCodesArray[i];
            for (let j = 0; j < userCodeArray.length; j++) {
                if(parseInt(resultArray[j])===0 && parseInt(userCodeArray[j])<2) // the slot is free
                    resultArray[j]="0";
                else
                    resultArray[j]=(parseInt(resultArray[j])+parseInt(userCodeArray[j])).toString(); // the slot is not free
            }
        }
        return resultArray.join("");
    },
    /**
     * this function return the final availability code that represent the sum of (user Availabilities for all roomCat) and the room availabilities sent in as parameter
     * @param _userAvailCode : string the sum of user avail for all room cat (resulting of the calculateUserAvailabilities function)
     * @param _roomAvailCode : string the availability code of the room
     */
    calculateUserAndRoomAvailabilities:function(_userAvailCode,_roomAvailCode)
    {
        let resultArray=[];
        let roomAvailCodeArray=_roomAvailCode.split("");
        let userAvailCodeArray=_userAvailCode.split("");

        for (let j = 0; j < userAvailCodeArray.length; j++) {

                resultArray[j]=parseInt(userAvailCodeArray[j])+parseInt(roomAvailCodeArray[j])
        }
        return resultArray.join("");

    },
    /**
     * for test purpose only : convert the availability code to hours
     * @param availCode
     */
    convertAvailCodeToHour:function(availCode)
    {
        let resultArray=[];
        let  availCodeArray=availCode.split('');
        let t=0;
        for(let i=0;i<availCodeArray.length;i++){
            if(i!==0 && i%12===0) t++; resultArray.push("Hour "+t+" Code "+availCodeArray[i])
        }
        console.log(resultArray);
    },
    /**
     * this function return a promise that resolves an array of available users on _dateOnlySqlFormat
     * @param _dateOnlySqlFormat
     * @param _siteId
     * @param _userCat : int (2 for technician, 3 for doctor)
     * @param _userId : int (can be a doctor or a manipulator)
     * @returns {Promise}
     */
    getAvailUser:function(_dateOnlySqlFormat,_siteId,_userCat,_userId)
    {
        //Creating a promise
        let dbUtility = global.App.DbUtility;
        return new Promise(
            function (resolve, reject) {

                let mainTable = {};
                mainTable.tableName = "USER_AVAILBYDAY";
                mainTable.filters = [{name: 'userAvailbydayDate', value: _dateOnlySqlFormat,compare:'eq'},{name:'siteId',value:_siteId}];
                if(_userId)
                    mainTable.filters.push({name: 'userId', value:_userId});

                let joinUserTable= {tableName: "USER", fieldsArray: ["userCatId","userInitiales",'userFName','userLName']};
                if(_userCat)
                    joinUserTable.filters=[{name:'userCatId',value:_userCat}];
                let joinUserTableArray = [joinUserTable];
              dbUtility.joinQuery(mainTable, joinUserTableArray, "no")
                    .then(_resultsArray=>{
                        resolve(_resultsArray);
                    });


            });
    },
    getAvailRooms:function(_dateOnlySqlFormat,_siteId)
    {

        //Creating a promise
        let dbUtility = global.App.DbUtility;
        return new Promise(
            function (resolve, reject) {
                let mainTable = {};
                mainTable.tableName = "ROOM_AVAILBYDAY";
                mainTable.filters = [{name: 'roomAvailbydayDate', value: _dateOnlySqlFormat,compare:'eq'},{name:'siteId',value:_siteId}];
                let joinUserTable= {tableName: "ROOM", fieldsArray: ["roomCode","roomName",'roomCatId']};
                let joinUserTableArray = [joinUserTable];
                dbUtility.joinQuery(mainTable, joinUserTableArray, "no")
                    .then(_resultsArray=>{
                        resolve(_resultsArray);
                    });
            });
    },
    calcAvailCodeForAppointmentDetail:function(_availCode,_startTimeIso,_endTimeIso,_direction)
    {
        let availCodeArray=_availCode.split('');

        let startDateArray=_startTimeIso.split('T');
        let endDateArray=_endTimeIso.split('T');

        let startHour=parseInt(startDateArray[1].split(':')[0]);
        let startMinute=parseInt(startDateArray[1].split(':')[1]);
        let endHour=parseInt(endDateArray[1].split(':')[0]);
        let endMinute=parseInt(endDateArray[1].split(':')[1]);
        let startIndex=startHour*12+(startMinute/5);
        let endIndex=endHour*12+(endMinute/5)-1 ;
        for (let i = startIndex; i <=endIndex; i++) {
            if(_direction==="add"){
               // if(parseInt(availCodeArray[i])===0)
                     availCodeArray[i]=parseInt(availCodeArray[i])+2;
            }
            else{
              //  if(parseInt(availCodeArray[i])===2)
                if(parseInt(availCodeArray[i])-2<0)
                    availCodeArray[i]=0;
                else
                    availCodeArray[i]=parseInt(availCodeArray[i])-2;
            }
        }
        return availCodeArray.join("");
    }

};
module.exports = AvailbydayReq;