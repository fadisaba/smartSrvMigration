var DbUtility = require('./DbUtility');
//var db = global.App.database.connection;
var Site = {
	getSiteAndGroup: function(params, callback){

		var sql='select ST.* ,SG.siteGroupName ' +
			'from SITE AS ST, SITE_GROUP AS SG ' +
			'where ST.siteGroupId=SG.siteGroupId';
		global.App.DbUtility.query(sql,'')
			.then(function(rows){
				//console.log(rows);
			callback(null, {
				data: rows,
				success:true,
				msg:''

			});
		})
			.fail(function(error)
			{

				console.log(error);
				callback(null, {
					data: [],
					success:false,
					msg:'Error'

				});
			})
			.done();


	},

/*read: function(params, callback){

       DbUtility.read(params,function(success,rows,message){
		 callback(null, {
			 data: rows,
			 success:success,
			 msg:message

                });
	   });
		
			
		},*/
	/*createRecord: function(params, callback){

		DbUtility.createRecord(params,'SITE',function(success,params,message){
			callback(null, {
				data: params,
				success:success,
				msg:message

			});
		});


	}*/

	createRecord: function(params, callback){

		DbUtility.insertRecord(params,'SITE')
			.then(function(insertId){
			callback(null, {
				data: insertId,
				success:true,
				msg:''

			});
		})
			.fail(function(error)
			{
				console.log(error);
				callback(null, {
					data: [],
					success:false,
					msg:'Error'

				});
			})
			.done();


	}
};

module.exports = Site;
