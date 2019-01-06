let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let CashBoxFlowReq = {

   cancelCashBoxFlowByPaymentId:function(_paymentId,_transaction){

       let dbUtility=global.App.DbUtility;
       let filtersArray=[];
       filtersArray.push({name:'paymentId',value:_paymentId,compare:"eq"});
       filtersArray.push({name:'cashBoxFlowHasCancellation',value:false,compare:"eq"});
       filtersArray.push({name:'cashBoxFlowIsCancelled',value:false,compare:"eq"});
       filtersArray.push({name:'cashBoxFlowType',value:3,compare:"ne"});
       return dbUtility.read({
           filters:filtersArray,
           limit:'no'
       },'CASH_BOX_FLOW')
           .then(_resultArray=>{
               if (!_resultArray.length)
                   throw Error('cancelCashBoxFlowByPaymentId : no CashBoxFlow found for the paymentId: '+_paymentId);

                   let cashBoxFlowObj=_resultArray[0];
                   let cancellationCashFlowObj= Object.assign({}, cashBoxFlowObj);// copie de l'objet cashBoxFlowObj


               let cashBoxFlowToUpdateObj={};
               cashBoxFlowToUpdateObj.idValue=cashBoxFlowObj.cashBoxFlowId;
               cashBoxFlowToUpdateObj.idName="cashBoxFlowId";
               cashBoxFlowToUpdateObj.cashBoxFlowHasCancellation=true;


               cancellationCashFlowObj.cashBoxFlowId=uuid.v4();
               cancellationCashFlowObj.cashBoxFlowType=3;
               cancellationCashFlowObj.cashBoxFlowDate=new Date();
               cancellationCashFlowObj.cashBoxFlowAmount=cashBoxFlowObj.cashBoxFlowAmount*-1;
               cancellationCashFlowObj.cashBoxFlowIsClosed=false;
               cancellationCashFlowObj.cashboxFlowIs=false;

               let actionPromiseArray=[];
               actionPromiseArray.push(dbUtility.saveRecord(cashBoxFlowToUpdateObj, 'CASH_BOX_FLOW', _transaction));
               actionPromiseArray.push(dbUtility.saveRecord(cancellationCashFlowObj, 'CASH_BOX_FLOW', _transaction));

               return Promise.all(actionPromiseArray);
           });
   },

};
module.exports = CashBoxFlowReq;