class Obr{
    constructor(_obj){
        this.setIdObr = '1';
        this.placerOrderNumber = _obj.placerOrderNumber;
        this.fillerOrderNumber = _obj.placerOrderNumber;
        this.universalServiceId = _obj.universalServiceId;
        this.priorityObr = '';
        this.requestedDateTime = '';
        this.observationDateTime = '';
        this.observationEndDateTime = '';
        this.collectionVolume = '';
        this.collectorIdentifier = '';
        this.specimenActionCode = '';
        this.dangerCode = '';
        this.relevantClinicalInfo = '';
        this.specimenReceivedDateTime = '';
        this.specimenSource = '';
        this.orderingProvider = '';
        this.orderCallbackPhoneNumber = '';
        this.placerField1 = _obj.placerField1;
        this.placerField2 = '';
        this.fillerField1 = _obj.fillerField1;
        this.fillerField2 = '';
        this.resultsRptStatusChngDateTime = '';
        this.chargetoPractice = '';
        this.diagnosticServSectId = _obj.diagnosticServSectId;
        this.resultStatus = _obj.resultStatus;
        this.parentResult = '';
        this.quantityTiming = _obj.quantityTiming;
        this.resultCopiesTo = '';
        this.parent1 = _obj.parent1;
        this.transportationMode = '';
        this.reasonforStudy = '';
        this.principalResultInterpreter = _obj.principalResultInterpreter;
        this.assistantResultInterpreter = '';
        this.technician = '';
        this.transcriptionist = '';
        this.scheduledDateTime = '';
        this.numberofSampleContainers = '';
        this.transportLogisticsofCollectedSample = '';
        this.collectorsComment = '';
        this.transportArrangementResponsibility = '';
        this.transportArranged = '';
        this.escortRequired = '';
        this.plannedPatientTransportComment = '';
        this.procedureCode = '';
        this.procedureCodeModifier = '';
    }
    getObrSegment() {
        return "OBR|"+this.setIdObr+'|'+this.placerOrderNumber+'|'+this.fillerOrderNumber+'|'+this.universalServiceId+'|'+this.priorityObr+'|'+this.requestedDateTime+'|'+this.observationDateTime+'|'+this.observationEndDateTime+'|'+this.collectionVolume+'|'+this.collectorIdentifier+'|'+this.specimenActionCode+'|'+this.dangerCode+'|'+this.relevantClinicalInfo+'|'+this.specimenReceivedDateTime+'|'+this.specimenSource+'|'+this.orderingProvider+'|'+this.orderCallbackPhoneNumber+'|'+this.placerField1+'|'+this.placerField2+'|'+this.fillerField1+'|'+this.fillerField2+'|'+this.resultsRptStatusChngDateTime+'|'+this.chargetoPractice+'|'+this.diagnosticServSectId+'|'+this.resultStatus+'|'+this.parentResult+'|'+this.quantityTiming+'|'+this.resultCopiesTo+'|'+this.parent1+'|'+this.transportationMode+'|'+this.reasonforStudy+'|'+this.principalResultInterpreter+'|'+this.assistantResultInterpreter+'|'+this.technician+'|'+this.transcriptionist+'|'+this.scheduledDateTime+'|'+this.numberofSampleContainers+'|'+this.transportLogisticsofCollectedSample+'|'+this.collectorsComment+'|'+this.transportArrangementResponsibility+'|'+this.transportArranged+'|'+this.escortRequired+'|'+this.plannedPatientTransportComment+'|'+this.procedureCode+'|'+this.procedureCodeModifier;
    }
}
module.exports=Obr;