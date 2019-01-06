let models = require('../models');
let invoicingReq = require('../require/InvoicingReq');
let cashBoxFlowReq = require('../require/CashBoxFlowReq');
let uuid = require('node-uuid');
let UserHasLogReq=require("../require/UserHasLogReq");
let PaymentReq = {

    calcVisitBalanceByPaymentIssuer:function(_paymentIssuer,_paymentObj,_visitBalanceObj,_visitBalanceToUpdateObj)
    {

      let mt=0;
        switch (_paymentIssuer) {
            case 1 : // patient
            case 4 : // establishment
                if(!_visitBalanceToUpdateObj.visitBalancePatientPaidAmount)
                    _visitBalanceToUpdateObj.visitBalancePatientPaidAmount=0;
                mt=_visitBalanceObj.visitBalancePatientPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalancePatientPaidAmount += Math.round(mt*100)/100;

                break;
            case 2 : // rego
                if(!_visitBalanceToUpdateObj.visitBalanceRegoPaidAmount)
                    _visitBalanceToUpdateObj.visitBalanceRegoPaidAmount=0;
                mt=_visitBalanceObj.visitBalanceRegoPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalanceRegoPaidAmount += Math.round(mt*100)/100;
                break;
            case 3 : // regc
                if(!_visitBalanceToUpdateObj.visitBalanceRegcPaidAmount)
                    _visitBalanceToUpdateObj.visitBalanceRegcPaidAmount=0;
                mt=_visitBalanceObj.visitBalanceRegcPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalanceRegcPaidAmount += Math.round(mt*100)/100;
                break;
            case 5 : // ft patient
                if(!_visitBalanceToUpdateObj.visitBalancePatientFtPaidAmount)
                    _visitBalanceToUpdateObj.visitBalancePatientFtPaidAmount=0;
                mt=_visitBalanceObj.visitBalancePatientFtPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalancePatientFtPaidAmount += Math.round(mt*100)/100;
                break;
            case 7 : // ft establishment
                if(!_visitBalanceToUpdateObj.visitBalanceEstablishmentFtPaidAmount)
                    _visitBalanceToUpdateObj.visitBalanceEstablishmentFtPaidAmount=0;
                mt=_visitBalanceObj.visitBalanceEstablishmentFtPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalanceEstablishmentFtPaidAmount += Math.round(mt*100)/100;
                break;
            case 6 : // ft AMO
                if(!_visitBalanceToUpdateObj.visitBalanceRegoFtPaidAmount)
                    _visitBalanceToUpdateObj.visitBalanceRegoFtPaidAmount=0;

                mt=_visitBalanceObj.visitBalanceRegoFtPaidAmount+_paymentObj.paymentAmount;
                _visitBalanceToUpdateObj.visitBalanceRegoFtPaidAmount += Math.round(mt*100)/100;
                break;
            case 8 : // TODO payment form noemi rego

                break;
            case 9 : // TODO payment from noemi regc

                break;
        }
    },
    /**
     * this function calculate the Visit Balance when we do a multi invoices payment
     * @param _paymentIssuer : int
     * @param _visitBalanceObj : object
     * @param _invoicesAndAmountsArray : array this array  contains amounts for all invoices we want to settle,
     * if empty the paid amount will be equal to the invoice amount
     * _invoicesAndAmountsArray contains object like this {visitId:'',paymentAmount:'',invoiceId:''} or {visitId:'',paymentAmoAmount:'',paymentAmcAmount:'',invoiceId:''} in case of  (AMo and Amc) payment like as 'Noemie'
     */
    calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment:function(_paymentIssuer,_visitBalanceObj,_invoicesAndAmountsArray)
    {
        if (!_paymentIssuer)
            throw Error('calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment : _paymentIssuer is undefined');
        if (!_visitBalanceObj)
            throw Error('calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment : _visitBalanceObj is undefined');
        if (!_invoicesAndAmountsArray)
            throw Error('calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment : _invoicesAndAmountsArray is undefined');

        let visitBalanceObj={};
        visitBalanceObj.visitId=_visitBalanceObj.visitId;

        let paymentAmount=0;
        let paymentAmoAmount=0;
        let paymentAmcAmount=0;
        let invoiceId="";

            _invoicesAndAmountsArray.forEach(_invoiceAndAmountObj=>{
                if(_visitBalanceObj.visitId===_invoiceAndAmountObj.visitId)
                {
                    if(_invoiceAndAmountObj.paymentAmount)
                    {
                        paymentAmount=Math.round(parseFloat(_invoiceAndAmountObj.paymentAmount)*100)/100;

                    }
                    if(_invoiceAndAmountObj.paymentAmoAmount || _invoiceAndAmountObj.paymentAmcAmount)
                    {
                        paymentAmoAmount=Math.round(parseFloat(_invoiceAndAmountObj.paymentAmoAmount)*100)/100;

                        paymentAmcAmount=Math.round(parseFloat(_invoiceAndAmountObj.paymentAmcAmount)*100)/100;
                    }
                    invoiceId=_invoiceAndAmountObj.invoiceId;

                }
            });

            let invoicedLessLossAmount;
        switch (_paymentIssuer) {
            case 1 : // patient
            case 4 : // establishment
                if(!paymentAmount)
                {
                    invoicedLessLossAmount=_visitBalanceObj.visitBalancePatientAmount-_visitBalanceObj.visitBalancePatientLossAmount;
                    visitBalanceObj.visitBalancePatientPaidAmount=Math.round(invoicedLessLossAmount*100)/100;


                    paymentAmount=invoicedLessLossAmount-_visitBalanceObj.visitBalancePatientPaidAmount;// règlement total de la facture
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                else
                    visitBalanceObj.visitBalancePatientPaidAmount= Math.round((_visitBalanceObj.visitBalancePatientPaidAmount+paymentAmount)*100)/100;// réglement partiel de la facture

                break;
            case 2 : // rego
                if(!paymentAmount){
                    invoicedLessLossAmount=_visitBalanceObj.visitBalanceRegoAmount-_visitBalanceObj.visitBalanceRegoLossAmount;
                    visitBalanceObj.visitBalanceRegoPaidAmount=Math.round(invoicedLessLossAmount*100)/100;
                    paymentAmount=invoicedLessLossAmount-_visitBalanceObj.visitBalanceRegoPaidAmount;
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                 else
                    visitBalanceObj.visitBalanceRegoPaidAmount= Math.round((_visitBalanceObj.visitBalanceRegoPaidAmount+paymentAmount)*100)/100;

                break;
            case 3 : // regc
                if(!paymentAmount){
                    invoicedLessLossAmount=_visitBalanceObj.visitBalanceRegcAmount-_visitBalanceObj.visitBalanceRegcLossAmount;

                    visitBalanceObj.visitBalanceRegcPaidAmount=Math.round(invoicedLessLossAmount*100)/100;
                    paymentAmount=invoicedLessLossAmount-_visitBalanceObj.visitBalanceRegcPaidAmount;
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                   else
                    visitBalanceObj.visitBalanceRegcPaidAmount= Math.round((_visitBalanceObj.visitBalanceRegcPaidAmount+paymentAmount)*100)/100;

                break;
            case 5 : // ft patient

                if(!paymentAmount){
                    invoicedLessLossAmount=_visitBalanceObj.visitBalancePatientFtAmount-_visitBalanceObj.visitBalancePatientFtLossAmount;
                    visitBalanceObj.visitBalancePatientFtPaidAmount=Math.round(invoicedLessLossAmount*100)/100;;
                        paymentAmount= invoicedLessLossAmount-_visitBalanceObj.visitBalancePatientFtPaidAmount;
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                else
                    visitBalanceObj.visitBalancePatientFtPaidAmount= Math.round((_visitBalanceObj.visitBalancePatientFtPaidAmount+paymentAmount)*100)/100;

                break;
            case 7 : // ft establishment
                if(!paymentAmount){
                    invoicedLessLossAmount=_visitBalanceObj.visitBalanceEstablishmentFtAmount-_visitBalanceObj.visitBalanceEstablishmentFtLossAmount;
                    visitBalanceObj.visitBalanceEstablishmentFtPaidAmount=Math.round(invoicedLessLossAmount*100)/100;;
                    paymentAmount= invoicedLessLossAmount-_visitBalanceObj.visitBalanceEstablishmentFtPaidAmount;
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                else
                    visitBalanceObj.visitBalanceEstablishmentFtPaidAmount= Math.round((_visitBalanceObj.visitBalanceEstablishmentFtPaidAmount+paymentAmount)*100)/100;

                break;
            case 6 : // ft AMO

                if(!paymentAmount){
                    invoicedLessLossAmount=_visitBalanceObj.visitBalanceRegoFtAmount-_visitBalanceObj.visitBalanceRegoFtLossAmount;
                    visitBalanceObj.visitBalanceRegoFtPaidAmount=Math.round(invoicedLessLossAmount*100)/100;;
                    paymentAmount=invoicedLessLossAmount-_visitBalanceObj.visitBalanceRegoFtPaidAmount;
                    paymentAmount=Math.round(paymentAmount*100)/100;
                }
                    else
                    visitBalanceObj.visitBalanceRegoFtPaidAmount=  Math.round((_visitBalanceObj.visitBalanceRegoFtPaidAmount+paymentAmount)*100)/100;

                break;
            case 8 : // TODO payment form noemi rego

                break;
            case 9 : // TODO payment from noemi regc

                break;
            case 10 : // payment for Noemie AMO et AMC

                    visitBalanceObj.visitBalanceRegoPaidAmount= Math.round((_visitBalanceObj.visitBalanceRegoPaidAmount+paymentAmoAmount)*100)/100;

                    visitBalanceObj.visitBalanceRegcPaidAmount= Math.round((_visitBalanceObj.visitBalanceRegcPaidAmount+paymentAmcAmount)*100)/100;

                paymentAmount=paymentAmoAmount+paymentAmcAmount;
                paymentAmount=Math.round(paymentAmount*100)/100;
                break;
        }
        return {paymentAmount:paymentAmount,visitBalanceObj:visitBalanceObj,invoiceId:invoiceId};
    },
    /**
     *
     * @param _visitIdArray
     * @param _paymentObj
     * @param _paymentIssuer
     * @param _isFt
     */
    addPaymentMultiInvoicesByVisitsId:function(_visitIdArray,_paymentObj,_paymentIssuer,_isFt,_userIdForLog)
    {
        if (!_visitIdArray)
            throw Error('addPaymentMultiInvoicesByVisitsId : _visitIdArray is undefined');
        if (!_paymentObj)
            throw Error('addPaymentMultiInvoicesByVisitsId : _paymentObj is undefined');
        if (!_paymentIssuer)
            throw Error('addPaymentMultiInvoicesByVisitsId : _paymentIssuer is undefined');

        let validatedInvoicesPromiseArray=[];
        let invoicesAndAmountsArray=[];

        _visitIdArray.forEach(_visitId=>{
            validatedInvoicesPromiseArray.push(invoicingReq.getValidatedInvoiceByVisitId(_visitId,_isFt));
        });
        return Promise.all(validatedInvoicesPromiseArray)
            .then(_validatedInvoicesArray=>{
                _validatedInvoicesArray.forEach(_validatedInvoiceArray=>{
                    let validatedInvoiceObj=_validatedInvoiceArray[0];
                    invoicesAndAmountsArray.push({visitId:validatedInvoiceObj.visitId,
                                                    paymentAmount:0,
                        invoiceId:validatedInvoiceObj.invoiceId});
                });
                return PaymentReq.addPaymentMultiInvoices(_paymentObj,invoicesAndAmountsArray,_paymentIssuer,_userIdForLog);

            })



    },
    getInvoicesToAddPaymentByRspId:function(_rspId)
    {
        let dbUtility = global.App.DbUtility;
        let invoiceFilters=[];
        invoiceFilters.push({name: 'invoiceIsValidated', value: true, compare: 'eq'});//is validated
        invoiceFilters.push( {name: 'invoiceIsCancelled', value: false, compare: 'eq'}); // is not cancelled
        invoiceFilters.push( {name: 'invoiceHasAvoir', value: false, compare: 'eq'}); //

        let filtersArray=[{name:'rspId',value:_rspId,compare:'eq'}];

        let mainTableInvoiceHasFseObject={tableName:"INVOICE_HAS_FSE"
            ,fieldsArray:['invoiceId','invoiceHasFseNumber','invoiceHasFseAmountNoemiRego','invoiceHasFseAmountNoemiRegc','invoiceHasFseLotNumber','invoiceHasFseErreurNoemi'],filters:filtersArray};
        let joinTablesInvoiceHasFseArray=[
            {
                tableName:"INVOICE",fieldsArray:['visitId'],
                filters:invoiceFilters
            }
        ];
        return dbUtility.joinQuery(mainTableInvoiceHasFseObject,joinTablesInvoiceHasFseArray,'no');

    },
    /**
     *
     * @param _paymentObj
     * @param _invoicesAndAmountsArray array contains object like this {visitId:'',paymentAmount:'',invoiceId:''}
     * @param _paymentIssuer
     * @param _userIdForLog
     * @param _rspId
     * @returns {*}
     */
    addPaymentMultiInvoices:function(_paymentObj,_invoicesAndAmountsArray,_paymentIssuer,_userIdForLog,_rspId)
    {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_paymentObj)
                    throw Error('addPaymentMultiInvoices : _paymentObj is undefined');
                if (!_invoicesAndAmountsArray)
                    throw Error('addPaymentMultiInvoices : _invoicesAndAmountsArray is undefined');
                if (!_paymentIssuer)
                    throw Error('addPaymentMultiInvoices : _paymentIssuer is undefined');

                // chain all your queries here. make sure you return them.
                let visitsBalancesPromiseArray=[];
                _invoicesAndAmountsArray.forEach(_invoiceAndAmountsObj=>{
                    let params = {};
                    params.filters = [{name: 'visitId', value: _invoiceAndAmountsObj.visitId}];
                    visitsBalancesPromiseArray.push(dbUtility.read(params, 'VISIT_BALANCE'));
                });
                let paymentAmountsArray=[]; // contains objects like {invoiceId:"",paymentAmount:""}
                return Promise.all(visitsBalancesPromiseArray)
                    .then(_visitsBalancesArray => {

                        let visitBalanceToSavePromiseArray=[];

                         _visitsBalancesArray.forEach(_visitBalanceArray=>{
                            let visitBalance = _visitBalanceArray[0];
                            let amountAndVisitBalanceObj=PaymentReq.calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment(_paymentIssuer,visitBalance,_invoicesAndAmountsArray);
                           let visitBalanceToUpdate=amountAndVisitBalanceObj.visitBalanceObj;

                            paymentAmountsArray.push({invoiceId:amountAndVisitBalanceObj.invoiceId,
                                paymentAmount:amountAndVisitBalanceObj.paymentAmount});

                            visitBalanceToUpdate.idName = "visitBalanceId";
                            visitBalanceToUpdate.idValue = visitBalance.visitBalanceId;
                            visitBalanceToSavePromiseArray.push(dbUtility.saveRecord(visitBalanceToUpdate, "VISIT_BALANCE", t));
                        });

                        return Promise.all(visitBalanceToSavePromiseArray);
                    })
                    .then(_visitBalanceResult => {
                            _paymentObj.paymentId=uuid.v4();
                            _paymentObj.paymentIssuer=_paymentIssuer;
                            _paymentObj.paymentMultiInvoice=true;

                        if (!_paymentObj.siteId)
                            throw Error('addPaymentMultiInvoices : siteId is undefined');

                            if(!_paymentObj.cashBoxId)
                                _paymentObj.cashBoxId=null;

                        return dbUtility.saveRecord(_paymentObj, 'PAYMENT', t);
                    })
                    .then(_paymentResult=>{

                        let invoiceHasPaymentPromiseArray=[];
                        paymentAmountsArray.forEach(_paymentAmountObj=>{
                            let invoiceHasPaymentObj={};
                            invoiceHasPaymentObj.invoiceHasPaymentId=uuid.v4();
                            invoiceHasPaymentObj.invoiceId=_paymentAmountObj.invoiceId;
                            invoiceHasPaymentObj.paymentId=_paymentObj.paymentId;
                            invoiceHasPaymentObj.invoiceHasPaymentAmount=_paymentAmountObj.paymentAmount;
                            invoiceHasPaymentPromiseArray.push(dbUtility.saveRecord(invoiceHasPaymentObj, 'INVOICE_HAS_PAYMENT', t));
                        });
                        return Promise.all(invoiceHasPaymentPromiseArray);
                    })
                    .then( _invoiceHasPaymentResult=>{
                        let userHasLog=new UserHasLogReq();
                        return userHasLog.saveUserHasLog(_userIdForLog,'Payment',_paymentObj.paymentId,'','','Payment multi-facture',null,t);
                    })
                    .then(_resultUserLog=>{
                        if(_paymentObj.cashBoxId){
                            let cashBoxFlowObj={};
                            cashBoxFlowObj.paymentId=_paymentObj.paymentId;
                            cashBoxFlowObj.cashBoxId=_paymentObj.cashBoxId;
                            cashBoxFlowObj.cashBoxFlowAmount=_paymentObj.paymentAmount;
                            cashBoxFlowObj.cashBoxFlowDate=new Date();
                            cashBoxFlowObj.cashBoxFlowType=2;
                            cashBoxFlowObj.active=true;
                            return dbUtility.saveRecord(cashBoxFlowObj, 'CASH_BOX_FLOW', t);
                        }
                        else
                            return Promise.resolve({});
                    })
                    .then(_resultCashBox=>{
                        if(_rspId){
                            let rspObj={};
                            rspObj.idName="rspId";
                            rspObj.idValue=_rspId;
                            rspObj.rspIsMatched=true;
                            return dbUtility.saveRecord(rspObj, 'RSP', t);
                        }
                        else
                            return Promise.resolve({});
                    })
    })
    },
    /**
     * this function is used when we need to save payment for one invoice
     * @param _paymentObjArray : array of payments (for one invoice)
     * @param _invoiceId
     * @param _visitId
     * @param _paymentIssuer can be // 1 patient , 2 rego , 3 regc, 4 establishment, 5 ft patient, 6 ft rego,7 ft establishment, 8 Noemie rego,9 Noemie regc
     * @returns Promise
     */
    addPaymentsForOneInvoice: function (_paymentObjArray, _invoiceId, _visitId, _paymentIssuer,_userIdForLog) {
        let dbUtility = global.App.DbUtility;
        let paymentId;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_paymentObjArray)
                    throw Error('addPaymentsForOneInvoice : _paymentObjArray is undefined');
                if (!_invoiceId)
                    throw Error('addPaymentsForOneInvoice : _invoiceId is undefined');
                if (!_visitId)
                    throw Error('addPaymentsForOneInvoice : _visitId is undefined');
                if (!_paymentIssuer)
                    throw Error('addPaymentsForOneInvoice : _paymentIssuer is undefined');
                // chain all your queries here. make sure you return them.
                let params = {};
                params.filters = [{name: 'visitId', value: _visitId}];
                //params.fieldsArray[''];
                return dbUtility.read(params, 'VISIT_BALANCE')
                    .then(_visitsBalancesArray => {
                            if (!_visitsBalancesArray)
                                throw Error('savePaymentForOnInvoice : visitBalance is not found for this visitId ' + _visitId);
                            let visitBalance = _visitsBalancesArray[0];
                            let visitBalanceToUpdateObj={};

                        _paymentObjArray.forEach(_paymentObj=>{
                           PaymentReq. calcVisitBalanceByPaymentIssuer(_paymentIssuer,_paymentObj,visitBalance,visitBalanceToUpdateObj);
                        });

                        visitBalanceToUpdateObj.idName = "visitBalanceId";
                        visitBalanceToUpdateObj.idValue = _visitId;

                            return dbUtility.saveRecord(visitBalanceToUpdateObj, "VISIT_BALANCE", t);
                        })
                    .then(_visitBalanceResult => {
                        let paymentPromiseArray=[];
                        _paymentObjArray.forEach(_paymentObj=>{
                            _paymentObj.paymentId=uuid.v4();
                            paymentId=_paymentObj.paymentId;
                            if (!_paymentObj.siteId)
                                throw Error('addPaymentsForOneInvoice : siteId is undefined');
                            _paymentObj.paymentIssuer=_paymentIssuer;
                            if(!_paymentObj.cashBoxId)
                                _paymentObj.cashBoxId=null;

                             paymentPromiseArray.push(dbUtility.saveRecord(_paymentObj, 'PAYMENT', t));
                        });
                        return Promise.all(paymentPromiseArray);

                    })
                    .then(_paymentResult=>{

                        let invoiceHasPaymentPromiseArray=[];
                        _paymentObjArray.forEach(_paymentObj=>{
                            let invoiceHasPaymentObj={};
                            invoiceHasPaymentObj.invoiceHasPaymentId=uuid.v4();
                            invoiceHasPaymentObj.invoiceId=_invoiceId;
                            invoiceHasPaymentObj.paymentId=_paymentObj.paymentId;
                            invoiceHasPaymentObj.invoiceHasPaymentAmount=_paymentObj.paymentAmount;

                            invoiceHasPaymentPromiseArray.push(dbUtility.saveRecord(invoiceHasPaymentObj, 'INVOICE_HAS_PAYMENT', t));
                        });
                        return Promise.all(invoiceHasPaymentPromiseArray);
                    })
                    .then( _invoiceHasPaymentResult=>{
                        let userHasLog=new UserHasLogReq();
                        return userHasLog.saveUserHasLog(_userIdForLog,'Payment',paymentId,'','','Règlement facture ',_visitId,t);
                    })
                    .then(_userHasLogResult=>{

                        let cashFlowPromiseArray=[];
                        _paymentObjArray.forEach(_paymentObj=>{
                            if(_paymentObj.cashBoxId)
                            {
                                let cashBoxFlowObj={};
                                cashBoxFlowObj.paymentId=_paymentObj.paymentId;
                                cashBoxFlowObj.cashBoxId=_paymentObj.cashBoxId;
                                cashBoxFlowObj.cashBoxFlowAmount=_paymentObj.paymentAmount;
                                cashBoxFlowObj.cashBoxFlowDate=new Date();
                                cashBoxFlowObj.cashBoxFlowType=2;// payment
                                cashBoxFlowObj.active=true;
                                cashFlowPromiseArray.push(dbUtility.saveRecord(cashBoxFlowObj, 'CASH_BOX_FLOW', t));
                            }
                        });
                        if(cashFlowPromiseArray.length)
                            return Promise.all(cashFlowPromiseArray);
                        else
                            return Promise.resolve([]);
                    })
    })



    },
    /**
     * this function return an array of bank accounts Ids associated to visitIds in the arguments
     * @param _visitIdsArray : array
     * @param _paymentIssuer : int
     * @param _paymentMethodId : uuid
     * @returns {Promise}
     */
    getBankAccountForPatientPaymentByVisitIds:function(_visitIdsArray,_paymentIssuer,_paymentMethodId)
    {
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                let dbUtility = global.App.DbUtility;
                let visitPromiseArray=[];
                let bankAccountPromiseArray=[];
                _visitIdsArray.forEach(_visitId=>{

                    let mainTableObject={tableName:'VISIT',fieldsArray:['siteId'],filters:[{name:'visitId',value:_visitId}]};
                    let joinTablesArray=[];
                    joinTablesArray.push({tableName:'DOCTOR',fieldsArray:['doctorId']});
                    visitPromiseArray.push(dbUtility.joinQuery(mainTableObject,joinTablesArray,'no'));

                });
                Promise.all(visitPromiseArray)
                    .then(_visitsArrayResult=>{

                        _visitsArrayResult.forEach(_visitArrayResult=>{
                            if(_visitsArrayResult.length)
                            {
                                let visitObj=_visitArrayResult[0];
                                bankAccountPromiseArray.push(PaymentReq.getBankAccountsForPayment(visitObj.siteId,visitObj['Doctor.userId'],_paymentIssuer,_paymentMethodId));
                            }
                        });

                        return Promise.all(bankAccountPromiseArray);

                    })
                    .then(_bankAccountsArrays=>{
                        let resultArray=[];
                        _bankAccountsArrays.forEach(_bankAccountArray=>{
                            _bankAccountArray.forEach(_bankAccountId=>{
                                resultArray.push(_bankAccountId);
                            })
                        });
                        resolve(resultArray);
                    })
             });
    },
    /**
     *
     * @param _siteId
     * @param _userId the doctor associated to a payment
     * @param _paymentIssuer 0:All , 1 patient , 2 rego , 3 regc, 4 establishment, 5 ft patient, 6 ft rego,7 ft establishment, 8 Noemie rego,9 Noemie regc // le tier => possible values :0 ALL, 1 Patient, 2 AMO, 3 AMC,4 Establishment
     * @param _paymentMethodId
     * @returns {*}
     */
    getBankAccountsForPayment:function(_siteId,_userId,_paymentIssuer,_paymentMethodId)
    {

        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                let dbUtility = global.App.DbUtility;

                let associatedAccountsIdsArray=[];
                let paramsBankAccountConfig={};
                paramsBankAccountConfig.limit='no';
                dbUtility.read(paramsBankAccountConfig, 'BANK_ACCOUNT_CONFIG')
                    .then(_resultBankAccountConfigArray=>{
                        let isAssociated=true;
                        _resultBankAccountConfigArray.forEach(_bankAccountConfigObj=>{
                            isAssociated=true;
                            if(_siteId && _siteId!==_bankAccountConfigObj.siteId &&  _bankAccountConfigObj.siteId!==0)
                                isAssociated=false;
                            if(_userId && _userId!==_bankAccountConfigObj.userId &&  _bankAccountConfigObj.userId!==0)
                                isAssociated=false;
                            if(_paymentIssuer && _paymentIssuer!==_bankAccountConfigObj.bankAccountConfigTier &&  _bankAccountConfigObj.bankAccountConfigTier!==0)
                                isAssociated=false;
                            if(_paymentMethodId && _paymentMethodId!==_bankAccountConfigObj.paymentMethodId &&  _bankAccountConfigObj.paymentMethodId!==null)
                                isAssociated=false;

                            if(isAssociated)
                                associatedAccountsIdsArray.push(_bankAccountConfigObj.bankAccountId)
                        });
                        resolve(associatedAccountsIdsArray)
                    });

               /* let promiseArray=[];
                let paramsVisit={};
                paramsVisit.filters=[{name:'visitId',value:_visitId}];
                promiseArray.push(dbUtility.read(paramsVisit, 'VISIT'));

                let paramsDoctor={};
                paramsDoctor.filters=[{name:'userId',value:_userId}];
                resolve();*/
             });

    },

    checkIfPaymentCanBeCancelled:function(_paymentId)
    {
        if (!_paymentId)
            throw Error('checkIfPaymentCanBeCancelled : _paymentId is undefined');


        let dbUtility = global.App.DbUtility;
        let checkPromiseArray=[];
        let paramsPayment = {};
        paramsPayment.filters = [{name: 'paymentId', value:_paymentId }];
        checkPromiseArray.push(dbUtility.read(paramsPayment, 'PAYMENT'));
        checkPromiseArray.push(dbUtility.read(paramsPayment, 'CASH_BOX_FLOW'));
        return Promise.all(checkPromiseArray);
    },

    cancelPayment:function(_paymentId,_userIdForLog)
    {
                  return models.sequelize.transaction(
                      {
                          isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
                      },
                      function (t) {
                          let visitId;
                          if (!_paymentId)
                              throw Error('cancelPayment : _paymentId is undefined');
                          if (!_userIdForLog)
                              throw Error('cancelPayment : _userIdForLog is undefined');
                          // chain all your queries here. make sure you return them.
                          let dbUtility = global.App.DbUtility;
                          let paymentObj;
                          let invoicesAndAmountArray=[];//array contains object like this {visitId:'',paymentAmount:'',invoiceId:''}
                          let generatePaymentCancellation=false;
                          let cancellationPaymentId=uuid.v4();
                          return PaymentReq.checkIfPaymentCanBeCancelled(_paymentId)
                              .then(_resultsCheckArray=>{

                                  let actionsPromiseArray=[];
                                  let paymentsArray=_resultsCheckArray[0];
                                  let cashBoxFlowArray=_resultsCheckArray[1];
                                   paymentObj=paymentsArray[0];
                                   if(paymentObj.paymentHasCancellationPayment || paymentObj.paymentIsCancelled || paymentObj.paymentIsCancellation)
                                       throw Error('cancelPayment : _paymentId '+ _paymentId+' is paymentHasCancellationPayment or paymentIsCancelled || paymentIsCancellation');

                                  let cashBoxFlowObj=null;

                                  let cancelCashBoxFlow=false;
                                  if(paymentObj.paymentExportDate)
                                      generatePaymentCancellation=true;
                                  if(cashBoxFlowArray.length)
                                  {
                                       cashBoxFlowObj=cashBoxFlowArray[0];
                                      if(cashBoxFlowObj.cashBoxFlowIsClosed){
                                          generatePaymentCancellation=true;
                                          cancelCashBoxFlow=true;
                                      }
                                  }
                                  if(generatePaymentCancellation){
                                      actionsPromiseArray.push(PaymentReq.generatePaymentCancellation(_paymentId,cancellationPaymentId,t));

                                  }

                                  if(cancelCashBoxFlow)
                                      actionsPromiseArray.push(cashBoxFlowReq.cancelCashBoxFlowByPaymentId(_paymentId,t));

                                  if(generatePaymentCancellation || cancelCashBoxFlow)
                                        return Promise.all(actionsPromiseArray);
                                  else
                                      {
                                      let promiseArray=[];
                                      let paymentToUpdateObj={};
                                      paymentToUpdateObj.idName="paymentId";
                                      paymentToUpdateObj.idValue=_paymentId;
                                      paymentToUpdateObj.paymentIsCancelled=true;
                                      let paymentPromise=dbUtility.saveRecord(paymentToUpdateObj, 'PAYMENT', t);
                                      promiseArray.push(paymentPromise);

                                      if(cancelCashBoxFlow)
                                      {
                                          let cashBoxFlowToUpdateObj={};
                                          cashBoxFlowToUpdateObj.idValue=cashBoxFlowObj.cashBoxFlowId;
                                          cashBoxFlowToUpdateObj.idName="cashBoxFlowId";
                                          cashBoxFlowToUpdateObj.cashBoxFlowIsCancelled=true;
                                          let cashBoxFlowPromise=dbUtility.saveRecord(cashBoxFlowToUpdateObj, 'CASH_BOX_FLOW', t);
                                          promiseArray.push(cashBoxFlowPromise);
                                      }

                                       return Promise.all(promiseArray);
                                  }

                              })

                              .then(_resultsArray => {
                                  // we have to update all visit_balance concerned by the payment

                                  return PaymentReq.getInvoicesHasPayment(_paymentId);
                              })
                              .then(_resultInvoiceHasPayment=>{
                                  _resultInvoiceHasPayment.forEach(_invoiceHasPaymentObj=>{
                                      visitId=_invoiceHasPaymentObj['Invoice.visitId'];
                                      invoicesAndAmountArray.push({visitId:_invoiceHasPaymentObj['Invoice.visitId'],
                                          paymentAmount:_invoiceHasPaymentObj.invoiceHasPaymentAmount*-1,
                                          invoiceId:_invoiceHasPaymentObj.invoiceId});
                                  });
                                  return PaymentReq.updateVisitBalanceAmount(invoicesAndAmountArray,paymentObj.paymentIssuer,t)
                              })
                              .then(_resultUpdateBalance=>{
                                 if(generatePaymentCancellation)
                                    return PaymentReq.createInvoiceHasPaymentForMultiInvoicePayment(invoicesAndAmountArray,paymentObj.paymentIssuer,paymentObj.paymentId,t);
                                  else
                                     return  Promise.resolve([]);

                              })
                              .then(_resultsArray => {
                                  let userHasLog=new UserHasLogReq();
                                  return userHasLog.saveUserHasLog(_userIdForLog,'Payment',_paymentId,'','','Annulation réglement',visitId,t);
                              })

                      })
    },
    generatePaymentCancellation:function(_paymentId,_cancellationPaymentId,_transaction)
    {
        let dbUtility = global.App.DbUtility;
        if (!_paymentId)
            throw Error('generatePaymentCancellation : _paymentId is undefined');

        let actionPromiseArray=[];
        let paramsPayment = {};
        paramsPayment.filters = [{name: 'paymentId', value:_paymentId }];
        return dbUtility.read(paramsPayment, 'PAYMENT')
            .then(_paymentArray=>{
                if(!_paymentArray.length)
                    throw Error('generatePaymentCancellation : payment was not found');

                let paymentObj=_paymentArray[0];
                let cancellationPaymentObj= Object.assign({}, paymentObj);// copie de l'objet _paymentObj

                cancellationPaymentObj.paymentId=_cancellationPaymentId;
                cancellationPaymentObj.paymentDate=new Date();
                cancellationPaymentObj.paymentEntryDate=new Date();
                cancellationPaymentObj.paymentIsCancellation=true;
                cancellationPaymentObj.paymentAmount=paymentObj.paymentAmount*-1;

                let paymentToUpdateObj={};
                paymentToUpdateObj.idName="paymentId";
                paymentToUpdateObj.idValue=_paymentId;
                paymentToUpdateObj.paymentHasCancellationPayment=true;
                actionPromiseArray.push(dbUtility.saveRecord(paymentToUpdateObj, 'PAYMENT', _transaction));

                actionPromiseArray.push(dbUtility.saveRecord(cancellationPaymentObj, 'PAYMENT', _transaction));


                return Promise.all(actionPromiseArray);

            });

    },
    getInvoicesHasPayment:function(_paymentId)
    {
        let dbUtility = global.App.DbUtility;
        let mainTableObject={tableName:'INVOICE_HAS_PAYMENT',filters:[{name:'paymentId',value:_paymentId}]};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'INVOICE',fieldsArray:['visitId']});
        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no');
    },
    /**
     *
     * @param _invoicesAndAmountsArray array _invoicesAndAmountsArray array contains object like this {visitId:'',paymentAmount:'',invoiceId:''}
     * @param _paymentIssuer int
     * @param _transaction
     * @returns {Promise.<TResult>}
     */
    updateVisitBalanceAmount:function(_invoicesAndAmountsArray,_paymentIssuer,_transaction)
    {
        let dbUtility = global.App.DbUtility;
        return PaymentReq.getVisitBalancesByInvoices(_invoicesAndAmountsArray)
            .then(_visitsBalancesArray => {
                let visitBalanceToSavePromiseArray=[];
                _visitsBalancesArray.forEach(_visitBalanceArray=>{
                    let visitBalance = _visitBalanceArray[0];
                    let amountAndVisitBalanceObj=PaymentReq.calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment(_paymentIssuer,visitBalance,_invoicesAndAmountsArray);
                    let visitBalanceToUpdate=amountAndVisitBalanceObj.visitBalanceObj;

                    visitBalanceToUpdate.idName = "visitBalanceId";
                    visitBalanceToUpdate.idValue = visitBalance.visitBalanceId;
                    visitBalanceToSavePromiseArray.push(dbUtility.saveRecord(visitBalanceToUpdate, "VISIT_BALANCE", _transaction));
                });
                return Promise.all(visitBalanceToSavePromiseArray);
            })
    },
    /**
     * this function used when doing a multi invoice payment
     * @param _invoicesAndAmountsArray
     * @param _paymentIssuer
     * @param _paymentId
     * @param _transaction
     */
    createInvoiceHasPaymentForMultiInvoicePayment:function(_invoicesAndAmountsArray,_paymentIssuer,_paymentId,_transaction)
    {
        let dbUtility = global.App.DbUtility;
        return PaymentReq.getVisitBalancesByInvoices(_invoicesAndAmountsArray)
            .then(_visitsBalancesArray => {
                let paymentAmountsArray=[];
                _visitsBalancesArray.forEach(_visitBalanceArray=>{
                    let visitBalance = _visitBalanceArray[0];
                    let amountAndVisitBalanceObj=PaymentReq.calcVisitBalanceByPaymentIssuerForMultiInvoicesPayment(_paymentIssuer,visitBalance,_invoicesAndAmountsArray);

                    paymentAmountsArray.push({invoiceId:amountAndVisitBalanceObj.invoiceId,
                        paymentAmount:amountAndVisitBalanceObj.paymentAmount});
                });
                let invoiceHasPaymentPromiseArray=[];
                paymentAmountsArray.forEach(_paymentAmountObj=>{
                    let invoiceHasPaymentObj={};
                    invoiceHasPaymentObj.invoiceHasPaymentId=uuid.v4();
                    invoiceHasPaymentObj.invoiceId=_paymentAmountObj.invoiceId;
                    invoiceHasPaymentObj.paymentId=_paymentId;
                    invoiceHasPaymentObj.invoiceHasPaymentAmount=_paymentAmountObj.paymentAmount;
                    invoiceHasPaymentPromiseArray.push(dbUtility.saveRecord(invoiceHasPaymentObj, 'INVOICE_HAS_PAYMENT', _transaction));
                });
                return Promise.all(invoiceHasPaymentPromiseArray);
            })
    },
    /**
     *  this function used when doing a multi invoice payment
     *  return   all visit balances corresponding to invoices into _invoicesAndAmountsArray array
     * @param _invoicesAndAmountsArray array  _invoicesAndAmountsArray array contains object like this {visitId:'',paymentAmount:'',invoiceId:''}
     */
    getVisitBalancesByInvoices:function(_invoicesAndAmountsArray)
    {
        let dbUtility = global.App.DbUtility;
        let visitsBalancesPromiseArray=[];
        _invoicesAndAmountsArray.forEach(_invoiceAndAmountsObj=>{
            let params = {};
            params.filters = [{name: 'visitId', value: _invoiceAndAmountsObj.visitId}];
            visitsBalancesPromiseArray.push(dbUtility.read(params, 'VISIT_BALANCE'));
        });
        return Promise.all(visitsBalancesPromiseArray)
    }

};
module.exports = PaymentReq;