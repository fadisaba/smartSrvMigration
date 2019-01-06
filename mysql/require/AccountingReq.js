let moment = require('../node_modules/moment');
let AccountingReq = {

    displayJournal:function(_filters,_journalType){

        let dbUtility=global.App.DbUtility;

        if (!_filters.startDate)
            throw Error('displayJournal : startDate is undefined');
        if (!_filters.endDate)
            throw Error('displayJournal : endDate is undefined');

        if (!_journalType)
            throw Error('displayJournal : journalType is undefined');

        switch (_journalType)
        {
            case 1: // journal de ventes
                break;
            case 2: // journal de banque
                break;
            case 3: // journal de caisse
                break;
            case 4: // journal de opérations diverses
                break;

        }
        let startIsoDate=_filters.startDate;
        let endIsoDate=_filters.endDate;

        let startDate = moment(startIsoDate).format('Y-MM-DD');
        let endDate = moment(endIsoDate).format('Y-MM-DD');


        let promiseArray=[];

        // get invoices
        let invoiceFilters=[];
        invoiceFilters.push({name:'invoiceDate',value1:startDate,value2:endDate,compare:'between'});
        invoiceFilters.push({name: 'invoiceIsValidated', value: true, compare: 'eq'});//is validated
        invoiceFilters.push( {name: 'invoiceIsCancelled', value: false, compare: 'eq'}); // is not cancelled
        // todo manage other search filters
        if(_journalType===1) // journal des ventes
            promiseArray.push(dbUtility.read({
                filters:invoiceFilters,
                limit:'no'
            },'INVOICE'));

        // get  "accounting entries"
        let mainTableObject={tableName:'ACCOUNTING_ENTRY',filters:[{name:'accountingEntryDate',value1:startDate,value2:endDate,compare:'between'}]};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'INVOICE'});

        if(_journalType===1) // journal des ventes
            promiseArray.push(dbUtility.joinQuery(mainTableObject,joinTablesArray,'no'));




        //TODO  get payments for banck jounal (check,transfer,credit card)

        //TODO  get payments for caisse jounal (cashbox)


        return Promise.all(promiseArray);
    },

};
module.exports = AccountingReq;