var models = require("../models");
let uuid = require('node-uuid');
var Rego = {
    /**
     * This function is used for saving patient AMO
     * @param _params
     * @param _callback
     * @returns {Promise.<TResult>}
     */
    saveRego:function(_params,_callback)
    {
        let regoObject=_params.regoObject;

        return models.sequelize.transaction(
            {
                isolationLevel: models.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            },
            function (t) {
            if(!_params.regoObject)
                throw Error('saveRego : regoObject is undefined');

            // chain all your queries here. make sure you return them.
           return global.App.DbUtility.saveRecord(regoObject,'REGO',t)
               .then(
                   function(_rego)
               {
                   let worklistModel={};
                   worklistModel.idName="worklistId";
                   worklistModel.idValue=regoObject.visitId;
                   worklistModel.worklistPriseEnCharge="";
                   if(regoObject.regoAld)
                       worklistModel.worklistPriseEnCharge=", ALD";
                   if(regoObject.regoCmu)
                       worklistModel.worklistPriseEnCharge=", CMU-C";
                   if(regoObject.regoAutrePec)
                       worklistModel.worklistPriseEnCharge=", Autre exonérations";
                   if(regoObject.regoAme)
                       worklistModel.worklistPriseEnCharge=", AME-B";
                   if(regoObject.regoAmeComp)
                       worklistModel.worklistPriseEnCharge=", AME-C";
                   if(regoObject.regoInvalidite)
                       worklistModel.worklistPriseEnCharge=", Invalidité";
                   if(regoObject.regoDepistage)
                       worklistModel.worklistPriseEnCharge=", Dépistage";
                   if(regoObject.regoAccDroitCommun)
                       worklistModel.worklistPriseEnCharge=", Accident droit commun";
                   if(regoObject.regoMaternite)
                       worklistModel.worklistPriseEnCharge=", Maternité";
                   if(regoObject.regoSmg)
                       worklistModel.worklistPriseEnCharge=", SMG";
                   if(regoObject.regoRegimeAlsace)
                       worklistModel.worklistPriseEnCharge=", Alsace Moselle";
                   if(regoObject.regoAt)
                       worklistModel.worklistPriseEnCharge=", AT";

                   return global.App.DbUtility.saveRecord(worklistModel,"worklist",t)
               })

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            // mise à jour du rego du patient

            global.App.DbUtility.read(
                {
                    filters: [{name: 'patientId', value: regoObject.patientId}, {name: 'visitId', value: null}],
                    fieldsArray: ['regoId'],
                    limit: 1
                },'REGO')
                .then(_resultArray=>
                {
                    let regoId;
                    if(_resultArray.length)
                    {
                         regoId=_resultArray[0].regoId;
                    }
                    else
                    {

                        regoId=uuid.v4();
                    }
                    regoObject.regoId=regoId;
                        regoObject.visitId=null;

                        global.App.DbUtility.saveRecord(regoObject,'REGO')
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
    }
    };
module.exports = Rego;
