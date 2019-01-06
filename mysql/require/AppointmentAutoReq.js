let models  = require('../models');
let moment = require('../node_modules/moment');
let AvailbydayReq = require('../require/AvailbydayReq');
let RoomReq = require('../require/RoomReq');
let AppointmentAutoReq = {

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
            availCodeArray='1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
            availCodeArray=availCodeArray.split("");
        }
        for (let i = 0; i < availCodeArray.length; i++) {
             if(availCodeArray[i]==="0")
                 availCodeArray[i]="1"; // put 1 instead of each 0 (0 available 1 not available)
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
    computeFreeSlotsByDay:function(dateSqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId){
        return new Promise(function(_resolve,_reject)
        {

            let dbUtility=global.App.DbUtility;
            let durationCode="";
            for (let i = 0; i < duration/5; i++) {
                durationCode+="0";
            }

            let promiseStudyAssociatedRoom=RoomReq.getRoomAssociatedToStudy(studyId,siteId);
            let roomCatFiltersArray=[
                {
                    name:'siteId',value:siteId
                }
            ];
            let promiseRoomCat=dbUtility.read({filters:roomCatFiltersArray,limit:'no'},'ROOM_CAT');

            let roomCatArray;
            let associatedRoomArray;

            let availableUsersByRoomCatForSelectedStudyArray=[];
            /* an array contains available users by roomCat related to  the selected studyId (doctor and phycicians).
             it contains just roomCat related to the study and not all roomCat the user is available in
             par exemple : pour une radio de genoux nous aurons juste les roomCat où nous pouvons faire la radio de genoux meme si le médecin ou manip est présent
             en meme temps dans la salle scanner ou mammographie par exemple
             */

            let availableUsersByRoomCatArray=[];
            /* // this array will contain all available users  (doctor and phycicians) by "room cat"
             par exemple : pour une radio de genoux nous aurons  les roomCat où nous pouvons faire la radio de genoux et les autres roomCat où le médecin ou manip sont présent
             par exemple en scanner, IRM ou echo
             */

            let availableUsersArray=[]; // this array will contain the userId for available users

            let availableRoomForSelectedStudyArray=[];// an array contains available rooms for the the selected studyId.
            Promise.all([promiseStudyAssociatedRoom,promiseRoomCat])
                .then(_resultRoomAndRoomCatArray=>
                {
                    associatedRoomArray= _resultRoomAndRoomCatArray[0];
                    roomCatArray=_resultRoomAndRoomCatArray[1];

                    let userCat=0;
                    if(studyRequireDoctor && !studyRequireTech)
                        userCat=3;
                    else if(!studyRequireDoctor && studyRequireTech)
                        userCat=2;



                    let promiseAvailUsers=AvailbydayReq.getAvailUser(dateSqlFormat,siteId,userCat,userId);
                    let promiseAvailRooms=AvailbydayReq.getAvailRooms(dateSqlFormat,siteId);
                    return Promise.all([promiseAvailUsers,promiseAvailRooms])
                })
                .then(_resultAvailUsersAndRoomArray=>
                {
                    let resultAvailRooms=  _resultAvailUsersAndRoomArray[1];
                    resultAvailRooms.forEach(_availRoomObject=>{
                        let roomFound=associatedRoomArray.find(_roomObject=>
                            {
                                return _roomObject.roomId===_availRoomObject.roomId;
                            }
                        );
                        if(roomFound)
                            availableRoomForSelectedStudyArray.push(_availRoomObject);

                    });

                    let resultAvailUsers=  _resultAvailUsersAndRoomArray[0];
                    resultAvailUsers.forEach(_availUserObject=>{
                        let roomCatFound=associatedRoomArray.find(_roomObject=>
                            {
                                return _roomObject.roomCatId===_availUserObject.roomCatId;
                            }
                        );
                        if(roomCatFound) {
                            let roomCatFoundForSelectedStudy = availableRoomForSelectedStudyArray.find(_roomAvailObject => {
                                    return _roomAvailObject['Room.roomCatId'] === _availUserObject.roomCatId;
                                }
                            );
                            if (roomCatFoundForSelectedStudy)
                                availableUsersByRoomCatForSelectedStudyArray.push(_availUserObject);


                            availableUsersArray[_availUserObject.userId] = _availUserObject.userId;
                        }
                    });

                    // get all available users for all roomCat
                    resultAvailUsers.forEach(_availUserObject=>{
                        if(availableUsersArray[_availUserObject.userId]){
                            availableUsersByRoomCatArray.push(_availUserObject);
                        }

                    });


                     /* check if available users has availabilities for the selected study*/
                    let freeSlotsMap=new Map();
                    availableUsersByRoomCatForSelectedStudyArray.forEach(_userAvailByRoomCatForSelectedStudyObj=>{
                        let userAvailArray=[];// contains all availabilities for a user
                        availableUsersByRoomCatArray.forEach(_userAvailByRoomCatObj=>{
                            if(_userAvailByRoomCatForSelectedStudyObj.userId===_userAvailByRoomCatObj.userId){
                                userAvailArray.push(_userAvailByRoomCatObj)
                            }
                        });
                        let userAvailCode=AvailbydayReq.calculateUserAvailabilities(_userAvailByRoomCatForSelectedStudyObj,userAvailArray);// the "user avail code" for all roomCat
                        freeSlotsMap.set(_userAvailByRoomCatForSelectedStudyObj.userId,[]);
                        // Now check for each user availability if a room is available
                        availableRoomForSelectedStudyArray.forEach(_roomAvailObj=>{
                            /** la condition suivante permet d'éviter d'afficher des free slot pour les salles si le médecin ou le manip ne sont pas présent
                            exemple : si les salles Echo et IRM sont ouvert et que l'examen peut être fait dans les 2 salle mais le médecin n'est présent que dans la
                             salle d'écho. le test suivant permet de ne pas afficher de rendez vous dans la salle IRM puisque le médecin n'est pas présent
                             * **/
                            if(_roomAvailObj['Room.roomCatId']===_userAvailByRoomCatForSelectedStudyObj.roomCatId)
                            {
                                let sumUserAndRoomAvailCode=AvailbydayReq.calculateUserAndRoomAvailabilities(userAvailCode,_roomAvailObj.roomAvailbydayCode);
                                let posFreeSlot=sumUserAndRoomAvailCode.indexOf(durationCode);
                                while ( posFreeSlot !== -1 ) {
                                    let hour=parseInt(posFreeSlot/12).toString();
                                    let minute=((posFreeSlot%12)*5).toString();
                                    if(minute.toString().length===1)
                                        minute="0"+minute;
                                    if(hour.toString().length===1)
                                        hour="0"+hour;

                                    let freeSlotObj= {
                                        date:dateSqlFormat,
                                        roomId:_roomAvailObj.roomId,
                                        room:_roomAvailObj['Room.roomCode'],
                                        time:hour+":"+minute,
                                        duration:duration,
                                        userId:_userAvailByRoomCatForSelectedStudyObj.userId,
                                        doctor:"",
                                        technician:"",

                                    };
                                    if(studyRequireTech){
                                        freeSlotObj.technician=_userAvailByRoomCatForSelectedStudyObj['User.userInitiales'];
                                        freeSlotObj.technicianId=_userAvailByRoomCatForSelectedStudyObj.userId;
                                    }
                                    if(studyRequireDoctor){
                                        freeSlotObj.doctor=_userAvailByRoomCatForSelectedStudyObj['User.userInitiales'];
                                        freeSlotObj.doctorId=_userAvailByRoomCatForSelectedStudyObj.userId;
                                    }
                                    freeSlotsMap.get(_userAvailByRoomCatForSelectedStudyObj.userId).push(freeSlotObj);
                                    posFreeSlot = sumUserAndRoomAvailCode.indexOf( durationCode,posFreeSlot + durationCode.length );
                                }
                            }



                        });
                    });
                  //  console.log(freeSlotsMap);
                    _resolve(freeSlotsMap);
                });
        });

    },
    computeFreeSlotFormDaysArray:function(_daysArray,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId){

        let promiseArray=[];
        let resultArray=[];
        _daysArray.forEach(_dateDaySqlFormat=>{
            promiseArray.push(AppointmentAutoReq.computeFreeSlotsByDay(_dateDaySqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId));
        });
        return Promise.all(promiseArray)
            .then(_resultsMapArray=>{
                _resultsMapArray.forEach(_resultMap=>{
                    resultArray.push(_resultMap);
                });
                return Promise.resolve(resultArray);
            });
    },

    computeFreeSlotRecursive:function(dateSqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId,_neededResultNumber,_neededDaysNumber,_number,_resultArray,_daysArray){
            let resultArray=_resultArray||[];

            let resultSlotArray=AppointmentAutoReq.convertSlotMapToSlotArray(resultArray);
            if(_number===_neededDaysNumber  || resultSlotArray.length>=_neededResultNumber)
                return Promise.resolve(resultArray);
            else
            {
               return AppointmentAutoReq.computeFreeSlotsByDay(dateSqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId,_daysArray)
                    .then(mapArray=>{
                        if(_number<=_neededDaysNumber)
                        {
                            let newDate=moment(dateSqlFormat).add(1,'day');
                            let newDateSqlFormat=moment(newDate).format('Y-MM-DD');

                            resultArray.push(mapArray);
                           return  AppointmentAutoReq.computeFreeSlotRecursive(newDateSqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId,_neededResultNumber,_neededDaysNumber,_number+1,resultArray,_daysArray)
                        }
                    })
            }
    },
    /**
     * convert an array of maps  into a simple array this is usefull when we want to get the number of free slot
     * @param _arrayOfMaps array :example [map1,map2] : each map contains arrays of free slots (by doctor or tech)
     * @returns {Array}
     */
    convertSlotMapToSlotArray:function(_arrayOfMaps){
        let resultArray=[];

            _arrayOfMaps.forEach(_mapOfArray=>{
                for (let valueArray of _mapOfArray.values()) {
                    valueArray.forEach(_value=>{
                        resultArray.push(_value);
                    })
                }
            });

            return resultArray;
    },

    /**
     * convert an array of maps  into a simple array, and take one free slot for all users:
     * Par exemple si le meme créneaux est disponible pour plusieurs médecins ou manip on garde seulement un seul créneau pour le manip ou le médecin
     * qui a le plus de solts, on essaie d'équilibrer les rdv proposé entre les médecins ou les manip présents
     * @param _arrayOfMaps array :example [map1,map2] : each map contains arrays of free slots (by doctor or tech)
     * @returns {Array}
     */
    convertSlotMapToSlotArrayAndTakeOneFreeSlotForAllUsers:function(_arrayOfMaps){

        let resultArray=[];

        _arrayOfMaps.forEach(_mapOfArray=>{
            // _mapOfArray est un map qui contient des array de slots disponibles par utilisateur( un array par utilisateur , manip ou médecin)
            let userHasMostFreeSlot;
            let resultByDayArray=[];
            // get user (manip or doctor) who has the most free slots
            for (let _key of _mapOfArray.keys()) {
                if(!userHasMostFreeSlot)
                    userHasMostFreeSlot=_key;
                else
                {
                    if(_mapOfArray.get(userHasMostFreeSlot).length<=_mapOfArray.get(_key).length)
                        userHasMostFreeSlot=_key;
                }
            }
            _mapOfArray.get(userHasMostFreeSlot).forEach(_freeSlot=>{
                resultByDayArray.push(_freeSlot);
            });
            for (let _key of _mapOfArray.keys()) {
                if(_key!==userHasMostFreeSlot){
                    _mapOfArray.get(userHasMostFreeSlot).forEach(_freeSlot=>{

                        let freeSlotFound=resultByDayArray.find(_freeSlotObject=>
                            {
                                return (_freeSlotObject.roomId===_freeSlot.roomId &&_freeSlotObject.time===_freeSlot.time);
                            }
                        );
                        if(!freeSlotFound) {
                            resultByDayArray.push(_freeSlot);
                        }

                    });


                }


            }
            resultArray=resultArray.concat(resultByDayArray);
        });

        return resultArray;
    }
};
module.exports = AppointmentAutoReq;