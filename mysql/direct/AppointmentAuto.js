let models = require("../models");
let AppointmentAutoReq = require("../require/AppointmentAutoReq");


let AppointmentAuto = {
computeFreeSlots:function(_params,_callback)
    {
        if(!_params.dateSqlFormat)
            throw  Error('AppointmentAuto function computeFreeSlots :  the dateSqlFormat param is missed');
        if(!_params.studyId)
            throw  Error('AppointmentAuto function computeFreeSlots :  the studyId param is missed');

        if(!_params.siteId)
            throw  Error('AppointmentAuto function computeFreeSlots :  the siteId param is missed');

        if(!_params.duration)
            throw  Error('AppointmentAuto function computeFreeSlots :  the duration param is missed');

        let dateSqlFormat=_params.dateSqlFormat;
        let studyId=_params.studyId;
        let siteId=_params.siteId;
        let duration=_params.duration;// in minutes

        let studyRequireTech=_params.studyRequireTech;
        let studyRequireDoctor=_params.studyRequireDoctor;
        let userId=_params.userId;
        let daysDateArray=_params.searchDayArray;
        let daysNombre=_params.daysNombre;
        let resultsNumber=_params.resultsNumber;


        let promise;
        if(daysDateArray && daysDateArray.length){
            console.log(daysDateArray);
             promise=AppointmentAutoReq.computeFreeSlotFormDaysArray(daysDateArray,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId);

        }
        else{
            promise=AppointmentAutoReq.computeFreeSlotRecursive(dateSqlFormat,studyId,siteId,duration,studyRequireTech,studyRequireDoctor,userId,resultsNumber,daysNombre,1);
        }
     promise
    .then(function (_arrayOfMaps) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
           // console.log(_freeSlotsMap);
            let resultArray=AppointmentAutoReq.convertSlotMapToSlotArray(_arrayOfMaps); // uncomment to see all free slots
       // let resultArray=AppointmentAutoReq.convertSlotMapToSlotArrayAndTakeOneFreeSlotForAllUsers(_arrayOfMaps);// uncomment for production, remove the duplicated

            //console.log(resultArray);
            _callback(null, {
                data: resultArray,
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
    testPromiseRecurcive:function(_number)
    {
        if(_number===10)
            return 10;
        else {
            return Promise.resolve(AppointmentAuto.testPromiseRecurcive(_number+1));
        }
    }

    };
module.exports = AppointmentAuto;
