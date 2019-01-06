let models = require('../models');
let uuid = require('node-uuid');
let ConcurrentAccessReq = {
    checkConcurrentAccess:function(_tableId,_moduleName,_userId)
    {
        let dbUtility = global.App.DbUtility;
        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
                if (!_tableId)
                    throw Error('checkConcurrentAccess : _tableId is undefined');
                if (!_moduleName)
                    throw Error('checkConcurrentAccess : _moduleName is undefined');
                if (!_userId)
                    throw Error('checkConcurrentAccess : _userId is undefined');

                let filters=[{name:'concurrentAccessTableId',value:_tableId},{name:'concurrentAccessModuleName',value:_moduleName,compare:"eq"}];
                let mainTableObject={tableName:'CONCURRENT_ACCESS',filters:filters};
                let joinTablesArray=[];
                joinTablesArray.push({tableName:'USER'});
               return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
                    .then(_resultConcurrentAccessArray=>{
                        if(_resultConcurrentAccessArray.length)
                            return Promise.resolve(_resultConcurrentAccessArray[0]);// Accès concurrent trouvé, donc on empeche l'utilisateur de faire l'opération
                        else{
                            // aucun accès concurrent trouvé, l'utilisateur peut effectuer l'opération
                            let concurrentAccessModel = {};
                            concurrentAccessModel.concurrentAccessId = uuid.v4();
                            concurrentAccessModel.userId = _userId;
                            concurrentAccessModel.concurrentAccessTableId = _tableId;
                            concurrentAccessModel.concurrentAccessModuleName = _moduleName;
                            concurrentAccessModel.concurrentAccessTime = new Date();
                            concurrentAccessModel.active = true;
                            return dbUtility.saveRecord(concurrentAccessModel, 'CONCURRENT_ACCESS', t)
                                .then(_result=>{
                                    return Promise.resolve(false);
                                })

                        }
                    });
            })
    },
    deleteConcurrentAccess:function(_tableId,_moduleName)
    {
        if (!_tableId)
            throw Error('deleteConcurrentAccess : _tableId is undefined');
        if (!_moduleName)
            throw Error('deleteConcurrentAccess : _moduleName is undefined');
        let dbUtility = global.App.DbUtility;
        return dbUtility.read(
            {
                filters: [{name: 'concurrentAccessTableId', value: _tableId},
                    {name: 'concurrentAccessModuleName', value: _moduleName}],
                fieldsArray: ['concurrentAccessId'],
                limit: 1
            },'CONCURRENT_ACCESS')
            .then(_resultArray=>{
                if(_resultArray.length){
                    return dbUtility.deleteRecordById("CONCURRENT_ACCESS","concurrentAccessId",_resultArray[0].concurrentAccessId);
                }
                else return false;

            })
    },
    updateConcurrentAccessTime:function(_concurrentAccessId)
    {
        if (!_concurrentAccessId)
            throw Error('updateConcurrentAccessTime : _concurrentAccessId is undefined');
        let dbUtility = global.App.DbUtility;
        let concurrentAccessToUpdate = {};
        concurrentAccessToUpdate.idName = "concurrentAccessId";
        concurrentAccessToUpdate.idValue = _concurrentAccessId;
        concurrentAccessToUpdate.concurrentAccessTime = new Date();
        return dbUtility.saveRecord(concurrentAccessToUpdate, "CONCURRENT_ACCESS");

    }
};


module.exports = ConcurrentAccessReq;
