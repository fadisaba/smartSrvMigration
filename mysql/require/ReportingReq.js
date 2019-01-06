let invoicingReq = require('../require/InvoicingReq');
let moment = require('../node_modules/moment');
let ReportingReq = {

    getBordereauReglement:function(_filtersObj)
    {
        let dbUtility = global.App.DbUtility;
         let mainTableObject=
             {tableName:'INVOICE_HAS_PAYMENT',
                 fieldsArray:['invoiceId','paymentId','invoiceHasPaymentAmount'],
                 filters:[]};

         let paymentFiltersArray=[];
         paymentFiltersArray.push({name:'paymentDate',value1:_filtersObj.startDate,value2:_filtersObj.endDate,compare:'between'});

        paymentFiltersArray.push({name:'paymentIsCancelled',value:false,compare:'eq'});
        paymentFiltersArray.push({name:'paymentHasCancellationPayment',value:false,compare:'eq'});
        paymentFiltersArray.push({name:'paymentIsCancellation',value:false,compare:'eq'});


        if(_filtersObj.paymentMethodId)
        {
            if ((_filtersObj.paymentMethodId).length)
            {
                paymentFiltersArray.push({name:'paymentMethodId',value:_filtersObj.paymentMethodId,compare:'In'});
            }
        }

         let visitFiltersArray=[];

        if(_filtersObj.siteId)
            visitFiltersArray.push({name:'siteId',value:_filtersObj.siteId});
        if(_filtersObj.doctorId)
            visitFiltersArray.push({name:'doctorId',value:_filtersObj.doctorId});




         //let validatedInvoiceFilters=invoicingReq.getValidatedInvoiceFiltersArray();
        let joinTablesArray=[];
         joinTablesArray.push({tableName:'PAYMENT',fieldsArray:['paymentDate','paymentAmount','paymentMethodId'],filters:paymentFiltersArray});
        joinTablesArray.push({tableName:'INVOICE',fieldsArray:['invoiceId'],filters:[],
        joinObject:{
            tableName:'VISIT',fieldsArray:['visitId','visitPacsId','visitDate'],filters:visitFiltersArray,
            joinObject:{
                tableName:'PATIENT',fieldsArray:['patientId','patientSearch'],filters:[]
            }
        }
        });

        let paymentPromise=dbUtility.joinQuery(mainTableObject,joinTablesArray,'no');
        let paymentMethodPromise= dbUtility.read({}, 'PAYMENT_METHOD');

        let promiseArray=[paymentPromise,paymentMethodPromise];
        return Promise.all(promiseArray)
            .then(_resultsArray=>{
                let paymentResultArray=_resultsArray[0];
                let paymentMethodResultArray=_resultsArray[1];

                let paymentMethodArray=[];

                let resultObj={};
               // resultObj.paymentMethod=paymentMethodResultArray;
                let paymentsArray=[];
                let invoiceHasPayment=[];
                paymentResultArray.forEach(_payment=>{
                    let paymentDate=moment(_payment["Payment.paymentDate"]).format('DD/MM/Y');


                    let paymentFound = paymentsArray.find(
                        _paymentFoundObj => {
                            return _paymentFoundObj.paymentId===_payment.paymentId;
                        });

                    if (!paymentFound) {
                        let paymentAmount=(_payment["Payment.paymentAmount"]).toFixed(2);
                        paymentsArray.push({
                            paymentMethodId:_payment["Payment.paymentMethodId"], paymentId: _payment.paymentId, paymentDate:paymentDate,paymentAmount:paymentAmount
                        });
                    }

                    let visitDate=moment(_payment["Invoice.Visit.visitDate"]).format('DD/MM/Y');
                    let visitNumber=_payment["Invoice.Visit.visitPacsId"];
                    let patient=_payment["Invoice.Visit.Patient.patientSearch"];
                    let paymentInvoiceAmount=(_payment.invoiceHasPaymentAmount).toFixed(2);
                    invoiceHasPayment.push({
                    paymentId:_payment.paymentId, visitDate: visitDate,patient:patient,invoiceHasPaymentAmount:paymentInvoiceAmount,visitPacsId: visitNumber
                    });
                });
                paymentMethodResultArray.forEach(_paymentMethodObj=>{

                    let paymentMethodFound = paymentResultArray.find(
                        _paymentMethodFoundObj => {
                            return _paymentMethodFoundObj["Payment.paymentMethodId"]===_paymentMethodObj.paymentMethodId;
                        });

                    if (paymentMethodFound) {
                        paymentMethodArray.push(_paymentMethodObj);
                    }

                });


                resultObj.paymentMethod=paymentMethodArray;
                resultObj.payment=paymentsArray;
                resultObj.invoice_has_payment=invoiceHasPayment;
                resultObj.dates={startDate:moment(new Date(_filtersObj.startDate)).format('DD/MM/Y'),endDate:moment(new Date(_filtersObj.endDate)).format('DD/MM/Y')};
                if(paymentsArray.length)
                     return resultObj;
                else
                    return null;

            });
    },
    getEncaissements:function(_filtersObj)
    {
        let dbUtility = global.App.DbUtility;

        let paymentFiltersArray=[];
        paymentFiltersArray.push({name:'paymentDate',value1:_filtersObj.startDate,value2:_filtersObj.endDate,compare:'between'});

        paymentFiltersArray.push({name:'paymentIsCancelled',value:false,compare:'eq'});
        paymentFiltersArray.push({name:'paymentHasCancellationPayment',value:false,compare:'eq'});
        paymentFiltersArray.push({name:'paymentIsCancellation',value:false,compare:'eq'});


        if(_filtersObj.paymentMethodId)
        {
            if ((_filtersObj.paymentMethodId).length)
            {
                paymentFiltersArray.push({name:'paymentMethodId',value:_filtersObj.paymentMethodId,compare:'In'});
            }
        }

        if(_filtersObj.siteId)
            paymentFiltersArray.push({name:'siteId',value:_filtersObj.siteId});





        let params = {limit:'no'};
        params.filters = paymentFiltersArray;

        let paymentPromise=dbUtility.read(params, 'PAYMENT');
        let paymentMethodPromise= dbUtility.read({}, 'PAYMENT_METHOD');

        let promiseArray=[paymentPromise,paymentMethodPromise];
        return Promise.all(promiseArray)
            .then(_resultsArray=>{
                let paymentResultArray=_resultsArray[0];
                let paymentMethodResultArray=_resultsArray[1];
                let paymentMethodArray=[];
                let resultObj={};
                let paymentsArray=[];
                paymentResultArray.forEach(_payment=>{
                    _payment.paymentDate=moment(_payment.paymentDate).format('DD/MM/Y');
                    switch (_payment.paymentIssuer)
                    {
                        case 1 :
                            _payment.paymentIssuer="Patient";
                            break;
                        case 2 :
                            _payment.paymentIssuer="AMO";
                            break;
                        case 3 :
                            _payment.paymentIssuer="AMC";
                            break;
                        case 4 :
                            _payment.paymentIssuer="Etablissement";
                            break;
                        case 5 :
                            _payment.paymentIssuer="FT Patient";
                            break;
                        case 6 :
                            _payment.paymentIssuer="FT AMO";
                            break;
                        case 7 :
                            _payment.paymentIssuer="FT Etab.";
                            break;
                        case 8 :
                            _payment.paymentIssuer="Noemie AMO";
                            break;
                        case 9 :
                            _payment.paymentIssuer="Noemie AMC";
                            break;
                        case 10 :
                            _payment.paymentIssuer="Noemie AMO et AMC";
                            break;
                            case 11 :
                            _payment.paymentIssuer="Noemie F.T";
                            break;
                    }

                    if(_payment.paymentMultiInvoice)
                        _payment.paymentMultiInvoice='X';
                    else
                        _payment.paymentMultiInvoice='';

                    _payment.paymentAmount=(_payment.paymentAmount.toFixed(2));

                });
                paymentMethodResultArray.forEach(_paymentMethodObj=>{

                    let paymentMethodFound = paymentResultArray.find(
                        _paymentMethodFoundObj => {
                            return _paymentMethodFoundObj.paymentMethodId===_paymentMethodObj.paymentMethodId;
                        });

                    if (paymentMethodFound) {
                        paymentMethodArray.push(_paymentMethodObj);
                    }
                });

                resultObj.paymentMethod=paymentMethodArray;
                resultObj.payment=paymentResultArray;
                resultObj.dates={startDate:moment(new Date(_filtersObj.startDate)).format('DD/MM/Y'),endDate:moment(new Date(_filtersObj.endDate)).format('DD/MM/Y')};

                if(paymentResultArray.length)
                    return resultObj;
                else
                    return null;

            });
    },
    getActivites:function(_filtersObj)
    {
        let dbUtility = global.App.DbUtility;
        let visitFiltersArray=[];
        visitFiltersArray.push({name:'visitDate',value1:_filtersObj.startDate,value2:_filtersObj.endDate,compare:'between'});

        if(_filtersObj.siteId)
            visitFiltersArray.push({name:'siteId',value:_filtersObj.siteId});
        if(_filtersObj.doctorId)
            visitFiltersArray.push({name:'doctorId',value:_filtersObj.doctorId});

        let mainTableObject= {tableName:'VISIT', filters:visitFiltersArray};

        let joinTablesArray=[];
        joinTablesArray.push({tableName:'DOCTOR',fieldsArray:['doctorId'],
            joinObject:{tableName:'USER',fieldsArray:['userInitiales']}
        });
        joinTablesArray.push({tableName:'PATIENT',fieldsArray:['patientSearch'],filters:[]});
        joinTablesArray.push({tableName:'VISIT_BALANCE',filters:[]
        });



        let visitPromise=dbUtility.joinQuery(mainTableObject,joinTablesArray,'no');


        return visitPromise
            .then(_resultsArray=>{

                let resultObj={};
                _resultsArray.forEach(_visitObj=>{
                    _visitObj.visitDate=moment(_visitObj.visitDate).format('DD/MM/Y');
                    if(_visitObj.visitInvoiceType===1)
                        _visitObj.visitInvoiceType='O';
                    else
                        _visitObj.visitInvoiceType='N';

                    _visitObj.patient=_visitObj['Patient.patientSearch'];
                    _visitObj.doctor=_visitObj['Doctor.User.userInitiales'];
                    _visitObj.visitBalancePatientAmount=_visitObj['VisitBalance.visitBalancePatientAmount'];
                    _visitObj.visitBalancePatientPaidAmount=_visitObj['VisitBalance.visitBalancePatientPaidAmount'];
                    _visitObj.visitBalanceRegoAmount=_visitObj['VisitBalance.visitBalanceRegoAmount'];
                    _visitObj.visitBalanceRegoPaidAmount=_visitObj['VisitBalance.visitBalanceRegoPaidAmount'];
                    _visitObj.visitBalanceRegcAmount=_visitObj['VisitBalance.visitBalanceRegcAmount'];
                    _visitObj.visitBalanceRegcPaidAmount=_visitObj['VisitBalance.visitBalanceRegcPaidAmount'];
                    _visitObj.visitIsAmo=_visitObj.visitIsAmo?"X":"";
                    _visitObj.visitIsAmc=_visitObj.visitIsAmc?"X":"";
                    _visitObj.invoiceAmount=Math.round((_visitObj.visitBalancePatientAmount+_visitObj.visitBalanceRegoAmount+_visitObj.visitBalanceRegcAmount-_visitObj['VisitBalance.visitBalanceRemiseAmount'])*100)/100;

                    _visitObj.invoicePaid=Math.round((_visitObj.visitBalancePatientPaidAmount+_visitObj.visitBalanceRegoPaidAmount+_visitObj.visitBalanceRegcPaidAmount-_visitObj['VisitBalance.visitBalanceRemiseAmount'])*100)/100;
                    _visitObj.montantDu=(Math.round((_visitObj.invoiceAmount-_visitObj.invoicePaid)*100)/100).toFixed(2);
                    _visitObj.visitRemise=(Math.round((_visitObj['VisitBalance.visitBalanceRemiseAmount'])*100)/100).toFixed(2);
                    _visitObj.invoicePaid=(_visitObj.invoicePaid).toFixed(2);
                    _visitObj.invoiceAmount=(_visitObj.invoiceAmount).toFixed(2);
                    _visitObj.visitBalancePatientAmount=(_visitObj.visitBalancePatientAmount).toFixed(2);
                    _visitObj.visitBalancePatientPaidAmount=(_visitObj.visitBalancePatientPaidAmount).toFixed(2);
                    _visitObj.visitBalanceRegoAmount=(_visitObj.visitBalanceRegoAmount).toFixed(2);
                    _visitObj.visitBalanceRegoPaidAmount=(_visitObj.visitBalanceRegoPaidAmount).toFixed(2);
                    _visitObj.visitBalanceRegcAmount=(_visitObj.visitBalanceRegcAmount).toFixed(2);
                    _visitObj.visitBalanceRegcPaidAmount=(_visitObj.visitBalanceRegcPaidAmount).toFixed(2);

                });


                resultObj.activites=_resultsArray;
                resultObj.dates={startDate:moment(new Date(_filtersObj.startDate)).format('DD/MM/Y'),endDate:moment(new Date(_filtersObj.endDate)).format('DD/MM/Y')};

                if(_resultsArray.length)
                    return resultObj;
                else
                    return null;

            });
    },
    getActivitesActes:function(_filtersObj)
    {
        let dbUtility = global.App.DbUtility;
        let promiseArray=[];
        let activitesArray;
        return ReportingReq.getActivites(_filtersObj)
            .then(_resultObj=>{
                 activitesArray=_resultObj.activites;
                 if(_resultObj.activites)
                 {
                     activitesArray.forEach(_activitesObj=>{
                         let params = {};
                         params.filters = [{name: 'visitId', value:_activitesObj.visitId }];
                         params.limit="no";
                         promiseArray.push(dbUtility.read(params, 'study_visit_has_acte'));
                     });
                     return Promise.all(promiseArray);
                 }
                 else return null;

            })
            .then(_resultsStudyVisitHasActe=>{
                if(_resultsStudyVisitHasActe){
                    activitesArray.forEach(_activiteObj=>{
                        _activiteObj.cotations="";
                        _resultsStudyVisitHasActe.forEach(_studyVisitHasActeArray=>{
                            _studyVisitHasActeArray.forEach(_studyVisitHasActeObj=>{
                                if(_activiteObj.visitId===_studyVisitHasActeObj.visitId)
                                    _activiteObj.cotations+=_studyVisitHasActeObj.studyVisitHasActeCode + "-";

                            })
                        })

                    });
                    let resultObj={};
                    resultObj.activites=activitesArray;
                    resultObj.dates={startDate:moment(new Date(_filtersObj.startDate)).format('DD/MM/Y'),endDate:moment(new Date(_filtersObj.endDate)).format('DD/MM/Y')};
                    return resultObj;
                }
                else return null;

            });
    },
};
module.exports = ReportingReq;