'use strict';
let commonFunctions=require("../../common/CommonFunctions");
let SiteReq=require('../../require/SiteReq');
 var Site = {
	getSiteAndConfig: function(params,callback){
		        var mainTableObject={};
		        mainTableObject.tableName='SITE';
		        var joinTablesArray=[];
		        joinTablesArray.push({tableName:'SITE_GROUP'},{tableName:'CITY',required:false});

		var p1=global.App.DbUtility.joinQuery(mainTableObject,joinTablesArray);
		var p2=global.App.DbUtility.read('', 'SITE_CONFIG');

		Promise.all([p1,p2]).then(function(values) {
			//console.error(values);
			callback(null, {
				data: values,
				success:true,
				msg:''

			});
		}, function(reason) {
			console.error(error);
			callback(null, {
				data: [],
				success:false,
				msg:'Error'

			});
		});
	},
     saveSiteAndSiteConfig: function (params, callback) {
         try {
             let siteReq=new SiteReq();
             let promise = siteReq.saveSiteAndSiteConfig(params.sitesArray, params.sitesConfigArray);
             commonFunctions.executePromiseThenCallback(promise, callback);
         }
         catch (_err) {
             commonFunctions.catchWidthCallback(_err, callback);
         }
     }
};

module.exports = Site;
