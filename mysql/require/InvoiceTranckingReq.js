let models = require('../models');
let moment = require('../node_modules/moment');
let InvoiceTrackingReq = {

   getDataForInvoiceTracking:function(_filters){

       let dbUtility=global.App.DbUtility;

       if (!_filters.startDate)
           throw Error('getDataForInvoiceTracking : startDate is undefined');
       if (!_filters.endDate)
           throw Error('getDataForInvoiceTracking : startDate is undefined');

       let startIsoDate=_filters.startDate;
       let endIsoDate=_filters.endDate;

       if(_filters.action==="invoiceFilter")
       {
           let mainTableFilters=[];
           let invoiceFilters = [

               {name: 'invoiceIsValidated', value: true, compare: 'eq'},//is validated
               {name: 'invoiceIsCancelled', value: false, compare: 'eq'}, // is not cancelled
               {name: 'invoiceHasAvoir', value: false, compare: 'eq'},// is not avoir
               {name: 'invoiceType', value: 3, compare: 'ne'},//is not an F.T
           ];

               let startDate = moment(startIsoDate).format('Y-MM-DD');
               let endDate = moment(endIsoDate).format('Y-MM-DD');
           invoiceFilters.push({name:'invoiceDate',value1:startDate,value2:endDate,compare:'between'});


           if(_filters.dreLotNumber)
           {
               mainTableFilters.push({name:'invoiceHasFseLotDreNumber',value:_filters.dreLotNumber});
           }

           if(_filters.fseLotNumber)
           {
               mainTableFilters.push({name:'invoiceHasFseLotNumber',value:_filters.fseLotNumber});

           }
           if(_filters.fseNumeroFacturation)
           {
               mainTableFilters.push({name:'invoiceHasFseNumeroFacturation',value:_filters.fseNumeroFacturation});

           }
           if(_filters.fseNumber)
           {
               let searchFseNumber=_filters.fseNumber;
               for (let i = searchFseNumber.length; i <9; i++) {
                   _filters.fseNumber="0"+_filters.fseNumber;

               }
               mainTableFilters.push({name:'invoiceHasFseNumber',value:_filters.fseNumber});
           }

           let promiseArray=[];

           if(mainTableFilters.length>0)
           {
               let mainTableObject={tableName:'INVOICE_HAS_FSE',filters:mainTableFilters};
               let joinTablesArray=[];
               joinTablesArray.push({tableName:'INVOICE',fieldsArray:['visitId'],filters:invoiceFilters});

               return dbUtility.joinQuery(mainTableObject,joinTablesArray,500)
                   .then(_resultsArray=>{

                       _resultsArray.forEach(_resultArray=>{
                           let mainTableObject={tableName:'VISIT',filters:[{name:"visitId",value:_resultArray['Invoice.visitId']}],fieldsArray:['siteId','visitDate','visitId','visitInvoiceType','visitCotationStatus']};
                           let joinTablesArray=[];
                           joinTablesArray.push({tableName:'DOCTOR',fieldsArray:['doctorId'],
                               joinObject:{tableName:"USER",
                                   fieldsArray:['userInitiales']}});
                           joinTablesArray.push({tableName:'PATIENT', fieldsArray:['patientLName','patientFname','patientBirthday','patientSearch','patientNbVisit','patientId']});
                           joinTablesArray.push({tableName:'VISIT_BALANCE'});
                           joinTablesArray.push({tableName:'SITE',fieldsArray:['siteCode']});
                           promiseArray.push(dbUtility.joinQuery(mainTableObject,joinTablesArray,500));
                       });

                       return Promise.all(promiseArray);
                   });
           }
           else {
               return Promise.all([]);
           }



       }
       else if(_filters.action==="patientFilter")
       {
           let patientTableFilters=[];

           let mainTableFilters=[];

           if(startIsoDate && endIsoDate){
               let startDate = moment(startIsoDate).format('Y-MM-DD');
               let endDate = moment(endIsoDate).format('Y-MM-DD');
               mainTableFilters.push({name:'visitDate',value1:startDate,value2:endDate,compare:'between'});
           }

           if(_filters.patientLName)
           {
               patientTableFilters.push({name:'patientLName',value:_filters.patientLName});
           }
           if(_filters.patientFname)
           {
               patientTableFilters.push({name:'patientFname',value:_filters.patientFname});
           }
           if(_filters.patientBirthday)
           {
               patientTableFilters.push({name:'patientBirthday',value:_filters.patientBirthday});
           }
           if(_filters.patientSocialNumber)
           {
               patientTableFilters.push({name:'patientSocialNumber',value:_filters.patientSocialNumber});
           }
           if(_filters.patientSocialKey)
           {
               patientTableFilters.push({name:'patientSocialKey',value:_filters.patientSocialKey});
           }
           let mainTableObject={tableName:'VISIT',filters:mainTableFilters,fieldsArray:['siteId','visitDate','visitId','visitInvoiceType','visitCotationStatus']};
           let joinTablesArray=[];
           joinTablesArray.push({tableName:'DOCTOR',fieldsArray:['doctorId'],
               joinObject:{tableName:"USER",
                   fieldsArray:['userInitiales']}});

           joinTablesArray.push({tableName:'PATIENT',
               fieldsArray:['patientLName','patientFname','patientBirthday','patientSearch','patientNbVisit','patientId'],
               filters:patientTableFilters});
           joinTablesArray.push({tableName:'VISIT_BALANCE'});
           joinTablesArray.push({tableName:'SITE',fieldsArray:['siteCode']});
           return Promise.all([dbUtility.joinQuery(mainTableObject,joinTablesArray,500)]);
       }
       else{
           if (!_filters.startDate)
               throw Error('getDataForInvoiceTracking : startDate is undefined');
           if (!_filters.endDate)
               throw Error('getDataForInvoiceTracking : startDate is undefined');

           let startIsoDate=_filters.startDate;
           let endIsoDate=_filters.endDate;

           let mainTableFilters=[];

           if(startIsoDate && endIsoDate){
               let startDate = moment(startIsoDate).format('Y-MM-DD');
               let endDate = moment(endIsoDate).format('Y-MM-DD');
               mainTableFilters.push({name:'visitDate',value1:startDate,value2:endDate,compare:'between'});
           }
           if(_filters.site)
               mainTableFilters.push({name:'siteId',value:_filters.site});

           if(_filters.visitNumber)
               mainTableFilters.push({name:'visitPacsId',value:_filters.visitNumber});

           if(_filters.needInvoice && _filters.needInvoice==="on")
               mainTableFilters.push({name:'visitInvoiceType',value:0});
           else if(_filters.invoiceType)
               mainTableFilters.push({name:'visitInvoiceType',value:_filters.invoiceType});

           if(_filters.doctor)
               mainTableFilters.push({name:'doctorId',value:_filters.doctor});

           let worklistFilters=[];
           if(_filters.pec)
               worklistFilters.push({name:'worklistPriseEnCharge',value:_filters.pec,compare:'contains'});

           /*let visitBalanceFilters=[];
           if(filters.invoiceAmount)
               visitBalanceFilters.push({name:'doctorId',value:_filters.doctor});*/


           let mainTableObject={tableName:'VISIT',filters:mainTableFilters,fieldsArray:['siteId','visitDate','visitId','visitInvoiceType','visitCotationStatus']};
           let joinTablesArray=[];
           joinTablesArray.push({tableName:'DOCTOR',fieldsArray:['doctorId'],
               joinObject:{tableName:"USER",
                   fieldsArray:['userInitiales']}});
           joinTablesArray.push({tableName:'WORKLIST',fieldsArray:['worklistPriseEnCharge'],filters:worklistFilters});
           joinTablesArray.push({tableName:'PATIENT', fieldsArray:['patientLName','patientFname','patientBirthday','patientSearch','patientNbVisit','patientId']});
           joinTablesArray.push({tableName:'VISIT_BALANCE'});
           joinTablesArray.push({tableName:'SITE',fieldsArray:['siteCode']});
           return Promise.all([dbUtility.joinQuery(mainTableObject,joinTablesArray,500)]);
       }

   }
};
module.exports = InvoiceTrackingReq;