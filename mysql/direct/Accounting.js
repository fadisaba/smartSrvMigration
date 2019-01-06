let invoiceTackingReq=require("../require/InvoiceTranckingReq");
let accountingReq=require("../require/AccountingReq");

let Accounting={


    getDataForInvoiceTracking:function(params,callback) {
       /* if (!params.startDate)
            throw Error('getDataForInvoiceTracking : startDate is undefined');

        if (!params.endDate)
            throw Error('getDataForInvoiceTracking : endDate is undefined');*/

        invoiceTackingReq.getDataForInvoiceTracking(params)
            .then(_resultsArray=>{
                let result=[];
                _resultsArray.forEach(_resultArray=>{
                   _resultArray.forEach(_resultObj=>{
                       result.push(_resultObj);
                   })
                });
                callback(null, {
                    data: result,
                    success: true,
                    msg: ''

                });
            }).catch(_err=> {
            console.error(_err);
            callback(null, {
                data: "",
                success: false,
                msg: _err.message
            });
        });
    },
    displayJournal:function(params,callback) {
        if (!params.startDate)
            throw Error('getDataForInvoiceTracking : startDate is undefined');

        if (!params.endDate)
            throw Error('getDataForInvoiceTracking : endDate is undefined');

        if (!params.journalType)
            throw Error('getDataForInvoiceTracking : journalType is undefined');

        accountingReq.displayJournal(params,params.journalType)
            .then(_resultArray=>{
                let resultObj={};
                switch (params.journalType)
                {
                    case 1: // journal de ventes
                    resultObj.invoicesArray=_resultArray[0];
                    resultObj.accountingEntriesArray=_resultArray[1];
                    break;
                    case 2: // journal de banques
                    case 3: // journal de caisses
                        resultObj.paymentsArray=_resultArray[0];
                        break;
                }
                callback(null, {
                    data: resultObj,
                    success: true,
                    msg: ''

                });
            }).catch(_err=> {
            console.error(_err);
            callback(null, {
                data: "",
                success: false,
                msg: _err.message
            });
        });
    }

};
module.exports=Accounting;
