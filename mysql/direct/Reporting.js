let models = require("../models");
let ReportingReq  = require('../require/ReportingReq');
let commonFunctions=require("../common/CommonFunctions");
let Reporting = {
    getReporting:function(_params,_callback) {
        try {
            if (!_params.reportName)
                throw Error('Reporting.js getReporting : reportName is undefined');

            if (!_params.filtersObj)
                throw Error('Reporting.js getReporting : filtersObj is undefined');

            if (!_params.filtersObj.startDate)
                throw Error('Reporting.js getReporting : startDate is undefined');

            if (!_params.filtersObj.endDate)
                throw Error('Reporting.js getReporting : endDate is undefined');


            let dbUtility = global.App.DbUtility;
            /*  let filtersArray=[];
              filtersArray.push({name:'startDate',value:reportFormValues.startDate});
              filtersArray.push({name:'endDate',value:reportFormValues.endDate});

              /*

             if(reportFormValues.siteId)
                 filtersArray.push({name:'siteId',value:reportFormValues.siteId});
              if(reportFormValues.doctorId)
                  filtersArray.push({name:'doctorId',value:reportFormValues.doctorId});

              if(reportFormValues.paymentMethodId)
              {
                 if ((reportFormValues.paymentMethodId).length)
                 {
                     filtersArray.push({name:'paymentMethodId',value:reportFormValues.paymentMethodId,compare:'In'});
                 }
              }

               */
            let promise;
            switch (_params.reportName) {
                case 'bordereauReglements.mrt':
                     promise =  ReportingReq.getBordereauReglement(_params.filtersObj);
                    commonFunctions.executePromiseThenCallback(promise, _callback);

                    break;

                case 'encaissements.mrt':
                     promise =  ReportingReq.getEncaissements(_params.filtersObj);
                    commonFunctions.executePromiseThenCallback(promise, _callback);
                    break;

                case 'activites.mrt':
                    promise =  ReportingReq.getActivites(_params.filtersObj);
                    commonFunctions.executePromiseThenCallback(promise, _callback);
                    break;

                case 'activitesActes.mrt':
                    promise =  ReportingReq.getActivitesActes(_params.filtersObj);
                    commonFunctions.executePromiseThenCallback(promise, _callback);
                    break;
            }
        }

        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }

    }
    };
module.exports = Reporting;
