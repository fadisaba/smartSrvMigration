let  async=require('async');
let favicon = require('serve-favicon');
let modelsSir5  = require('../modelsMedris');//uncomment for migration
"use strict";

let DbUtilitySir5 = {
    
    saveDataMulti:function(dataToBeSavedArray)
    {
         /* var promise=new Promise(
            function(resolve, reject) {
        var promiseArray=[];
        dataToBeSavedArray.forEach(function(_dataToBeSaved)
        {
          promiseArray.push(DbUtility.saveData(_dataToBeSaved.dataToBeAdded,_dataToBeSaved.dataToBeUpdated,_dataToBeSaved.dataToBeDeleted,dataToBeDeleted.table,dataToBeDeleted.idName));
        }    
        Promise.all(promiseArray)
        .then(function(_result)
        {
            resolve(_result);
        });
        .catch(function(_error)
        {
           reject(_error); 
        });
        );
        });
            return promise;*/
    },
    /**
     *
     * @param _dataToBeSaveArray
     * @returns {{dataToAddArr: Array, dataToUpdateArr: Array, dataToDeleteArr: Array}}
     */
    getToDeleteToAddToModifyData:function(_dataToBeSaveArray)
    {
        let dataToAddArr=[];
        let dataToUpdateArr=[];
        let dataToDeleteArr=[];
        //console.log(dataToBeSavedArr);
        _dataToBeSaveArray.forEach(
            function(record){
                if(record.added)
                    dataToAddArr.push(record);
                else if(record.modified)
                    dataToUpdateArr.push(record);
                else if(record.toDelete)
                    dataToDeleteArr.push(record);
            }
        );
        return {
            dataToAddArr:dataToAddArr,
            dataToUpdateArr:dataToUpdateArr,
            dataToDeleteArr:dataToDeleteArr
        }
    },
    /**
     *
     * @param dataToBeAdded
     * @param dataToBeUpdated
     * @param dataToBeDeleted
     * @param table
     * @param idName
     * @param _transacVar
     * @returns {Promise}
     */
    saveData:function(dataToBeAdded,dataToBeUpdated,dataToBeDeleted,table,idName,_transacVar)
    {
       // console.error(dataToBeUpdated);
         let transacVar=_transacVar||null;
        let promiseArray=[];
        if(dataToBeAdded.length>0){
            let p1=DbUtilitySir5.insertRecords(dataToBeAdded,table,transacVar);
            promiseArray.push(p1);
        }
        if(dataToBeUpdated.length>0){
            let p2=DbUtilitySir5.updateRecords(dataToBeUpdated,table,idName,transacVar);
            promiseArray.push(p2);
        }
        if(dataToBeDeleted.length>0){
            let p3=DbUtilitySir5.deleteRecordsByIds(dataToBeDeleted,table,idName,transacVar);
            promiseArray.push(p3);
        }

            return new Promise(
            function(resolve, reject) {
                Promise.all(promiseArray).then(function(values) {
                    resolve(values);
                }, function(reason) {
                    reject(reason);
                    console.error(reason)
                    });
                    }
                );
    },
    /**
     *
     * @param tableName
     * @returns {string}
     */
    getModelNameFormTableName:function(tableName)
    {
        let res = tableName.toLowerCase();
        res = res.split("_");
        //  console.log(res);
        let model="";
        res.forEach(function(_item)
        {
            model+=_item.charAt(0).toUpperCase() + _item.slice(1);
        });
        return model;
    },
    /**
     *
     * @param _filtersArray
     * @returns {{}}
     */
    getFilters:function(_filtersArray)
    {
        let where={};
        if(_filtersArray && _filtersArray.length>0) {
            _filtersArray.forEach(function (filter) {

                if (filter.compare)
                {
                    switch (filter.compare)
                    {
                        case 'between':
                            where[filter.name]={$between:[filter.value1,filter.value2]};
                            break;
                        case 'gte':
                            where[filter.name]={$gte:filter.value};
                            break;
                        case 'gt':
                            where[filter.name]={$gt:filter.value};
                            break;
                        case 'lt':
                            where[filter.name]={$lt:filter.value};
                            break;
                        case 'lte':
                            where[filter.name]={$lte:filter.value};
                            break;
                        case 'eq':
                            where[filter.name]={$eq:filter.value};
                            break;
                        case 'ne':
                            where[filter.name]={$ne:filter.value};
                            break;
                        case 'ilike':
                            where[filter.name]={$ilike:filter.value};
                            break;
                        case 'notilike':
                            where[filter.name]={$notILike:filter.value};
                            break;
                        case 'startBy':
                            where[filter.name]={$ilike:filter.value+"%"};
                            break;
                        case 'endBy':
                            where[filter.name]={$ilike:"%"+filter.value};
                            break;

                    }

                }
                else if (filter.nolike || filter.name.indexOf("Id")>=0 || filter.name.indexOf("date")>=0 || filter.name.indexOf("Date")>=0 || filter.name.indexOf("Birthday")>=0 || filter.name.indexOf("birthday")>=0)
                    where[filter.name] = filter.value;
                else {
                    if (filter.startBy)
                        where[filter.name]={$ilike:filter.value+"%"};
                    else {
                        if (isNaN(filter.value)) {

                            where[filter.name]={$ilike:filter.value+"%"};
                        }

                        else
                            where[filter.name] = filter.value ;
                    }
                }


            });
        }
        return where;
    },
    /**
     *
     * @param _params
     * @param _table
     * @param _dataBaseName
     * @returns {Promise}
     */
    read: function(_params,_table,_dataBaseName="",_transac){
        //Creating a promise
        let dataBaseName=_dataBaseName||"";
       return new Promise(
            function(resolve) {
                // get the model name form the table name
                let model=DbUtilitySir5.getModelNameFormTableName(_table);
                let where=DbUtilitySir5.getFilters(_params.filters);
                let findAll={};
                findAll.where=where;
                findAll.attributes=_params.fieldsArray;
                if(_params.limit)
                {
                    if(_params['limit']!="no")
                        findAll.limit=_params.limit;
                }
                else
                    findAll.limit=100;

                if(_params.order)
                {
                    findAll.order=_params.order;
                }
                if(_params.offset)
                    findAll.offset=_params.offset;

                if(_transac)
                    findAll.transaction=true;
                findAll.raw=true;
                modelsSir5[model+dataBaseName].findAll(findAll).then(function(results) {
                    resolve(results);
                });
             });


    },
    /**
     * @param _mainTableObject : object main table, format {tableName,filters,fieldsArray}
     * @param _joinTablesArray : Array tables to join, each object in this array has the format {tableName,required,filters,fieldsArray}
     * @param _limit
     * @param _rawData
     * @param _dataBaseName
     * @returns {Promise}
     */
    joinQuery:function(_mainTableObject,_joinTablesArray,_limit,_rawData,_dataBaseName="",_offset)
    {
        try {



        return new Promise(
            function(resolve, reject) {

                if(!_mainTableObject.tableName)
                    throw new Error('joinQuery : mainTableObject.tableName is not defined');
                let findAll={};
               if(_mainTableObject.filters)
                   findAll.where=DbUtilitySir5.getFilters(_mainTableObject.filters);
                if(_mainTableObject.fieldsArray)
                    findAll.attributes=_mainTableObject.fieldsArray;

                let include=[];
                let model=DbUtilitySir5.getModelNameFormTableName(_mainTableObject.tableName);
                _joinTablesArray.forEach(function(_item)
                {
                    let join={};
                    if(!_item.tableName)
                        throw new Error('joinQuery : _item.tableName is not defined');
                    join.model=modelsSir5[DbUtilitySir5.getModelNameFormTableName(_item.tableName)];
                    if(_item.required===false)
                        join.required=_item.required;
                    else
                        join.required=true;
                    if(_item.filters)
                        join.where=DbUtilitySir5.getFilters(_item.filters);
                    if(_item.fieldsArray)
                        join.attributes=_item.fieldsArray;
                    if(_item.joinObject)
                    {
                        let itemJoinObject=_item.joinObject;
                        let joinObject={};
                        joinObject.model=modelsSir5[DbUtilitySir5.getModelNameFormTableName(itemJoinObject.tableName)];
                        if(itemJoinObject.required==false)
                            joinObject.required=itemJoinObject.required;
                        else
                            joinObject.required=true;

                        if(itemJoinObject.fieldsArray)
                            joinObject.attributes=itemJoinObject.fieldsArray;

                        if(itemJoinObject.filters)
                            joinObject.where=DbUtilitySir5.getFilters(itemJoinObject.filters);
                        join.include=[joinObject];
                    }
                   /* if(_item.join)
                    {

                    }*/

                    include.push(join);
                });


                findAll.include=include;
                findAll.raw=_rawData||true;
                if(_limit)
                {
                    if(_limit!="no")
                        findAll.limit=_limit;
                }
                else
                    findAll.limit=100;

                if(_mainTableObject.order)
                {
                    findAll.order=_mainTableObject.order;
                }

                if(_offset)
                    findAll.offset=_offset;
                else
                if(_offset)
                    findAll.offset=0;

                modelsSir5[model+_dataBaseName].findAll(findAll).then(function(results) {
                    resolve(results);
                })
                    .catch(_err=>{
                        console.error(_err);
                    });

            });
        }
        catch (e) {
            console.error(e)
        }
    },
    /**
     *
     * @param _sql
     * @param where
     * @returns {Promise}
     */
    query: function(_sql,where){
        let db = global.App.database.connection;
        let sql = _sql;
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
               let query= db.query(sql, function(err, rows) {
                    if (err) {
                        console.error(query.sql);
                        console.error('Error DBUtility function query : '+err);
                        reject(new Error(err));
                    }else{
                       resolve(rows);
                    }
                });
             });
    },
    insertRecords:function(_records,_table,_transacVar=false,_dataBaseName="")
    {
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                let model=DbUtilitySir5.getModelNameFormTableName(_table);
                let databaseName=_dataBaseName;
                _records.forEach(
                    function(_record)
                    {
                        _record=DbUtilitySir5.cleanRecord(_record,model);
                    }
                );
                if(!_transacVar)
                    modelsSir5[model+databaseName].bulkCreate(_records).then(function() {
                        resolve("true");
                    });
                else {
                    //execute query with transaction
                    modelsSir5[model+databaseName].bulkCreate(_records,{transaction:_transacVar}).then(function() {
                        resolve("true");
                    });
                }
             });
    },
    insertRecord: function(_record,_table){

        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var model=DbUtilitySir5.getModelNameFormTableName(_table);
                _record=DbUtilitySir5.cleanRecord(_record,model);
                modelsSir5[model].create(_record).then(function(_created) {
                    resolve(_created);
                });
            });
        return promise;
    },
    updateRecord: function(_record,_table,_idName,_idValue,_transacVar){

        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var model=DbUtilitySir5.getModelNameFormTableName(_table);

                _record=DbUtilitySir5.cleanRecord(_record,model);
                var where={};
                where[_idName]=_idValue;

                if(!_transacVar)
                {
                    modelsSir5[model].update(_record,{where:where}).then(function() {
                        resolve(_record);
                    });
                }
                else
                {
                    modelsSir5[model].update(_record,{where:where,transaction:_transacVar}).then(function() {
                        resolve(_record);
                    });
                }

            });
        return promise;

    },

    updateField: function(_table,_obj,_where,_transacVar){
        //Creating a promise
        let promise=new Promise(
            function(resolve, reject) {
                let model=DbUtilitySir5.getModelNameFormTableName(_table);
                if(!_transacVar)
                {
                    modelsSir5[model].update(_obj,{where:_where}).then(function() {
                        resolve(_obj);
                    });
                }
                else
                {
                    modelsSir5[model].update(_obj,{where:_where,transaction:_transacVar}).then(function() {
                        resolve(_obj);
                    });
                }
            });
        return promise;
    },
    cleanRecord:function(_record,model)
    {
        for (var key in _record) {

           /* if(_record[key]===false)
                _record[key]=false;
            else if(_record[key]==0)
                _record[key]=0;
            else if(!_record[key])
                _record[key]=null;*/

            if(! key in modelsSir5[model])
                delete _record[key];
            if(_record[key]=='default')
                delete _record[key];
        }
        delete _record['createdAt'];
        delete _record['updatedAt'];
        delete _record['deletedAt'];
        return _record;
    },

    /*
    insert or update if the record already exists in the database
     */
    saveRecord:function(_record,_table,_transacVar)
    {
        //Creating a promise
        var promise=new Promise(
                        function(resolve, reject) {
                            if(!_record)
                            {
                                resolve();
                            }
                            else
                            {
                                var model=DbUtilitySir5.getModelNameFormTableName(_table);

                                if(_record.idName)
                                {
                                    var where={};
                                    where[_record.idName]=_record.idValue;
                                }


                                _record=DbUtilitySir5.cleanRecord(_record,model);
                                //var where={};
                                //  where[_idName]=_idValue;

                                if(!_transacVar)
                                {
                                    if(where)
                                    {
                                        modelsSir5[model].update(_record,{where:where}).then(function() {
                                            resolve(_record);
                                        });
                                    }
                                    else{
                                        modelsSir5[model].upsert(_record).then(function(_created) {
                                            resolve(_created);
                                        });
                                    }
                                }
                                else
                                {
                                    if(where)
                                    {
                                        modelsSir5[model].update(_record, {where: where, transaction: _transacVar}).then(function () {
                                            resolve(_record);
                                        });

                                    }
                                    else
                                    {
                                        modelsSir5[model].upsert(_record,{transaction:_transacVar}).then(function(_created) {
                                            resolve(_created);
                                        });
                                    }

                                }
                            }
             });
         return promise;

    },
    replaceRecord:function(data,table,idToReplaceName,idToReplaceValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                DbUtilitySir5.deleteRecordById(table,idToReplaceName,idToReplaceValue)
                    .then (
                        function(idToReplaceName)
                        {
                            DbUtilitySir5.insertRecord(data,table)
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
    updateRecords: function(dataToBeUpdated,table,idName,_transacVar){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var transacVar=_transacVar||null;
                async.forEachSeries(dataToBeUpdated, function(record, callback) {
                        DbUtilitySir5.updateRecord(record,table,idName,record[idName],transacVar).then(
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

    deleteRecordById: function(_table,_recordIdName,_recordIdValue,_transacVar){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var model=DbUtilitySir5.getModelNameFormTableName(_table);

                var where={};
                where[_recordIdName]=_recordIdValue;

                if(!_transacVar){
                    modelsSir5[model].destroy({where:where}).then(function() {
                        resolve(_recordIdValue);
                    });
                }
                else{
                    modelsSir5[model].destroy({where:where,transaction: _transacVar}).then(function() {
                        resolve(_recordIdValue);
                    });
                }

            });
        return promise;
    },
    deleteRecordsByIds: function(recordsToDelete,table,recordIdName,_transacVar){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var transacVar=_transacVar||null;
                    async.forEachSeries(recordsToDelete, function(recordToDelete, callback) {
                        DbUtilitySir5.deleteRecordById(table,recordIdName,recordToDelete[recordIdName],transacVar).then(
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

    getAssociatedAndAvailable:function(associationIdValue,associationIdName,associationTable,availablesTable,nameField,availableIdName,parentTable,parentIdName,parentNameField)
    {
        //Creating a promise

        return new Promise(
            function(resolve, reject) {

                var availableModel=DbUtilitySir5.getModelNameFormTableName(availablesTable);

                var parentIdValue;
                var params={limit:"no"};
                var p1;
                var promiseArray=[];

                if(parentTable)
                {
                    p1=DbUtilitySir5.read(params,parentTable);
                    promiseArray.push(p1);
                }
                else
                    parentIdValue=1;

                var diffArray=[];

                var filters=[{
                    name:associationIdName,value:associationIdValue
                }];

                var exist=false;
                var mainTableObject={tableName:associationTable,filters:filters};
                var joinTablesArray=[{
                    tableName:availablesTable
                }];

                var p2=DbUtilitySir5.joinQuery(mainTableObject,joinTablesArray,"no");
                promiseArray.push(p2);

                var p3=DbUtilitySir5.read({limit:'no'},availablesTable);
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
                                if(item[parentIdName]===associatedRow[availableModel+"."+parentIdName])
                                {
                                    associatedRow.parentId=item[parentIdName];

                                }


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
                     console.log(diffArray);*/
                    var dataResult={};
                    dataResult.available=diffArray;
                    dataResult.associated=associatedRows;
                    dataResult.parentNodes=parentNodes||[];
                    // delete all text object properties (for example report content) etc....
                    if(dataResult.available.length)
                    {
                        dataResult.available.forEach(_record=>{

                            for (var key in _record) {

                                if(key.indexOf('Content')>=0)
                                    delete _record[key];
                            }

                        })
                    }
                    if(dataResult.associated.length)
                    {
                        dataResult.available.forEach(_record=>{

                            for (var key in _record) {

                                if(key.indexOf('Content')>=0)
                                    delete _record[key];
                            }
                        })
                    }
                    resolve(dataResult);

                }, function(_err) {
                    console.error("getAssociatedAndAvailable : ");
                    console.error(_err);
                    reject(new Error(_err));
                });

            }
        );
    }
};
module.exports = DbUtilitySir5;
