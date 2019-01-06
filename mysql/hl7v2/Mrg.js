class Mrg{
    constructor(_patientPacsIdToReplace,_patientFName,_patientLName){
        this.priorPatientIdentifierList = _patientPacsIdToReplace+'^^^^'+global.App.appConf.sendingApplication;
        this.priorAlternatePatientId = '';
        this.priorPatientAccountNumber = '';
        this.priorPatientId = '';
        this.priorVisitNumber = '';
        this.priorAlternateVisitId = '';
        this.priorPatientName =_patientLName+'^'+_patientFName;
    }
     getMrgSegment() {
         return "MRG|"+this.priorPatientIdentifierList+'|'+this.priorAlternatePatientId+'|'+this.priorPatientAccountNumber+'|'+this.priorPatientId+'|'+this.priorVisitNumber+'|'+this.priorAlternateVisitId+'|'+this.priorPatientName;
    }
}
module.exports=Mrg;