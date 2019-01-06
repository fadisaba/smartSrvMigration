let moment = require('../node_modules/moment');
let AvailbydayReq = require('../require/AvailbydayReq');
class AppointmentReq
{
    constructor()
    {

    }

    /**
     * get all availabilities to update (room, users) when adding or deleting appointments
     * @param _appDetailToDeleteArray
     * @param _userAvailbydayArray
     * @param _roomAvailbydayArray
     * @param _action : String can be add or delete
     * @param _roomAvailbyDayDataToModifyArray
     * @param _doctorAvailbyDayDataToModifyArray
     * @param _manipAvailbyDayDataToModifyArray
     */
    getAvailabilitesToUpdate(_appDetailToDeleteArray,_userAvailbydayArray,_roomAvailbydayArray,_action,_roomAvailbyDayDataToModifyArray,_doctorAvailbyDayDataToModifyArray,_manipAvailbyDayDataToModifyArray)
    {
        let roomAvailbyDayDataToModifyArray=_roomAvailbyDayDataToModifyArray||[];
        let doctorAvailbyDayDataToModifyArray=_doctorAvailbyDayDataToModifyArray ||[];
        let manipAvailbyDayDataToModifyArray=_manipAvailbyDayDataToModifyArray||[];

        _appDetailToDeleteArray.forEach(_dataToDeleteObj=>{

            let startTimeIso;
            let endTimeIso;

            if(_action==="add")
            {
                 startTimeIso=_dataToDeleteObj.appDetailStartTime;
                 endTimeIso=_dataToDeleteObj.appDetailEndTime;
            }
            else  // action ==="delete"
            {
                //_dataToDeleteObj is retreived from DB and not send from navigator => that's why we should convert datetimes
                 startTimeIso=(_dataToDeleteObj.appDetailStartTime).toISOString();
                 endTimeIso=(_dataToDeleteObj.appDetailEndTime).toISOString();
            }

            if(_dataToDeleteObj['Study.studyRequireDoctor'])
            {
                if(!_dataToDeleteObj.doctorId)
                    throw  Error('doctorId is required => studyRequireDoctor is true ');


                let userAvailFound=_userAvailbydayArray.find(_userAvailBydayObj=>{
                    return _dataToDeleteObj['Room.roomCatId']===_userAvailBydayObj.roomCatId && _dataToDeleteObj.doctorId ===_userAvailBydayObj.userId;
                });
                if(!userAvailFound)
                    throw  Error('ErrDoct:user availability by day '+_dataToDeleteObj.doctorId+' is not found for the appointment roomcat '+_dataToDeleteObj['Room.roomCatId']);


                let doctorAvailObjFound=doctorAvailbyDayDataToModifyArray.find(_doctorAvailObjToUpdate=>{
                    return _doctorAvailObjToUpdate.userAvailbydayId===userAvailFound.userAvailbydayId;
                });
                if(doctorAvailObjFound)
                {
                    doctorAvailObjFound.userAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(doctorAvailObjFound.userAvailbydayCode,startTimeIso,endTimeIso,_action);
                }
                else{
                    let doctorAvailObjToUpdate={};
                    doctorAvailObjToUpdate.userAvailbydayId=userAvailFound.userAvailbydayId;
                    doctorAvailObjToUpdate.userAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(userAvailFound.userAvailbydayCode,startTimeIso,endTimeIso,_action);
                    doctorAvailbyDayDataToModifyArray.push(doctorAvailObjToUpdate);
                }


            }
            if(_dataToDeleteObj['Study.studyRequireTech'])
            {
                if(!_dataToDeleteObj.technicianId)
                    throw  Error('technicianId is required => studyRequireTech is true ');

                let userAvailFound=_userAvailbydayArray.find(_userAvailBydayObj=>{
                    return _dataToDeleteObj['Room.roomCatId']===_userAvailBydayObj.roomCatId && _dataToDeleteObj.technicianId ===_userAvailBydayObj.userId;
                });
                if(!userAvailFound)
                    throw  Error('ErrTech: user availability by day is not found for the appointment roomcat and the user "technician" '+_dataToDeleteObj.technicianId+' ');


                let manipAvailObjFound=manipAvailbyDayDataToModifyArray.find(_manipAvailObjToUpdate=>{
                    return _manipAvailObjToUpdate.userAvailbydayId===userAvailFound.userAvailbydayId;
                });
                if(manipAvailObjFound)
                {
                    manipAvailObjFound.userAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(manipAvailObjFound.userAvailbydayCode,startTimeIso,endTimeIso,_action);
                }
                else{
                    let manipAvailObjToUpdate={};
                    manipAvailObjToUpdate.userAvailbydayId=userAvailFound.userAvailbydayId;
                    manipAvailObjToUpdate.userAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(userAvailFound.userAvailbydayCode,startTimeIso,endTimeIso,_action);
                    manipAvailbyDayDataToModifyArray.push(manipAvailObjToUpdate);
                }
            }


            let roomAvailFound=_roomAvailbydayArray.find(_roomAvailBydayObj=>{
                return _dataToDeleteObj.roomId===_roomAvailBydayObj.roomId;
            });
            if(!roomAvailFound)
                throw  Error('ErrRoom: user availability by day is not found for the appointment roomId ');


            let roomAvailObjFound=roomAvailbyDayDataToModifyArray.find(_roomAvailObjToUpdate=>{
                return _roomAvailObjToUpdate.roomAvailbydayId===roomAvailFound.roomAvailbydayId;
            });
            if(roomAvailObjFound)
            {
                roomAvailObjFound.roomAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(roomAvailObjFound.roomAvailbydayCode,startTimeIso,endTimeIso,_action);
            }
            else{
                let roomAvailObjToUpdate={};
                roomAvailObjToUpdate.roomAvailbydayId=roomAvailFound.roomAvailbydayId;
                roomAvailObjToUpdate.roomAvailbydayCode=AvailbydayReq.calcAvailCodeForAppointmentDetail(roomAvailFound.roomAvailbydayCode,startTimeIso,endTimeIso,_action);
                roomAvailbyDayDataToModifyArray.push(roomAvailObjToUpdate);
            }

        });
        let result={};
        result.roomAvailbyDayDataToModifyArray=roomAvailbyDayDataToModifyArray;
        result.manipAvailbyDayDataToModifyArray=manipAvailbyDayDataToModifyArray;
        result.doctorAvailbyDayDataToModifyArray=doctorAvailbyDayDataToModifyArray;
        return result;
    }
    deleteAvailByAppDetail(_appDetailArray,_appointmentDateSql,_transac)
    {
        let dbUtility=global.App.DbUtility;
        let doctorAvailbyDayDataToModifyArray=[];
        let manipAvailbyDayDataToModifyArray=[];
        let roomAvailbyDayDataToModifyArray=[];

        let appointmentDateSql=_appointmentDateSql;

        let promiseArray = [];
        let paramsRoomAvailByDay = {};
        paramsRoomAvailByDay.filters = [{name: 'roomAvailbydayDate', value: appointmentDateSql}];
        promiseArray.push(dbUtility.read(paramsRoomAvailByDay, 'ROOM_AVAILBYDAY'));

        let paramsUserAvailByDay = {};
        paramsUserAvailByDay.filters = [{name: 'userAvailbydayDate', value: appointmentDateSql}];
        promiseArray.push(dbUtility.read(paramsUserAvailByDay, 'USER_AVAILBYDAY'));

        return Promise.all(promiseArray)
            .then(_resultAvailPromises=> {
                let userAvailbydayArray = _resultAvailPromises[1];
                let roomAvailbydayArray = _resultAvailPromises[0];
                if (!userAvailbydayArray)
                    throw  Error('users availabilities by day are not set for the doctor or physician');
                if (!roomAvailbydayArray)
                    throw  Error('room availabilities by day are not set for appointment rooms');


                let availToUpdateObj1=this.getAvailabilitesToUpdate(_appDetailArray,userAvailbydayArray,roomAvailbydayArray,"delete");
                if(availToUpdateObj1.roomAvailbyDayDataToModifyArray)
                    roomAvailbyDayDataToModifyArray=roomAvailbyDayDataToModifyArray.concat(availToUpdateObj1.roomAvailbyDayDataToModifyArray);

                if(availToUpdateObj1.manipAvailbyDayDataToModifyArray)
                    manipAvailbyDayDataToModifyArray=manipAvailbyDayDataToModifyArray.concat(availToUpdateObj1.manipAvailbyDayDataToModifyArray);


                if(availToUpdateObj1.doctorAvailbyDayDataToModifyArray)
                    doctorAvailbyDayDataToModifyArray=doctorAvailbyDayDataToModifyArray.concat(availToUpdateObj1.doctorAvailbyDayDataToModifyArray);

                let userAvailbyDayDataToModifyArray=doctorAvailbyDayDataToModifyArray.concat(manipAvailbyDayDataToModifyArray);

                return dbUtility.saveData([],
                    userAvailbyDayDataToModifyArray,[],
                    "USER_AVAILBYDAY","userAvailbydayId",_transac)
                    .then(_result=>{
                        return dbUtility.saveData([],
                            roomAvailbyDayDataToModifyArray,[],
                            "ROOM_AVAILBYDAY","roomAvailbydayId",_transac)
                    });
            });




    }
    deleteAppointment(_appointmentId,_appointmentDateSql,_transac)
    {
        let dbUtility=global.App.DbUtility;
        //let appDetailsToModify=appDetailArray.dataToUpdateArr;
        let mainTableObject={tableName:'APP_DETAIL',filters:[{name:'appointmentId',value:_appointmentId}]};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'STUDY',fieldsArray:['studyRequireDoctor','studyRequireTech']},
            {tableName:'ROOM',fieldsArray:['roomCatId']});

        return  dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
           /* .then(_resultAppDetailArray=>{

                return  this.deleteAvailByAppDetail(_resultAppDetailArray,_appointmentDateSql,_transac)

            })*/
            .then(_result=>{
                return dbUtility.deleteRecordById('APP_DETAIL',"appointmentId",_appointmentId,_transac);
            })
            .then(_result=>{
                return dbUtility.deleteRecordById('APPOINTMENT',"appointmentId",_appointmentId,_transac);
            })


    }

}
module.exports=AppointmentReq;
