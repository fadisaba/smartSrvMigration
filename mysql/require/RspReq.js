let uuid = require('node-uuid');
class RspReq{
    constructor()
    {

    }
    saveRspFseByRsp(_rspObj,_transac)
    {
       let dbUtility = global.App.DbUtility;
       let dataToAddArray=[];
       let invoiceHasFseToUpdatePromiseArray=[];
       let rspIdentificationArray=[];
       let rspDestinatairesArray=[];
       let rspMandatairesArray=[];
       let totalAmo=0;
       let totalAmc=0;
       if(_rspObj.rspListe){
           let rspListeFseArray=(_rspObj.rspListe).split('+');
           if(_rspObj.rspDestinataire)
               rspDestinatairesArray=(_rspObj.rspDestinataire).split('+');

           if(_rspObj.rspMandataire)
               rspMandatairesArray=(_rspObj.rspMandataire).split('+');

           if(_rspObj.rspIdentification)
               rspIdentificationArray=(_rspObj.rspIdentification).split('+');
           for (let i = 0; i < rspListeFseArray.length; i++) {

               let rspFseObject={};
               rspFseObject.rspFseId=uuid.v4();
               rspFseObject.rspId=_rspObj.rspId;
               rspFseObject.rspFseDateVirement=_rspObj.rspMoneyTransferDate;
               rspFseObject.rspFseIssuer=_rspObj.rspIssuer;
               rspFseObject.rspFseNumeroFse=rspListeFseArray[i].trim();
               rspFseObject.rspFseNumeroFse=(rspFseObject.rspFseNumeroFse).substring(0,9);
               rspFseObject.rspFseNumeroFacturation=_rspObj.rspNumeroFacturation;
               rspFseObject.rspFseNumeroRsp=_rspObj.rspFileName;
               rspFseObject.rspFseRegime=_rspObj.rspRegime;
               if(rspIdentificationArray.length && rspIdentificationArray[i]){
                   let identification=rspIdentificationArray[i].split("/");
                   if(identification.length){
                       if(identification[1])
                           rspFseObject.rspFsePatientLName=identification[1];
                       if(identification[2])
                           rspFseObject.rspFsePatientFName=identification[2];
                   }
               }
               if(rspDestinatairesArray.length && rspDestinatairesArray[i]){
                   rspFseObject.rspFseDestinataire= rspDestinatairesArray[i];
               }
               if(rspMandatairesArray.length && rspMandatairesArray[i]){
                   rspFseObject.rspFseMandataire= rspMandatairesArray[i];
               }
               if(rspListeFseArray[i])
               {
                   if(rspListeFseArray[i].substring(10)[0]==="E")
                   {
                       rspFseObject.rspFseErreur=rspListeFseArray[i];
                   }
                   else{
                       let paymentAmoAmcString=rspListeFseArray[i].substring(10);
                       paymentAmoAmcString.trim();
                       let paymentAmoAmcArray=paymentAmoAmcString.split('-');
                       rspFseObject.rspFseAmoAmount=paymentAmoAmcArray[0]|| 0;

                       rspFseObject.rspFseAmoAmount=Math.round((rspFseObject.rspFseAmoAmount)*100)/100;
                       totalAmo+=rspFseObject.rspFseAmoAmount;
                       rspFseObject.rspFseAmcAmount=paymentAmoAmcArray[1]|| 0;

                       rspFseObject.rspFseAmcAmount=Math.round((rspFseObject.rspFseAmcAmount)*100)/100;
                       totalAmc+=rspFseObject.rspFseAmcAmount;
                   }
               }
               rspFseObject.active=true;
               dataToAddArray.push(rspFseObject);

               let invoiceHasFseObj={};
               invoiceHasFseObj.idName="invoiceHasFseId";
               invoiceHasFseObj.invoiceHasFseDateRetourNoemi=rspFseObject.rspFseDateVirement;
               invoiceHasFseObj.rspId=_rspObj.rspId;
               let invoiceHasFseFiltersArray=[{name:'invoiceHasFseNumber',value:rspFseObject.rspFseNumeroFse,compare:'eq'}];
                invoiceHasFseFiltersArray.push({name:'invoiceHasFseNumeroFacturation',value:rspFseObject.rspFseNumeroFacturation,compare:'eq'});

               if(rspFseObject.rspFseAmoAmount &&rspFseObject.rspFseAmoAmount >0)
                   invoiceHasFseObj.invoiceHasFseAmountNoemiRego=rspFseObject.rspFseAmoAmount;

               if(rspFseObject.rspFseAmcAmount &&rspFseObject.rspFseAmcAmount >0)
                   invoiceHasFseObj.invoiceHasFseAmountNoemiRegc=rspFseObject.rspFseAmcAmount;

               if(rspFseObject.rspFseErreur)
               {
                   invoiceHasFseObj.invoiceHasFseErreurNoemi=rspFseObject.rspFseErreur;
               }

               invoiceHasFseObj.filtersArray=invoiceHasFseFiltersArray;

               invoiceHasFseToUpdatePromiseArray.push(dbUtility.saveRecord(invoiceHasFseObj,"INVOICE_HAS_FSE",_transac));


           }
           return dbUtility.saveData(dataToAddArray,[],[],"RSP_FSE",'rspFseId',_transac)
               .then(_result=>{
                   let invoiceModel={};
                   invoiceModel.idName="rspId";
                   invoiceModel.idValue=_rspObj.rspId;
                   invoiceModel.rspIsExported=true;
                   invoiceModel.rsptotalAmo=totalAmo;
                   invoiceModel.rsptotalAmc=totalAmc;
                   return dbUtility.saveRecord(invoiceModel,"RSP",_transac)
               })
               .then(_result=>{
                   return Promise.all(invoiceHasFseToUpdatePromiseArray);
               })
       }
       else return Promise.resolve([]);
    }
    /** this function is juste juste for one time for fatas and the we have to delete it****/
    calcAmcAndAmoAmountForRsp()
    {
        let dbUtility = global.App.DbUtility;
        let promiseArray=[];
        promiseArray.push(dbUtility.read({limit:'no'},'RSP'));
        promiseArray.push(dbUtility.read({limit:'no'},'RSP_FSE'));
        let rspToUpdatePromiseArray=[];
        return Promise.all(promiseArray)
            .then(function(_resultArray)
            {
                let rspArray=_resultArray[0];
                let rspAndFseArray=_resultArray[1];
                rspArray.forEach(function(_rspObj)
                {
                    let rspAmoAmount=0;
                    let rspAmcAmount=0;
                    rspAndFseArray.forEach(function(_rspFseObj)
                    {
                        if(_rspObj.rspId===_rspFseObj.rspId)
                        {
                            rspAmoAmount+= Math.round((_rspFseObj.rspFseAmoAmount)*100)/100;
                            rspAmcAmount+= Math.round((_rspFseObj.rspFseAmcAmount)*100)/100;
                        }

                    });

                    let dataObj={};
                    dataObj.idName="rspId";
                    dataObj.idValue=_rspObj.rspId;
                    dataObj.rspTotalAmo=Math.round((rspAmoAmount)*100)/100;
                    dataObj.rspTotalAmc=Math.round((rspAmcAmount)*100)/100;
                    promiseArray.push(dbUtility.saveRecord(dataObj,"RSP"));
                });
                return Promise.all(promiseArray);
            })
    }
    /** this function is juste juste for one time for fatas and the we have to delete it****/
    updateRspForInvoiceHasFse()
    {
        let dbUtility = global.App.DbUtility;
        let promiseArray=[];
       return  dbUtility.read({limit:'no'},'RSP_FSE')
            .then(function(_resultArray)
            {
                _resultArray.forEach(function(_respFseObj)
                {

                    let dataObj={};
                    dataObj.idName="invoiceHasFseId";
                    dataObj.rspId=_respFseObj.rspId;

                    let dataObjFiltersArray=[{name:'invoiceHasFseNumber',value:_respFseObj.rspFseNumeroFse,compare:'eq'}];
                    dataObjFiltersArray.push({name:'invoiceHasFseNumeroFacturation',value:_respFseObj.rspFseNumeroFacturation,compare:'eq'});

                    dataObj.filtersArray=dataObjFiltersArray;

                    promiseArray.push(dbUtility.saveRecord(dataObj,"INVOICE_HAS_FSE"));
                });
                return Promise.all(promiseArray);
            })
    }
}
module.exports=RspReq;