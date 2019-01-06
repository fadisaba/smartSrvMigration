class Evn{
    constructor(){
        this.eventTypeCode ='';
        this.recordedDateTime ='';
        this.dateTimePlannedEvent  ='';
        this.eventReasonCode  ='';
        this.operatorId  ='';
        this.eventOccurred  ='';
    }
     getEvnSegment() {
         return  'EVN|'+this.eventTypeCode+'|'+this.recordedDateTime+'|'+this.dateTimePlannedEvent+'|'+this.eventReasonCode+'|'+this.operatorId+'|'+this.eventOccurred;
    }
}
module.exports=Evn;