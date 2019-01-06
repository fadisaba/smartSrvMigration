'use strict';
let models  = require('../models');
let GridFilterReq = {
	 /**
	  * convert the filters array received from sencha to filtersArray to use in read and queryJoin functions
	  * @param _filtersArray [{ operator: 'like', value: 'fsdfdsfs', property: 'LName' }]
	  * @returns {*}
      */
	 convertToFiltersArray:function(_filtersArray)
	 {
		 let resultArray=[];
		 _filtersArray.forEach(_filter=>
		 {
			/* if(_filter.property in models[model].attributes)
			 {*/
				 resultArray.push({name:_filter.property,value:_filter.value});
			/* }*/
		 });
		 return resultArray;
	 },
	 filterMainTableWithCityTable:function(_mainTable,_filters,_fieldsArray,_limit)
	 {
		 //Creating a promise
		 return new Promise(
		     function(resolve, reject) {
                 let dbUtility = global.App.DbUtility;
                 let filtersArray=GridFilterReq.convertToFiltersArray(_filters);
                 let mainFiltersArray=[];
                 let cityFiltersArray=[];
                 let mainFieldsArray=[];
                 let cityFiledsArray=[];
				 filtersArray.forEach(_filter=>
				 {
					 if(_filter.name=="cityName")
						 cityFiltersArray.push(_filter);
					 else
						 mainFiltersArray.push(_filter);
				 });
                 _fieldsArray.forEach(_field=>
                 {
                     if(_field=="cityName")
                         cityFiledsArray.push(_field);
                     else
                         mainFieldsArray.push(_field);
                 });
                 let mainTableObj={
                     tableName:_mainTable,

                     filters:mainFiltersArray
                    };
                 /*if(mainFieldsArray.length)
                     mainTableObj.fieldsArray=mainFieldsArray;*/

                 let joinTalesArray=[{
                     tableName:'CITY',
                     filters:cityFiltersArray
                 }];
                 if(cityFiledsArray.length)
                     joinTalesArray.fieldsArray=cityFiledsArray;

                  dbUtility.joinQuery(mainTableObj,joinTalesArray,_limit,true)

                     .then(_result=>
                     {
                         _result.forEach(_item=>
                         {
                             _item.cityName=_item['City.cityName'] ;
                         });
                         resolve(_result);
                     });
		      });

	 },
    /**
	 * this function is called when the grid concerne just one table
     * @param _mainTable
     * @param _filters //filter: [ { operator: 'like', value: 'fsdfdsfs', property: 'LName' } ]
     * @param _fieldsArray
     * @param _limit
     * @returns {Promise}
     */
    filterMainTable:function(_mainTable,_filters,_fieldsArray,_limit)
    {
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                let dbUtility = global.App.DbUtility;
                let filtersArray=GridFilterReq.convertToFiltersArray(_filters);
                let mainFiltersArray=[];
                let mainFieldsArray=[];
                filtersArray.forEach(_filter=>
                {
                        mainFiltersArray.push(_filter);
                });
                _fieldsArray.forEach(_field=>
                {
                        mainFieldsArray.push(_field);
                });
                let mainTableObj={
                    filters:mainFiltersArray,
					limit:_limit
                };
                dbUtility.read(mainTableObj,_mainTable)
                    .then(_result=>
                    {
                        resolve(_result);
                    });
            });

    }
};
module.exports = GridFilterReq;
