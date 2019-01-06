let models = require('../models');
let uuid = require('node-uuid');
let moment = require('../node_modules/moment');
let Sequelize = require("sequelize");
let UserHasLogReq=require("../require/UserHasLogReq");
let InvoicingReq = {
    /**
     *
     * @param _visitId
     * @param _visitIsFree
     * @param _invoiceType
     * @param _isRego
     * @param _isRegc
     * @param _tauxRego
     * @param _tauxRegc
     * @param _patientHorsParcoursSoinsAmount
     * @returns {Promise}
     */
    getAmountsToInitInvoice: function (_visitId, _visitIsFree, _invoiceType, _isRego, _isRegc, _tauxRego, _tauxRegc, _patientHorsParcoursSoinsAmount,_patientObj,_visitObj,_regoObj) {
        //Creating a promise
        return new Promise(
            function (resolve, reject) {
                let totalInvoiceAmount = 0;
                let pavAmount=0;
                let horsNomenclatureAmount = 0;
                let horsNomenclatureAdditionalAmount = 0;
                let ccamAndNgapAmount = 0;
                let ccamAndNgapAditionalAmount = 0;
                let patientAmount = 0;// wihout additionnl nor "Remise" amount
                let patientAdditionalAmount = 0;// additional patient amount
                let patientAmountRemise = 0;
                let regoAmount = 0;
                let regcAmount = 0;
                let regcAdditionalAmount = 0;// additional Regc amount
                let dbUtility = global.App.DbUtility;
                let params = {};
                params.filters = [{name: 'visitId', value: _visitId}];

                Promise.all([dbUtility.read(params, 'STUDY_VISIT_HAS_ACTE'), dbUtility.read({}, 'APP_CONFIG')])
                    .then(_resultArray => {
                        let resStudiesVisitArray=_resultArray[0];
                        let appConfigObj=_resultArray[1][0];
                        resStudiesVisitArray.forEach(_resultStudyVisitHasActe => {
                            if(_resultStudyVisitHasActe.studyVisitHasActeCode==="PAV")
                            {
                                pavAmount=appConfigObj.appConfigAmountPav;
                            }
                            else if (_resultStudyVisitHasActe.studyVisitHasActeType === 3)// hors nomenclature
                            {
                                horsNomenclatureAmount += _resultStudyVisitHasActe.studyVisitHasActeAmount * _resultStudyVisitHasActe.studyVisitHasActeQuantity;
                                horsNomenclatureAdditionalAmount += _resultStudyVisitHasActe.studyVisitHasActeAmountDepassement * _resultStudyVisitHasActe.studyVisitHasActeQuantity;
                            }
                            else {
                                //ccam or nagap
                                ccamAndNgapAmount += _resultStudyVisitHasActe.studyVisitHasActeAmount;
                                ccamAndNgapAditionalAmount += _resultStudyVisitHasActe.studyVisitHasActeAmountDepassement;
                            }
                        });

                       // totalInvoiceAmount = horsNomenclatureAmount + horsNomenclatureAdditionalAmount + ccamAndNgapAmount + horsNomenclatureAdditionalAmount;

                        if (!_isRego && !_isRegc) {
                            patientAmount = ccamAndNgapAmount + horsNomenclatureAmount;
                            patientAdditionalAmount = ccamAndNgapAditionalAmount + horsNomenclatureAdditionalAmount;

                        }
                        else {
                            // il existe un tiers payant Rego ou Regc
                            if (_isRego) {
                                regoAmount = _tauxRego * (ccamAndNgapAmount / 100);
                            }
                            if (_isRegc) {
                                if (_tauxRego + _tauxRegc < 100) {
                                    regcAmount = _tauxRegc * (ccamAndNgapAmount / 100);

                                }
                                else if (_tauxRego + _tauxRegc === 100) {
                                    regcAmount = ccamAndNgapAmount - regoAmount;
                                }
                                else {
                                    let temp1Amount = _tauxRegc * (ccamAndNgapAmount / 100);
                                    let temp2Amount = ccamAndNgapAmount + ccamAndNgapAditionalAmount - regoAmount;
                                    regcAmount = temp1Amount > temp2Amount ? temp1Amount : temp2Amount;
                                }
                                if(pavAmount && !_regoObj.regoRegimeAlsace &&
                                    (_regoObj.regoCmu || _regoObj.regoAmeComp || _regoObj.regoAcs ))
                                {
                                    regoAmount=regoAmount-pavAmount;
                                    regcAmount=regcAmount+pavAmount;
                                }


                                if (regoAmount + regcAmount - ccamAndNgapAmount > 0)
                                    regcAdditionalAmount = regoAmount + regcAmount - ccamAndNgapAmount;
                            }


                            patientAmount = horsNomenclatureAmount;
                            if(pavAmount &&_isRego && !_regoObj.regoRegimeAlsace && !_isRegc)
                            {
                                regoAmount=regoAmount-pavAmount;
                                patientAmount=regcAmount+pavAmount;
                            }

                            if (ccamAndNgapAmount - regcAmount - regoAmount > 0)
                                patientAmount += ccamAndNgapAmount - regcAmount - regoAmount;
                            patientAdditionalAmount = ccamAndNgapAmount + ccamAndNgapAditionalAmount + horsNomenclatureAmount + horsNomenclatureAdditionalAmount - regcAmount - regoAmount - patientAmount - regcAdditionalAmount;
                        }
                        if (_visitIsFree)
                            patientAmountRemise = patientAmount * (-1);
                        let invoiceObj = {};

                        invoiceObj.invoiceAmountPatient =Math.round((patientAmount+patientAdditionalAmount)*100)/100;
                        invoiceObj.invoicePatientAdditionalAmount = Math.round(patientAdditionalAmount*100)/100;
                        invoiceObj.invoicePatientAmountRemise = Math.round(patientAmountRemise*100)/100;
                        invoiceObj.invoiceRegoAmount = Math.round(regoAmount*100)/100;
                        invoiceObj.invoiceRegcAmount = Math.round((regcAmount+regcAdditionalAmount)*100)/100;
                        invoiceObj.invoiceAdditionalRegcAmount = Math.round(regcAdditionalAmount*100)/100;
                        invoiceObj.InvoiceRegoRate = _tauxRego;
                        invoiceObj.InvoiceRegcRate = _tauxRegc;
                        resolve(invoiceObj);
                    });
            });
    },
    getDataToInitInvoicing: function (_visitId) {
        //Creating a promise
        let dbUtility = global.App.DbUtility;
        return new Promise(
            function (resolve, reject) {

                let mainTableObject={};
                mainTableObject.tableName='VISIT';
                mainTableObject.filters = [{name: 'visitId', value: _visitId}];
                let joinTablesArray=[];
                joinTablesArray.push(
                    {
                        tableName:'DOCTOR',
                        fieldsArray:['userId']
                    });
                dbUtility.joinQuery(mainTableObject,joinTablesArray)
                    .then(_resultArray => {
                        let promiseArray = [];
                        let visitObj = _resultArray[0];

                        let paramsPatient = {};
                        paramsPatient.filters = [{name: 'patientId', value: visitObj.patientId}];
                        promiseArray.push(dbUtility.read(paramsPatient, "PATIENT"));
                        let paramsDocotorCard = {};
                        paramsDocotorCard.filters = [{name: 'userId', value: visitObj['Doctor.userId']},
                            {name: 'siteId', value: visitObj.siteId}];
                        promiseArray.push(dbUtility.read(paramsDocotorCard, "USER_CPS"));
                        //promiseArray.push(dbUtility.read(paramsVisit,'STUDY_VISIT_HAS_ACTE'));
                       // if (visitObj.visitIsAmo)
                            promiseArray.push(dbUtility.read(mainTableObject, "REGO"));
                       // if (visitObj.visitIsAmc)
                            promiseArray.push(dbUtility.read(mainTableObject, "REGC"));
                        Promise.all(promiseArray)
                            .then(_resultArray => {
                                _resultArray.unshift(visitObj);
                                resolve(_resultArray);
                            })
                    });
            });


        //Creating a promise


        // site information
        /* let paramsSite={};
         paramsSite.filters=[{name:'siteId',value:_siteId}];
         let pSite=dbUtility.read(paramsSite,"SITE");
         // site config information
         let pSiteConfig=dbUtility.read(paramsSite,"SITE_CONFIG");*/


    },
    /**
     * get the regc rate using the "formule amc" provided by the 'carte vitale' or the 'attestation amc'
     * @param _regcFormule
     */
    getRegcRate: function (_regcFormule) {
        let regcFormule = _regcFormule.trim();
        let regcFormuleArray = regcFormule.split("$");
        let result = 0;
        switch (regcFormuleArray[0]) {
            case '021' ://rate %TR (taux réel)
                result = regcFormuleArray[3] / 100;
                break;
            case '050' :// rate %TM (Ticket modérateur)
                result = regcFormuleArray[3] / 100 * 0.3;
                break;
            case '052' :
                result = 30;// rate %TM (Ticket modérateur)
                break;
        }
        return result;
    },
    /**
     * check if there is an invoice not cancelled for the visit, if the promise return true=> we can create the invoice
     * @param _visitId
     * @returns {Promise.<TResult>}
     */
    checkForCreatingNewInvoice: function (_visitId) {
        let dbUtility = global.App.DbUtility;
        if (!_visitId)
            throw Error('checkInvoiceByVisit : _vsitId is undefined');
        let invoiceFilters = [
            {name: 'visitId', value: _visitId},
            {name: 'invoiceIsValidated', value: true, compare: 'eq'},//is validated
            {name: 'invoiceIsCancelled', value: false, compare: 'eq'}, // is not cancelled
            {name: 'invoiceHasAvoir', value: false, compare: 'eq'},// is not avoir
            {name: 'invoiceType', value: 3, compare: 'ne'},//is not an F.T
        ];
        let paramsInvoice = {};
        paramsInvoice.filters = invoiceFilters;
        return dbUtility.read(paramsInvoice, 'INVOICE')
            .then(_InvoicesArray => {
                return (!_InvoicesArray.length);// there si an invoice for this visit witch is not cancelled and not has 'un avoir'
            });
    },

    getNumNewFse:function()
    {
        let dbUtility = global.App.DbUtility;

        return dbUtility.updateField("COUNTER",
            {"counterValue": Sequelize.literal('"counterValue" +1')},
            {counterName:'fseNumber'})
            .then(_result=>{
                let paramsCounter = {};
                paramsCounter.filters = [{name: 'counterName', value: 'fseNumber'}];
                return dbUtility.read(paramsCounter, 'COUNTER')
            })
    },
    validateInvoice: function (_visitId, _invoiceObj,_userIdForLog) {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_visitId)
                    throw Error('validateInvoice : _visitId is undefined');
                if (!_invoiceObj)
                    throw Error('validateInvoice : _invoiceObj is undefined');
                // chain all your queries here. make sure you return them.
                let visitBalanceObj = {};
                visitBalanceObj.visitBalanceId = _visitId;
                visitBalanceObj.visitId = _visitId;
                visitBalanceObj.visitBalancePatientAmount = _invoiceObj.invoiceAmountPatient  + _invoiceObj.invoicePatientAmountRemise;// le montant de remise étant négatif
                visitBalanceObj.visitBalanceRegoAmount = _invoiceObj.invoiceRegoAmount;
                visitBalanceObj.visitBalanceRegcAmount = _invoiceObj.invoiceRegcAmount;
                return dbUtility.saveRecord(visitBalanceObj, 'VISIT_BALANCE', t)
                    .then(_invoiceBalance => {
                        let invoiceModel = {};
                        invoiceModel.idName = "invoiceId";
                        invoiceModel.idValue = _invoiceObj.invoiceId;
                        invoiceModel.invoicePatientAmountRemise = _invoiceObj.invoicePatientAmountRemise;
                        invoiceModel.invoiceIsValidated = true;
                        return dbUtility.saveRecord(invoiceModel, "INVOICE", t);
                    })
                    .then(_invoice=>{
                        let userHasLog=new UserHasLogReq();
                        return userHasLog.saveUserHasLog(_userIdForLog,'Invoice',_invoiceObj.invoiceId,'','','Validation facture',_visitId,t);
                    })
                    .then(_invoice => {
                        if (_invoiceObj.invoiceType ===1 || _invoiceObj.invoiceType === 2) { // if FS or FSE
                            let visitModel = {};
                            visitModel.idName = "visitId";
                            visitModel.idValue = _visitId;
                            visitModel.visitInvoiceType = _invoiceObj.invoiceType;
                            return dbUtility.saveRecord(visitModel, "VISIT", t);
                        }
                        else {
                            // TODO if F.T for the moment we return true
                            return Promise.resolve(true);
                        }

                    })

            })
    },
    createInvoice: function (_visitId, _invoiceObj,_invoiceHasFseObj,_userIdForLog) {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_visitId)
                    throw Error('createInvoice : _visitId is undefined');
                if (!_invoiceObj)
                    throw Error('createInvoice : _invoiceObj is undefined');
                // chain all your queries here. make sure you return them.
                return dbUtility.updateField("COUNTER",
                    {"counterValue": Sequelize.literal('"counterValue" +1')},
                    {counterName:'invoiceNumber'},t)
                    .then(_result=>{
                        let paramsCounter = {};
                        paramsCounter.filters = [{name: 'counterName', value: 'invoiceNumber'}];
                    return dbUtility.read(paramsCounter, 'COUNTER')
                    })
                    .then(_InvoicesArray => {
                        let counterModel = {};
                        _invoiceObj.invoiceNumber = _InvoicesArray[0].counterValue + 1;
                        counterModel.idName = "counterName";
                        counterModel.idValue = "invoiceNumber";
                        counterModel.counterValue = _invoiceObj.invoiceNumber;
                        return dbUtility.saveRecord(counterModel, "COUNTER", t);
                    })
                    .then(_counter => {
                        return dbUtility.saveRecord(_invoiceObj, 'INVOICE', t);
                    })
                    .then(_invoice=>{
                        let userHasLog=new UserHasLogReq();
                        return userHasLog.saveUserHasLog(_userIdForLog,'Invoice',_invoiceObj.invoiceId,'','','Creation facture',_visitId,t);
                    })
                    .then(_userLog => {
                        if(_invoiceHasFseObj){
                            _invoiceHasFseObj.invoiceId=_invoiceObj.invoiceId;
                            return dbUtility.saveRecord(_invoiceHasFseObj, 'INVOICE_HAS_FSE', t);
                        }
                             else return "";
                    })
            })
    },
    calculateVisitBalanceAmounts: function (_visitId) {
        if (!_visitId)
            throw Error('calculateVisitBalanceAmounts : _visitId is undefined');


        let dbUtility = global.App.DbUtility;

        let invoiceFilters = [
            {name: 'visitId', value: _visitId},
            {name: 'invoiceIsValidated', value: true, compare: 'eq'},//is validated
            {name: 'invoiceIsCancelled', value: false, compare: 'eq'}, // is not cancelled
            {name: 'invoiceHasAvoir', value: false, compare: 'eq'} // is not avoir
            // {name:'invoiceType',value:3,compare:'ne'},//is not an F.T
        ];

        let mainTable = {};
        mainTable.tableName = "INVOICE";
        mainTable.filters = invoiceFilters;
        let joinTablesAccEntryArray = [
            {
                tableName: "ACCOUNTING_ENTRY",
                required: false
            }
        ];
        let promiseInvoicesAndAccEntry = dbUtility.joinQuery(mainTable, joinTablesAccEntryArray);
        let joinTablesPaymentArray = [
            {
                tableName: "INVOICE_HAS_PAYMENT"
            }
        ];
        let promiseInvoicesAndPayment = dbUtility.joinQuery(mainTable, joinTablesPaymentArray);
        return Promise.all([promiseInvoicesAndAccEntry, promiseInvoicesAndPayment])
            .then(_resultsArray => {
                let invoiceAndAccEntryArray = _resultsArray[0];
                let invoiceAndPaymentsArray = _resultsArray[1];
                return {
                    invoiceAndAccEntryArray: invoiceAndAccEntryArray,
                    invoiceAndPaymentsArray: invoiceAndPaymentsArray
                }

            })
    },
    generateAvoir:function(_invoiceId,_visitId,_invoiceAmount,_isFt,_userIdForLog)
    {
        // todo : check if the invoice didn't has already an 'avoir'
        //
         let dbUtility = global.App.DbUtility;
                 return models.sequelize.transaction(
                     {
                         isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
                     },
                     function (t) {
                         if (!_visitId)
                             throw Error('generateAvoir : _visitId is undefined');
                         if (!_invoiceId)
                             throw Error('generateAvoir : _invoiceId is undefined');
                         if (!_invoiceAmount)
                             throw Error('generateAvoir : _invoiceAmount is undefined');
                         if (!_userIdForLog)
                             throw Error('generateAvoir : _userIdForLog is undefined');
                         // chain all your queries here. make sure you return them.
                         return InvoicingReq.checkIfInvoiceCanBeCancelled(_invoiceId)
                             .then(_resultCheckInvoiceBool=>{
                                 if(_resultCheckInvoiceBool){
                                 let invoiceModel = {};
                                 invoiceModel.idName = "invoiceId";
                                 invoiceModel.idValue = _invoiceId;
                                 invoiceModel.invoiceHasAvoir = true;
                                 return dbUtility.saveRecord(invoiceModel, "INVOICE", t);
                                 }
                                 else return Promise.resolve(false);
                             })
                             .then(_invoice => {

                                 if(_invoice){
                                     let visitBalanceModel = {};
                                     visitBalanceModel.idName = "visitId";
                                     visitBalanceModel.idValue = _visitId;
                                     if(!_isFt){
                                         visitBalanceModel.visitBalancePatientAmount = 0;
                                         visitBalanceModel.visitBalanceRegoAmount = 0;
                                         visitBalanceModel.visitBalanceRegcAmount = 0;
                                     }
                                     else
                                     {
                                         visitBalanceModel.visitBalancePatientFtAmount = 0;
                                         visitBalanceModel.visitBalanceRegoFtAmount = 0;
                                     }
                                     return dbUtility.saveRecord(visitBalanceModel, 'VISIT_BALANCE', t);
                                 }
                                 else return Promise.resolve(false);

                             })
                             .then(_visitBalance => {
                                 if(_visitBalance)
                                 {
                                     let accountingEntryModel = {};
                                     accountingEntryModel.accountingEntryId = uuid.v4();
                                     accountingEntryModel.invoiceId = _invoiceId;
                                     accountingEntryModel.accountingEntryType = 1;// avoir
                                     accountingEntryModel.accountingEntryCancelled = false;
                                     accountingEntryModel.accountingEntryDate = moment(new Date()).format('Y-MM-DD');
                                     accountingEntryModel.accountingEntryAmount = _invoiceAmount;
                                     return dbUtility.saveRecord(accountingEntryModel, 'ACCOUNTING_ENTRY', t);
                                 }
                                 else return Promise.resolve(false);
                             })
                             .then(_accountingEntryResult => {
                                 if(_accountingEntryResult)
                                 {
                                     let visitModel = {};
                                     visitModel.idName = "visitId";
                                     visitModel.idValue = _visitId;
                                     visitModel.visitInvoiceType = 0;
                                     return dbUtility.saveRecord(visitModel, 'VISIT', t);
                                 }
                                 else return Promise.resolve(false);

                             })
                             .then(_result=>{
                                 let userHasLog=new UserHasLogReq();
                                 return userHasLog.saveUserHasLog(_userIdForLog,'Invoice',_invoiceId,'','','Génération avoir',_visitId,t);
                             })
                     })
    },

    getValidatedInvoiceFiltersArray:function()
    {
        let invoiceFilters=[];
        invoiceFilters.push({name: 'invoiceIsValidated', value: true, compare: 'eq'});//is validated
        invoiceFilters.push( {name: 'invoiceIsCancelled', value: false, compare: 'eq'}); // is not cancelled
        invoiceFilters.push( {name: 'invoiceHasAvoir', value: false, compare: 'eq'}); // not has avoir
    return invoiceFilters
    },
    getValidatedInvoiceByVisitId:function(_visitId,_isFt)
    {
        let dbUtility = global.App.DbUtility;
        let invoiceFilters=[];
        invoiceFilters.push({name:'visitId',value: _visitId, compare: 'eq'});
        invoiceFilters.push({name: 'invoiceIsValidated', value: true, compare: 'eq'});//is validated
        invoiceFilters.push( {name: 'invoiceIsCancelled', value: false, compare: 'eq'}); // is not cancelled
        invoiceFilters.push( {name: 'invoiceHasAvoir', value: false, compare: 'eq'}); // not has avoir
        if(_isFt)
            invoiceFilters.push({name: 'invoiceType', value: 3, compare: 'eq'});
        else
            invoiceFilters.push({name: 'invoiceType', value: 3, compare: 'ne'});

        return dbUtility.read({filters:invoiceFilters},"INVOICE");
    },
    checkIfInvoiceCanBeCancelled:function(_invoiceId)
    {
        return new Promise((_resolve,_reject)=>{
            let dbUtility = global.App.DbUtility;
            let invoiceFilters=[];
            invoiceFilters.push({name:"invoiceId",value:_invoiceId});
            dbUtility.read({filters:invoiceFilters},"INVOICE")
                .then(_invoiceResultArray=>{
                    let invoiceObj=_invoiceResultArray[0];
                   if(invoiceObj.invoiceIsValidated && !invoiceObj.invoiceIsCancelled && !invoiceObj.invoiceHasAvoir && !invoiceObj.invoiceExportDate)
                   {
                        _resolve(true);
                   }
                   else _resolve(false);
                });
        });
    },
    cancelInvoice:function(_invoiceId,_visitId,_isFt,_userIdForLog)
    {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_visitId)
                    throw Error('cancelInvoice : _visitId is undefined');
                if (!_invoiceId)
                    throw Error('cancelInvoice : _invoiceId is undefined');
                // chain all your queries here. make sure you return them.
                return InvoicingReq.checkIfInvoiceCanBeCancelled(_invoiceId)
                    .then(_resultCheckInvoiceBool=>{
                        if(_resultCheckInvoiceBool) // we can cancel the invoice
                        {
                            let invoiceModel={};
                            invoiceModel.idName="invoiceId";
                            invoiceModel.idValue=_invoiceId;
                            invoiceModel.invoiceIsCancelled=true;
                            return dbUtility.saveRecord(invoiceModel,"INVOICE",t)
                        }
                        else // we cannot cancel the invoice
                            return Promise.resolve(false);

                    })
                    .then(_invoice => {
                        if(_invoice)
                        {
                            let visitBalanceModel = {};
                            visitBalanceModel.idName = "visitId";
                            visitBalanceModel.idValue = _visitId;
                            if(!_isFt){
                                visitBalanceModel.visitBalancePatientAmount = 0;
                                visitBalanceModel.visitBalanceRegoAmount = 0;
                                visitBalanceModel.visitBalanceRegcAmount = 0;
                            }
                            else
                            {
                                visitBalanceModel.visitBalancePatientFtAmount = 0;
                                visitBalanceModel.visitBalanceRegoFtAmount = 0;
                            }
                            return dbUtility.saveRecord(visitBalanceModel, 'VISIT_BALANCE', t);
                        }
                        else return Promise.resolve(false);

                    })
                    .then(_visitBalanceResult=>{
                        if (!_isFt) { // if FS or FSE
                            let visitModel = {};
                            visitModel.idName = "visitId";
                            visitModel.idValue = _visitId;
                            visitModel.visitInvoiceType = 0;
                            return dbUtility.saveRecord(visitModel, "VISIT", t);
                        }
                        else
                        // TODO if F.T for the moment we return true
                            return Promise.resolve(true);
                    })
                    .then(_result=>{
                        let userHasLog=new UserHasLogReq();
                        return userHasLog.saveUserHasLog(_userIdForLog,'Invoice',_invoiceId,'','','Annulation Facture',_visitId,t);
                    })
            });
    },
    /**
     *
     * @param _visitId
     * @param _invoiceId
     * @param _partPerte possible values : 4- perte sur part patient,5 perte sur part AMO,6 perte sur part AMC,
     * 11 perte FT patient (créance irrécouvrable),12 perte FT Etablissement (créance irrécouvrable), 13 perte AMO (créance irrécouvrable)
     * @param _lossAmount
     * @param _isFt
     * @returns {*}
     */
    generateLoss:function(_visitId,_invoiceId,_partPerte,_lossAmount)
    {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_visitId)
                    throw Error('generateLoss : _visitId is undefined');
                if (!_invoiceId)
                    throw Error('generateLoss : _invoiceId is undefined');
                if (!_partPerte)
                    throw Error('generateLoss : _partPerte is undefined');
                if (!_lossAmount)
                    throw Error('generateLoss : _lossAmount is undefined');

                // chain all your queries here. make sure you return them.

                let updateObj;
                switch (_partPerte)
                {
                    case 4:
                        updateObj={"visitBalancePatientLossAmount": Sequelize.literal('"visitBalancePatientLossAmount"+'+_lossAmount)};
                        break;
                    case 5:
                        updateObj={"visitBalanceRegoLossAmount": Sequelize.literal('"visitBalanceRegoLossAmount"+'+_lossAmount)};
                        break;
                    case 6:
                        updateObj={"visitBalanceRegcLossAmount": Sequelize.literal('"visitBalanceRegcLossAmount"+'+_lossAmount)};
                        break;
                    case 11:
                        updateObj={"visitBalancePatientFtLossAmount": Sequelize.literal('"visitBalancePatientFtLossAmount"+'+_lossAmount)};
                        break;
                    case 12:
                        updateObj={"visitBalanceRegoFtLossAmount": Sequelize.literal('"visitBalanceRegoFtLossAmount"+'+_lossAmount)};
                    break;
                    case 13:
                        updateObj={"visitBalanceEstablishmentFtLossAmount": Sequelize.literal('"visitBalanceEstablishmentFtLossAmount"+'+_lossAmount)};
                        break;
                }
                return dbUtility.updateField("VISIT_BALANCE",
                    updateObj,
                    {visitId:_visitId},t)
                    .then(_visitBalance => {
                        let accountingEntryModel = {};
                        accountingEntryModel.accountingEntryId = uuid.v4();
                        accountingEntryModel.invoiceId = _invoiceId;
                        accountingEntryModel.accountingEntryType = _partPerte;
                        accountingEntryModel.accountingEntryCancelled = false;
                        accountingEntryModel.accountingEntryDate = moment(new Date()).format('Y-MM-DD');
                        accountingEntryModel.accountingEntryAmount = _lossAmount;
                        accountingEntryModel.active = true;
                        return dbUtility.saveRecord(accountingEntryModel, 'ACCOUNTING_ENTRY', t);
                    })
            });
    },


    cancelLoss:function()
    {

    },
    generateTropPerçu:function()
    {

    },
    cancelTropPerçu:function()
    {

    }

};


module.exports = InvoicingReq;
