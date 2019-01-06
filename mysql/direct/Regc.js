let models = require("../models");
let uuid = require('node-uuid');
let Regc = {
    /**
     * This function is used for saving patient AMC
     * @param _params
     * @param _callback
     * @returns {Promise.<TResult>}
     */
    saveRegc:function(_params,_callback)
    {
        let regcObject=_params.regcObject;

        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
            if(!_params.regcObject)
                throw Error('saveRegc : regcObject is undefined');

            // chain all your queries here. make sure you return them.
           return global.App.DbUtility.saveRecord(regcObject,'REGC',t)


        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            // mise à jour du regc du patient

            global.App.DbUtility.read(
                {
                    filters: [{name: 'patientId', value: regcObject.patientId}, {name: 'visitId', value: null}],
                    fieldsArray: ['regcId'],
                    limit: 1
                },'REGC')
                .then(_resultArray=>
                {
                    let regcId;
                    if(_resultArray.length)
                    {
                        regcId=_resultArray[0].regcId;
                    }
                    else
                    {

                        regcId=uuid.v4();
                    }
                    regcObject.regcId=regcId;
                    regcObject.visitId=null;

                        global.App.DbUtility.saveRecord(regcObject,'REGC')
                            .then(_result=>
                            {
                                _callback(null, {
                                    data: "",
                                    success: true,
                                    msg: ''
                                });
                            })
                });
        }).catch(function (_err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
            console.error(_err);
            _callback(null, {
					data: [],
					success: false,
					msg: _err.message
				});
        });
    },
    getRegcAndMutuelle:function(_params,_callback)
    {
        let dbUtility=global.App.DbUtility;
        if(!_params.patientId)
            throw Error('getRegcAndMutuelle : patientId is undefined');
        let filtersArray;
        if(!_params.visitId)
            filtersArray=[{name: 'patientId', value: _params.patientId}, {name: 'visitId', value: null}];
        else
            filtersArray=[{name: 'visitId', value: _params.visitId}];
             dbUtility.read({
                    filters: filtersArray,
                    limit: 1
                },'REGC')
            .then(_resultRegcArray=>
            {
                // si un résultat est trouvé pour la visite ou le patient
                let filtersArray=[];

                if(_resultRegcArray.length)
                {
                    let resultObj=_resultRegcArray[0];
                    if(resultObj.regcNumAMC)
                        filtersArray.push({name: 'mutuelleNum', value: resultObj.regcNumAMC});
                    else
                        filtersArray.push({name: 'mutuelleNum', value: resultObj.regcNumMutuelle});

                   dbUtility.read({
                        filters: filtersArray,
                        limit: 1
                    },'MUTUELLE')
                        .then(_resultMutArray=>{
                            if(_resultMutArray.length){
                                resultObj.mutuelleId=_resultMutArray[0].mutuelleId;
                                resultObj.mutuelle={};
                                resultObj.mutuelle.mutuelleName=_resultMutArray[0].mutuelleName;
                                resultObj.mutuelle.mutuelleId=_resultMutArray[0].mutuelleId;
                                resultObj.mutuelle.mutuelleNum=_resultMutArray[0].mutuelleNum;
                                resultObj.mutuelle.mutuelleFormule=_resultMutArray[0].mutuelleFormule;
                                resultObj.mutuelle.mutuelleModeGestion=_resultMutArray[0].mutuelleModeGestion;
                                resultObj.mutuelle.mutuelleIndicTraitUnique=_resultMutArray[0].mutuelleIndicTraitUnique;
                                resultObj.mutuelle.mutuelleIndicTraitSepare=_resultMutArray[0].mutuelleIndicTraitSepare;
                            }
                            _callback(null, {
                                data: resultObj,
                                success: true,
                                msg: ''
                            });

                        })
                }
                else
                {
                    _callback(null, {
                        data: null,
                        success: true,
                        msg: ''
                    });
                }
            })
                .catch(function (_err) {
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                    console.error(_err);
                    _callback(null, {
                        data: [],
                        success: false,
                        msg: _err.message
                    });
                });
    }
    };
module.exports = Regc;
