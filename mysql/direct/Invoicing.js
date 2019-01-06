let models = require("../models");
let invoicingReq=require("../require/InvoicingReq");
let paymentReq=require("../require/PaymentReq");
let concurrentAccessReq=require("../require/concurrentAccessReq");
let commonFunctions=require("../common/CommonFunctions");
let UserHasLogReq=require("../require/UserHasLogReq");
let Invoicing={
    createInvoice:function(params,callback)
    {
        try {
            if(!params.visitId)
                throw Error('createInvoice : visitId is undefined');
            if(!params.invoiceObj)
                throw Error('createInvoice : invoiceObj is undefined');
            let visitId=params.visitId;
            // First We check that there are no validated invoices attached to the _visitId
            invoicingReq.checkForCreatingNewInvoice(visitId)
                .then(_resultBool=>{
                    if(_resultBool)// we can create the invoice
                    {
                        let promise = invoicingReq.createInvoice(visitId,params.invoiceObj,params.invoiceHasFseObj,params.userIdForLog);
                        commonFunctions.executePromiseThenCallback(promise, callback);
                    }
                    else
                        throw Error('userError|An invoice has already been created and validated for this visit');
                })
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    getNumNewFse:function(params,callback)
    {
        // First We check that there are no validated invoices attached to the _visitId
        try {

            let promise = invoicingReq.getNumNewFse();
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    initInvoicing:function(params,callback) {
        if (!params.visitId)
            throw Error('initInvoicing : visitId is undefined');
        if (!params.invoiceType)
            throw Error('initInvoicing : invoiceType is undefined');
        let patientHorsParcoursSoinsAmount = params.patientHorsParcoursSoinsAmount || 0;
        let result = {};
        let tauxAmc = params.tauxAmc||0;
        let tauxAmo = params.tauxAmo||70;

        invoicingReq.checkForCreatingNewInvoice(params.visitId)
            .then(_resultBool=>{
                if(_resultBool)// we can create the invoice
                {
                    return  invoicingReq.getDataToInitInvoicing(params.visitId);
                }
                else
                    throw Error('userError|An invoice has already been created and validated for this visit');
            })
            .then(function (_resultArray) {

                result.visit = _resultArray[0];
                let visit = result.visit;

                if(visit.visitPds!=="13") // si non respect du parcours de soins
                {
                    patientHorsParcoursSoinsAmount=0;
                }
               /* else
                    tauxAmo=tauxAmo-patientHorsParcoursSoinsAmount;*/


                result.patient = _resultArray[1][0];
                result.userCps = _resultArray[2][0] || null;
                result.rego = _resultArray[3] ? _resultArray[3][0] : null;
                result.regc = _resultArray[4] ? _resultArray[4][0] : null;
                if(result.rego && (result.rego.regoInvalidite || result.rego.regoAme || result.rego.regoAmeComp ||
                    result.rego.regoDepistage|| result.rego.regoMaternite|| result.rego.regoAt||result.rego.regoVictimeAttentat
            || result.rego.regoCmu|| result.rego.regoCmuGereParAmc || result.rego.regoSortantCmu|| result.rego.regoAld)){
                    tauxAmo = 100;
                    tauxAmc = 0;
                }
                else if (result.regc) {
                    if(result.regc.regcFormule)
                    {
                        tauxAmc = invoicingReq.getRegcRate(result.regc.regcFormule);
                        if (parseInt(tauxAmc) > 0)
                            tauxAmo = 100-tauxAmc;
                        else
                            tauxAmo = 70;
                    }

                }

                return invoicingReq.getAmountsToInitInvoice(visit.visitId, visit.visitIsFree, params.invoiceType, visit.visitIsAmo, visit.visitIsAmc, tauxAmo, tauxAmc, patientHorsParcoursSoinsAmount,result.patient,result.visit,result.rego);
            })
            .then(_resultAmountObj => {
                result.amountsObj=_resultAmountObj;
                result.invoiceRegoRate=tauxAmo;
                    result.invoiceRegcRate=tauxAmc;
                callback(null, {
                    data: result,
                    success: true,
                    msg: ''

                });
            })
            .catch(function (_err) {
                console.error(_err);
                callback(null, {
                    data: [],
                    success: false,
                    msg: _err.message
                });
            })
    },
     validateInvoice:function(params,callback){

      if(!params.visitId)
             throw Error('validateInvoice : visitId is undefined');
         if(!params.invoiceObj)
             throw Error('validateInvoice : invoiceObj is undefined');
         invoicingReq.validateInvoice(params.visitId,params.invoiceObj,params.userIdForLog)
             .then(function (result) {
                callback(null, {
                 data: "",
                 success: true,
                 msg: ''

             });
         }).catch(function (_err) {
              console.error(_err);
             callback(null, {
                 data: [],
                 success: false,
                 msg: _err.message
             });
         });
         },
    addPaymentsForOneInvoice:function(params,callback)
    {
        try{


        if (!params.paymentObjArray)
            throw Error('savePaymentForOneInvoice : paymentObjArray is undefined');
        if (!params.invoiceId)
            throw Error('savePaymentForOneInvoice : invoiceId is undefined');
        if (!params.visitId)
            throw Error('savePaymentForOneInvoice : visitId is undefined');
        if (!params.paymentIssuer)
            throw Error('savePaymentForOneInvoice : paymentIssuer is undefined');

       let promise= paymentReq.addPaymentsForOneInvoice(params.paymentObjArray,params.invoiceId,params.visitId,params.paymentIssuer,params.userIdForLog);
       commonFunctions.executePromiseThenCallback(promise,callback);

        }
       catch (_err)
       {
        commonFunctions.catchWidthCallback(_err,callback);
       }
    },
    getBankAccountForPatientPaymentByVisitIds:function(params,callback) {

        try {
            if (!params.visitIdsArray)
                throw Error('getBankAccountForPatientPaymentByVisitIds : visitIdsArray is undefined');
            if (!params.paymentIssuer)
                throw Error('getBankAccountForPatientPaymentByVisitIds : paymentIssuer is undefined');
            if (!params.paymentMethodId)
                throw Error('getBankAccountForPatientPaymentByVisitIds : paymentMethodId is undefined');

            let visitIdsArray = params.visitIdsArray;
            let paymentIssuer = parseInt(params.paymentIssuer);
            let paymentMethodId = params.paymentMethodId;

            let promise =  paymentReq.getBankAccountForPatientPaymentByVisitIds(visitIdsArray, paymentIssuer, paymentMethodId);
            commonFunctions.executePromiseThenCallback(promise, callback);
        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }

    },

    generateAvoir:function(params,callback) {

        try {
            if (!params.invoiceId)
                throw Error('generateAvoir : invoiceId is undefined');
            if (!params.visitId)
                throw Error('generateAvoir : visitId is undefined');
            if (!params.invoiceAmount)
                throw Error('generateAvoir : invoiceAmount is undefined');

            let promise = invoicingReq.generateAvoir(params.invoiceId,params.visitId,params.invoiceAmount,params.isFt,params.userIdForLog);
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    },
    generateLoss:function(params,callback) {
        if (!params.visitId)
            throw Error('generateLoss : visitId is undefined');
        if (!params.lossAmount)
            throw Error('generateLoss : lossAmount is undefined');
        if (!params.lossPart)
            throw Error('generateLoss : lossPart is undefined');

        invoicingReq.getValidatedInvoiceByVisitId(params.visitId,params.isFt)
            .then(_resultsInvoicesArray=>{
                if(!_resultsInvoicesArray.length )
                    throw Error('generateLoss : no validated invoice was found');
                if(_resultsInvoicesArray.length>1)
                    throw Error('generateLoss : more than one validated invoice was found');
                return invoicingReq.generateLoss(params.visitId,_resultsInvoicesArray[0].invoiceId,params.lossPart,params.lossAmount);
            })
            .then(_resultArray=>{
                callback(null, {
                    data: "",
                    success: true,
                    msg: ''
                });
            }).catch(_err=> {
            console.error(_err.stack);
            callback(null, {
                data: "",
                success: false,
                msg: _err.message
            });
        });
    },
    checkIfInvoiceCanBeCancelled:function(params,callback) {
        if (!params.invoiceId)
            throw Error('checkIfInvoiceCanBeCancelled : invoiceId is undefined');
        invoicingReq.checkIfInvoiceCanBeCancelled(params.invoiceId)
            .then(_boolResult=>{
                callback(null, {
                    data: _boolResult,
                    success: true,
                    msg: ''
                });
            }).catch(_err=> {
            console.error(_err.stack);
            callback(null, {
                data: "",
                success: false,
                msg: _err.message
            });
        });
    },

    cancelInvoice:function(params,callback) {
        if (!params.visitId)
            throw Error('cancelInvoice : visitId is undefined');
        if (!params.userIdForLog)
            throw Error('cancelInvoice : userLogId is undefined');
        if (!params.invoiceId)
            throw Error('cancelInvoice : invoiceId is undefined');
        invoicingReq.cancelInvoice(params.invoiceId,params.visitId,'',params.userIdForLog)
            .then(_resultArray=>{
                callback(null, {
                    data: "",
                    success: true,
                    msg: ''
                });
            }).catch(_err=> {
            console.error(_err.stack);
            callback(null, {
                data: "",
                success: false,
                msg: _err.message
            });
        });
    },
    getValidatedInvoiceByVisitId:function(params,callback) {
        if (!params.visitId)
            throw Error('getValidatedInvoiceByVisitId : visitId is undefined');
        invoicingReq.getValidatedInvoiceByVisitId(params.visitId,params.isFt)
            .then(_resultArray=>{
                callback(null, {
                    data: _resultArray,
                    success: true,
                    msg: ''
                });
            }).catch(_err=> {
            console.error(_err.stack);
            callback(null, {
                data: "",
                success: false,
                msg: _err.stack
            });
        });
    },
    getBankAccountsForPayment:function(params,callback) {
        if (!params.siteId)
            throw Error('getBankAccountsForPayment : visitId is undefined');
        if (!params.userId)
            throw Error('getBankAccountsForPayment : userId is undefined');

        if (!params.paymentMethodId)
            throw Error('getBankAccountsForPayment : paymentMethodId is undefined');

        paymentReq.getBankAccountsForPayment(params.siteId,params.userId,params.paymentMethodId)
            .then(_resultArray=>{
                callback(null, {
                    data: _resultArray,
                    success: true,
                    msg: ''
                });
            }).catch(_err=> {
            console.error(_err.stack);
            callback(null, {
                data: "",
                success: false,
                msg: _err.stack
            });
        });
    },
    addPaymentMultiInvoicesByRsp:function(params,callback)
    {
        try{

            if (!params.rspId)
                throw Error('addPaymentMultiInvoicesByRsp : rspId is undefined');
            if (!params.paymentObj)
                throw Error('addPaymentMultiInvoicesByRsp : paymentObj is undefined');

      if (!params.userIdForLog)
                throw Error('addPaymentMultiInvoicesByRsp : userIdForLog is undefined');

            let invoicesAndAmountsArray=[];

            paymentReq.getInvoicesToAddPaymentByRspId(params.rspId)
                .then(_resultArray=>{
                    _resultArray.forEach(_invoiceHasFseObj=>{
                        invoicesAndAmountsArray.push({visitId:_invoiceHasFseObj['Invoice.visitId'],paymentAmoAmount:_invoiceHasFseObj.invoiceHasFseAmountNoemiRego,paymentAmcAmount:_invoiceHasFseObj.invoiceHasFseAmountNoemiRegc,invoiceId:_invoiceHasFseObj.invoiceId});
                    });
                    if(invoicesAndAmountsArray && invoicesAndAmountsArray.length)
                    {
                        let promise= paymentReq.addPaymentMultiInvoices(params.paymentObj,invoicesAndAmountsArray,10,params.userIdForLog,params.rspId);
                        commonFunctions.executePromiseThenCallback(promise,callback);

                    }
                    else {
                        callback(null, {
                            data: "",
                            success: true,
                            msg: ''

                        });
                    }
                });

              }
        catch (_err)
        {
            commonFunctions.catchWidthCallback(_err,callback);
        }
    },

    addPaymentMultiInvoices:function(params,callback)
    {
        try{

            if (!params.paymentObj)
                throw Error('addPaymentMultiInvoices : paymentObj is undefined');
            if (!params.invoicesAndAmountsArray)
                throw Error('addPaymentMultiInvoices : invoicesAndAmountsArray is undefined');
            if (!params.paymentIssuer)
                throw Error('addPaymentMultiInvoices : paymentIssuer is undefined');
            if (!params.userIdForLog)
                throw Error('addPaymentMultiInvoices : userIdForLog is undefined');

            let promise= paymentReq.addPaymentMultiInvoices(params.paymentObj,params.paymentIssuer,params.invoicesAndAmountsArray,params.userIdForLog);
            commonFunctions.executePromiseThenCallback(promise,callback);
        }
        catch (_err)
        {
            commonFunctions.catchWidthCallback(_err,callback);
        }
    },
    addPaymentMultiInvoicesByVisitsId:function(params,callback)
    {
        try{

            if (!params.visitIdArray)
                throw Error('addPaymentMultiInvoicesByVisitsId : visitIdArray is undefined');
            if (!params.paymentObj)
                throw Error('addPaymentMultiInvoicesByVisitsId : paymentObj is undefined');
            if (!params.paymentIssuer)
                throw Error('addPaymentMultiInvoicesByVisitsId : paymentIssuer is undefined');

            let promise= paymentReq.addPaymentMultiInvoicesByVisitsId(params.visitIdArray,params.paymentObj,params.paymentIssuer,params.isFt,params.userIdForLog);
            commonFunctions.executePromiseThenCallback(promise,callback);
        }
        catch (_err)
        {
            commonFunctions.catchWidthCallback(_err,callback);
        }
    },
    cancelPayment: function (params, callback) {
        try {
            if (!params.paymentId)
                throw Error(' cancelPayment : paymentId is undefined');
            let promise = paymentReq.cancelPayment(params.paymentId,params.userIdForLog);
            commonFunctions.executePromiseThenCallback(promise, callback);

        }
        catch (_err) {
            commonFunctions.catchWidthCallback(_err, callback);
        }
    }
};
module.exports=Invoicing;
