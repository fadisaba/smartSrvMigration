let dbUtilitySir5=require('../common/DbUtilitySir5');
let CommonQueriesSir5 = {
	read: function (params, callback) {
		dbUtilitySir5.read(params, params.table,params.database)
			.then(function (rows) {
				// on regarde s'il y a des blob (Buffer) on les converti en string
				for (let i=0;i<=rows.length;i++)
				{
					for (let prop in rows[i]) {
						let testBuff= rows[i][prop];
						if(testBuff instanceof Buffer)
						{
							rows[i][prop]=rows[i][prop].toString('utf8');
						}
					}
				}
				callback(null, {
					data: rows,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {

				console.error("Error CommonQueries.js => Function read : " + error);
				callback(null, {
					data: [],
					success: false,
					msg: 'Error'

				});
			})
	},
	deleteRecordById:function(params,callback)
	{
		dbUtilitySir5.deleteRecordById(params.table, params.recordIdName,params.recordIdValue)
			.then(function (deletedId) {
				callback(null, {
					data: deletedId,
					success: true,
					msg: ''
				});
			})
			.catch(function (error) {

				console.error("Error CommonQueries.js => Function deleteRecordById : " + error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})
	},
	deleteThenInsert: function (params, callback) {
		//console.error(params);
		dbUtilitySir5.replaceRecord(params.dataToBeSaved, params.table,params.idName,params.idValue)
			.then(function (insertedId) {
				callback(null, {
					data: insertedId,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {

				console.error("Error CommonQueries.js => Function deleteThenInsert : " + error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})
	},
	readJoin: function (params, callback) {
		//console.error(params)

		var mainTableObject=params.mainTableObject;
		var joinTablesArray=params.joinTablesArray;
        var limit=params.limit||null;
		dbUtilitySir5.joinQuery(mainTableObject,joinTablesArray,limit)
			.then(function (rows) {
				callback(null, {
					data: rows,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {

				console.error("Error CommonQueries.js => Function readJoin : " + error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})
	},
	saveRecord:function(_params,callback){
		dbUtilitySir5.saveRecord(_params.dataToBeSaved,_params.table)
			.then(function (_record) {
				callback(null, {
					data: _record,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {
				console.log(error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})
	},
	createRecord: function (params, callback) {
		//console.log(params);
		dbUtilitySir5.insertRecord(params.dataToBeSaved,params.table)
			.then(function (insertId) {
				callback(null, {
					data: insertId,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {
				console.log(error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})
	},
	createRecords: function (params, callback) {

		//console.log(params);
		dbUtilitySir5.insertRecords(params.dataToBeSaved,params.table)
			.then(function (insertId) {
				callback(null, {
					data: insertId,
					success: true,
					msg: ''

				});
			})
			.catch(function (error) {
				console.log(error);
				callback(null, {
					data: [],
					success: false,
					msg: error.message

				});
			})


	},
	saveRecords: function (params, callback) {
		let dataToAddArr=[];
        let dataToUpdateArr=[];
        let dataToDeleteArr=[];
        let table=params.table;
        let idName=params.idName;
        let dataToBeSavedArr=params.dataToBeSaved;

		//console.log(dataToBeSavedArr);
		dataToBeSavedArr.forEach(
			function(record){
				if(record.added)
					dataToAddArr.push(record);
				else if(record.modified)
					dataToUpdateArr.push(record);
				else if(record.toDelete)
					dataToDeleteArr.push(record);
			}
		);

		//console.log(params);

		dbUtilitySir5.saveData(dataToAddArr,dataToUpdateArr,dataToDeleteArr,table,idName)
			.then(function (insertId) {
				callback(null, {
					data: "",
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
	getAssociatedAndAvailable:function(params, callback)
	{
		var associationIdValue=params.associationIdValue;
		var associationIdName=params.associationIdName;
		var associationTable=params.associationTable;
		var availablesTable=params.availablesTable;
		var nameField=params.nameField;
		var parentIdValue=params.parentTable;
		var availableIdName=params.availableIdName;
		var parentIdName=params.parentIdName;
		var parentNameField=params.parentNameField;
		//var dataResult={};
		dbUtilitySir5.getAssociatedAndAvailable(associationIdValue,associationIdName,associationTable,availablesTable,nameField,availableIdName,parentIdValue,parentIdName,parentNameField)
			.then(function (dataResult) {
				///console.log(dataResult);
				callback(null, {
					data: dataResult,
					success: true,
					msg: ''

				});
			})
			.catch(function (_err) {
				console.error("getAssociatedAndAvailable");
				console.error(_err);
				callback(null, {
					data: [],
					success: false,
					msg: 'Error : getAssociatedAndAvailable'

				});
			})
	}
};

module.exports = CommonQueriesSir5;