class Msh{
    constructor(_messageType,_dateTime,_sendingFacility){
        this.fieldSeparator = "|";
        this.encodingCharacters = "^~\\&";
        this.sendingApplication = global.App.appConf.sendingApplication;
        this.sendingFacility = _sendingFacility;
        this.receivingApplication = global.App.appConf.receivingApplication;
        this.receivingFacility = global.App.appConf.receivingFacility;
        this.dateTime = _dateTime;
        this.security = "";
        this.messageType = _messageType;
        this.messageControlId =  ((new Date()).getTime()).toString();  // message Id (unique ID)
        this.processingId = "P";
        this.versionId = "2.8";
        this.sequenceNumber = "";
        this.continuationPointer = "";
        this.acceptAcknowledgmentType = "NE";
        this.applicationAcknowledgmentType = "";
        this.countryCode = "";
        this.characterSet = "";
        this.principalLanguageOfMessage = "";
    }
     getMshSegment() {
        return  "MSH" + this.fieldSeparator + this.encodingCharacters + "|" + this.sendingApplication + "|" + this.sendingFacility + "|" + this.receivingApplication + "|" + this.receivingFacility + "|" + this.dateTime + "|" + this.security + "|" + this.messageType + "|" + this.messageControlId + "|" + this.processingId + "|" + this.versionId + "|" + this.sequenceNumber + "|" + this.continuationPointer + "|" + this.acceptAcknowledgmentType + "|" + this.applicationAcknowledgmentType + "|" + this.countryCode + "|" + this.characterSet + "|" + this.principalLanguageOfMessage + "|";

    }
}
module.exports=Msh;