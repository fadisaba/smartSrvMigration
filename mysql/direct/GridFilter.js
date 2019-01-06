'use strict';
let GridFilterReq  = require('../require/GridFilterReq');
 let GridFilter = {
	 getResultData:function(_params, _callback){
		 //@meta params
		// previous comment is mandatory if we want to use metadata option
		 let params=_params.metadata.params;
         let limit=params.limit||100;
         let filtersArray=_params.filter||[];//filter: [ { operator: 'like', value: 'fsdfdsfs', property: 'LName' } ]
         let tableName=params.tableName;
         let fieldsArray=params.fieldsArray;
         let promise;
		 switch (tableName)
		 {
			 case 'REFERRING_PHYSICIAN':
				 promise=GridFilterReq.filterMainTableWithCityTable(tableName,filtersArray,fieldsArray,limit);
				 break;
			 case 'ESTABLISHMENT':
				 promise=GridFilterReq.filterMainTableWithCityTable(tableName,filtersArray,fieldsArray,limit);
				 break;

			 default:
                 promise=GridFilterReq.filterMainTable(tableName,filtersArray,fieldsArray,limit);
			 	break;
		 }
		 promise.then(function (_rows) {
			 _callback(null, {
				 data: _rows,
				 success: true,
				 msg: ''
			 });
		 }).catch(function (error) {
				 console.error("Error GridFilter.js => Function getResultData : " + error);
				 _callback(null, {
					 data: [],
					 success: false,
					 msg: error.message
				 });
		 })

	 }
};



module.exports = GridFilter;
