var StatefulProvider = {
	saveState: function (records, callback) {
		global.App.DbUtility.deleteRecordById('stateful','statefulUserId',records[0].statefulUserId)
			.then(function(_result)
			{
				global.App.DbUtility.insertRecords(records,'stateful')
					.then (function(res)
					{
						callback(null, {
							data: [],
							success: true,
							msg: ''
						});
					});
			})
			.catch(function (error) {
				console.error("Error StatefulProvider.js => Function saveState : " + error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})



	},
	restorState: function (params, callback) {

		global.App.DbUtility.read(params,'stateful')
			.then (function(res)
			{
				var dataToSend={};
				if(res.length>0)
				{
					res.forEach(function(item)
					{
						dataToSend[item.statefulKey]=item.statefulValue;
					})
				}
				callback(null, {
					data:dataToSend,
					success: true,
					msg: 'Error'

				});
			})
			.catch(function(error)
			{

				callback(null, {
					data:"failed",
					success: false,
					msg: error

				});
			});



	}

};

module.exports = StatefulProvider;
