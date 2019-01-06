var async=require('async');
var favicon = require('serve-favicon');
"use strict";

var DbUtility = {
    getColumns:function(table)
    {
        var db = global.App.database.connection;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var sql = "SELECT *  FROM TABLEDESC " +
                    "WHERE tableName='"+table+"'";
                var result=[];
                var query=db.query(sql, function(err, rows) {
                    if (err) {
                        console.error(query.sql);
                        console.error(err);
                        reject(new Error(err));
                    }else{
                        rows.forEach(function(row)
                        {
                            result.push(row['columnName']);
                        });

                        resolve(result);

                    }
                });


         });
         return promise;
     },
    saveData:function(dataToBeAdded,dataToBeUpdated,dataToBeDeleted,table,idName)
    {
       // console.error(dataToBeUpdated);
        var promiseArray=[];
        if(dataToBeAdded.length>0){
            var p1=DbUtility.insertRecords(dataToBeAdded,table);
            promiseArray.push(p1);
        }
        if(dataToBeUpdated.length>0){
            var p2=DbUtility.updateRecords(dataToBeUpdated,table,idName);
            promiseArray.push(p2);
        }
        if(dataToBeDeleted.length>0){
            var p3=DbUtility.deleteRecordsByIds(dataToBeDeleted,table,idName);
            promiseArray.push(p3);
        }

       // console.error(dataToBeAdded);


        //console.error(dataToBeDeleted);
            var promise=new Promise(
            function(resolve, reject) {

                Promise.all(promiseArray).then(function(values) {
                    resolve(values);

                }, function(reason) {
                    reject(reason);
                    console.error(reason)
                    });

                    }
                );
                return promise;
    },
    read: function(params,table){
        var db = global.App.database.connection;
        var limit=params.limit||"100";
        var fields="*";
        if(params.fields)
            fields=params.fields.join(",");

        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var sql = 'SELECT '+fields+'  FROM ' + table;

                var where="";
                if(params.filters && params.filters.length>0){
                    var compTemp=0;
                    params.filters.forEach(function(filter)
                    {

                        if(compTemp<params.filters.length)
                        {
                            if(!filter.cond)
                                filter.cond="and";
                        }
                        else
                            filter.cond="";

                        if(filter.nolike)
                            where += " "+filter.cond+" "+filter.name  + " = '" + filter.value + "' ";
                        else
                        {
                            if(filter.startBy)
                                where += " "+filter.cond+" "+filter.name  + " like '" + filter.value + "%' ";
                            else{
                                if(isNaN(filter.value))
                                {

                                    where += " "+filter.cond+" "+filter.name  + " = '" + filter.value + "%' ";
                                }

                                else
                                    where += " "+filter.cond+" "+filter.name  + " = " + filter.value;
                            }
                        }

                        compTemp++;
                    });
                        sql +=" WHERE del=0 ";
                    if(where)
                        sql += where;
                }
                sql+=" limit 0,"+limit;

                var query=db.query(sql, function(err, rows) {
                    //console.error(query.sql);
                    if (err) {
                        console.error(query.sql);
                        console.error('Error DBUtility function read : '+err);
                        reject(new Error(err));
                    }else{
                        resolve(rows);
                    }
                });

         });
         return promise;
     },
    joinQuery:function(tablesArray,keysArray,filters,fieldsArray,leftJoin,limit)
    {
        /*table1='table1';
        tablesArray['table2','table3'];
        keysArray['key1','key2'];*/
        var fields="*";
        if(fieldsArray && fieldsArray.length>0)
            fields=fieldsArray.join(",");

        var joinType="INNER";
        if(leftJoin)
            joinType="LEFT";
        if(!tablesArray || tablesArray.length<=0 )
            throw new Error("Table array cannot be null or empty");

        if(!keysArray || keysArray.length<=0 )
            throw new Error("Key array cannot be null or empty");

        if(keysArray.length+1 != tablesArray.length )
            throw new Error(" keysArray length-1 != tablesArray length");

        var select='SELECT '+fields+' ';
        var from=' FROM ';

        var i=0;
        tablesArray.forEach(function(table)
        {
            if(i==0)
                from+= table + " AS "+table;
            if(i<tablesArray.length-1)
                from+= " "+joinType+" JOIN "+tablesArray[i+1]+" AS "+tablesArray[i+1]+"  ON ("+tablesArray[i]+"."+keysArray[i]+"="+tablesArray[i+1]+"."+keysArray[i]+") ";

            i++;
        });
var sql=select+from;

var limit=limit|| "200";
        var where="";
        if(filters && filters.length>0){
            var compTemp=0;
            filters.forEach(function(filter)
            {

                if(compTemp<filters.length)
                {
                    if(!filter.cond)
                        filter.cond="and";
                }
                else
                    filter.cond="";

                if(filter.nolike)
                    where += " "+filter.cond+" "+filter.name  + " = '" + filter.value + "' ";
                else
                {
                    if(filter.startBy)
                        where += " "+filter.cond+" "+filter.name  + " like '" + filter.value + "%' ";
                    else{
                        if(isNaN(filter.value))
                        {

                            where += " "+filter.cond+" "+filter.name  + " = '" + filter.value + "%' ";
                        }

                        else
                            where += " "+filter.cond+" "+filter.name  + " = " + filter.value;
                    }
                }

                compTemp++;
            });
            sql +=" WHERE ";
             i=0;
            tablesArray.forEach(function(table)
            {
                i++;
                sql+=table+".del=0 ";
                if(i<tablesArray.length)
                    sql+=" and "
            });
            if(where)
                sql +="  "+ where;
        }
        sql+=" limit 0,"+limit;

        var db = global.App.database.connection;

        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtility.query(sql,where)
                    .then(function(rows)
                    {
                        resolve(rows);
                    }
                    )
                    .catch(
                        // Log the rejection reason
                        function(_err) {
                            reject(new Error(_err));
                        });
            });
        return promise;
    },
    query: function(sql,where){

        var db = global.App.database.connection;
        var sql = sql;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {


               var query= db.query(sql, function(err, rows) {
                    if (err) {
                        console.error(query.sql);
                        console.error('Error DBUtility function query : '+err);
                        reject(new Error(err));
                    }else{
                       resolve(rows);
                    }
                });
             });
         return promise;


    },

    getById:function(table,idName,idValue,callback)
    {
        var db = global.App.database.connection;
        var sql = "SELECT *  FROM " + table+ "WHERE " +db.escape(idName)+"="+db.escape(idValue);
        var query=db.query(sql, function(err, rows, fields) {
            if (err) {
                console.log(err);
                db.debug(err, function(message)
                {
                    callback(false,null,message.message.text);
                });
            }else{
                callback(true,rows[0],'');
            }
        });

    },
    insertRecords:function(records,table)
    {
        var db = global.App.database.connection;

        var fieldsArray=[];
        var valuesArray=[];
        var valueArray=[];
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtility.getColumns(table)
                    .then(function(columnsArray)
                    {
                        records.forEach(
                            function(record)
                            {
                                valueArray=[];
                                for (var key in record) {
                                   // console.error(record);
                                    if(columnsArray.indexOf(key)<0){
                                        delete record[key];
                                    }
                                    else
                                    {
                                        valueArray.push(record[key]);

                                        if(fieldsArray.indexOf(key)<0)
                                            fieldsArray.push(key);
                                    }
                                }
                                valuesArray.push(valueArray);
                            });


                      //  console.error(fieldsArray);
var insertFields=db.escape(fieldsArray);
insertFields=insertFields.replace(/'/g,"");

                        var query=db.query('INSERT INTO ' + table + ' ('+insertFields+') ' +
                            'values ?', [valuesArray], function(err, result) {
                           
                            if (err) {
                                console.error(query.sql);
                                console.error('Error DBUtility function insertRecord : '+err);
                                reject(new Error(err));
                            }
                            else{
                                resolve(result.insertId);
                            }

                        });



                    });
            });
        return promise;
    },
    insertRecord: function(record,table){
        var db = global.App.database.connection;

        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtility.getColumns(table)
                    .then(function(columnsArray)
                    {
                        for (var key in record) {
                            if(columnsArray.indexOf(key)<0)
                                delete record[key];
                          //  console.log(key);
                        }

                        //console.log('fadi');
                        //console.log(record);
                            var query=db.query('INSERT INTO ' + table + ' SET ?', record, function(err, result) {
                                //console.error(query.sql);
                            if (err) {
                                console.error(query.sql);
                                console.error('Error DBUtility function insertRecord : '+err);
                                reject(new Error(err));
                            }
                            else{
                                resolve(result.insertId);
                            }

                        });



                    });
             });
         return promise;
    },
    updateRecord: function(params,table,idName,idValue){
        var db = global.App.database.connection;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtility.getColumns(table)
                    .then(function(columnsArray)
                    {
                        for (var key in params) {
                            if(columnsArray.indexOf(key)<0)
                                delete params[key];
                        }

                        var query=db.query('UPDATE ' + table + ' SET ? where '+idName+' = ' + idValue, params,
                            function(err, result) {

                            if (err) {
                                console.error(query.sql);
                                console.error('Error DBUtility function updateRecord : '+err);
                                reject(new Error(err));
                            }
                            else{
                                resolve(idValue);
                            }

                        });



                    })
                    .catch(
                        // Log the rejection reason
                        function(_err) {
                            reject(new Error(_err));
                        });
            });
        return promise;
    },

    replaceRecord:function(data,table,idToReplaceName,idToReplaceValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtility.deleteRecordById(table,idToReplaceName,idToReplaceValue)
                    .then (
                        function(idToReplaceName)
                        {
                            DbUtility.insertRecord(data,table)
                                .then(function(insertedId)
                                {
                                    resolve(insertedId);
                                });

                        })
                            .catch(
                                function(_err)
                                {
                                    console.error(_err);
                                    reject(new Error(_err));
                                }
                            )
            });


         return promise;



    },
    updateRecords: function(dataToBeUpdated,table,idName){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                async.forEachSeries(dataToBeUpdated, function(record, callback) {
                        DbUtility.updateRecord(record,table,idName,record[idName]).then(
                        function(updatedRecordId){
                            callback(null,updatedRecordId);
                        }
                    )
                        .catch(function(_err)
                        {
                            callback(_err);
                        }
                        )
                }, function(_err) {
                    if (_err) reject(_err);
                        else
                    resolve(true);

                }
                );
            }
        );
        return promise;
    },

    deleteRecordById: function(table,recordIdName,recordIdValue){
        var db = global.App.database.connection;
        //Creating a promise
        var promise=new Promise(
            function(resolve,reject) {

                var query = db.query('UPDATE ' + table + ' set del=1 WHERE '+recordIdName+' = ?', db.escape(recordIdValue),
                    function (_err, _result) {

                        if (_err) {
                            console.error(query.sql);
                            console.error('Error DBUtility function deleteRecordById : ' + _err);
                            reject(new Error(_err));
                        }
                        else {
                           // console.error(query.sql);
                            resolve(recordIdValue);
                        }

                    });
            }
        );

        return promise;

    },
    deleteRecordsByIds: function(recordsToDelete,table,recordIdName){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                    async.forEachSeries(recordsToDelete, function(recordToDelete, callback) {
                        DbUtility.deleteRecordById(table,recordIdName,recordToDelete[recordIdName]).then(
                                function(deletedRecordId){
                                    callback(null,deletedRecordId);
                                }
                                )
                                .catch(function(_err)
                                    {
                                        reject(_err);
                                    }
                                )
                        }, function(_err) {
                            if (_err) reject(_err);
                            else
                                resolve(true);

                        }
                    );

            }
        );

        return promise;

    },

    getAssociatedAndAvailable:function(associationIdValue,associationIdName,associationTable,availablesTable,nameField,availableIdName,parentTable,parentIdName,parentNameField,_availableFieldsArray)
    {
        //Creating a promise

        var promise=new Promise(
            function(resolve, reject) {


                var parentIdValue;
                var params={};
                var p1;
                var promiseArray=[];

                if(parentTable)
                {
                    p1=DbUtility.read(params,parentTable);
                    promiseArray.push(p1);
                }
                else
                    parentIdValue=1;

                var diffArray=[];

                var filters=[{
                    name:associationIdName,value:associationIdValue
                }];

                var exist=false;
                var p2=DbUtility.joinQuery([associationTable,availablesTable],[availableIdName],filters);
                promiseArray.push(p2);

                var p3=DbUtility.read({},availablesTable);
                promiseArray.push(p3);

                Promise.all(promiseArray).then(function(values) {

                    var parentNodes;
                    var associatedRows;
                    var availableRows;
                    if(parentTable) {
                         parentNodes=values[0];
                         associatedRows=values[1];
                         availableRows=values[2];
                    }
                    else
                    {
                         associatedRows=values[0];
                         availableRows=values[1];
                    }


                    availableRows.forEach(function(availableRow){
                        exist=false;
                        availableRow.name=availableRow[nameField];
                        availableRow.id=availableIdName+"_"+availableRow[availableIdName];
                        if(parentNodes) // we need the parents nodes
                        {

                            parentNodes.forEach(function(item)
                            {
                                if(item[parentIdName]===availableRow[parentIdName])
                                    availableRow.parentId=item[parentIdName];

                            });

                        }
                        else
                            availableRow.parentId=parentIdValue; // we don't need to display parent nodes

                        availableRow.leaf=true;
                        availableRow[associationIdName]=associationIdValue;
                        associatedRows.forEach(function(associatedRow){

                            associatedRow.parentId=parentIdValue;
                            associatedRow.leaf=true;
                            associatedRow.id=availableIdName+"_"+associatedRow[availableIdName];
                            associatedRow[associationIdName]=associationIdValue;
                            if(availableRow[availableIdName]==associatedRow[availableIdName])
                            {
                                exist=true;
                                associatedRow.name=availableRow[nameField];
                            }


                        });
                        if(!exist)
                            diffArray.push(availableRow);
                    });

                    // retrieveing  the parent nodes for associated rows

                    if(parentNodes) // we need the parents nodes
                    {
                        associatedRows.forEach(function (associatedRow) {

                            parentNodes.forEach(function(item)
                            {
                                if(item[parentIdName]===associatedRow[parentIdName])
                                    associatedRow.parentId=item[parentIdName];
                            });


                        });

                        parentNodes.forEach(function(item)
                        {
                            item.id=item[parentIdName];
                            item.leaf=false;
                            item.children=[];
                            item.name=item[parentNameField];
                        });
                    }




                    /*  console.log('debug');
                     console.log(diffArray);
                     console.log(associatedRows);*/
                    var dataResult={};
                    dataResult.available=diffArray;
                    dataResult.associated=associatedRows;
                    dataResult.parentNodes=parentNodes||[];
                    resolve(dataResult);

                }, function(_err) {
                    console.error("getAssociatedAndAvailable : ");
                    console.error(_err);
                    reject(new Error(_err));
                });

            }
        );
         return promise;
    }
};
module.exports = DbUtility;
