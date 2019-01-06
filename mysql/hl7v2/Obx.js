class Obx{
    constructor(_setIdObx){
        this.setIdObx = _setIdObx || "1";
        this.valueType = '';
        this.observationIdentifier = '';
        this.observationValue = '';
        this.abnormalFlags = '';
        this.observationResultStatus = '';
    }
    getObxSegment() {
        return 'OBX|'+this.setIdObx+'|'+
            this.valueType+'|'+this.observationIdentifier+'||'+
            this.observationValue+'|||'+this.abnormalFlags+'|||'+
            this.observationResultStatus+'||||||';
    }
}
module.exports=Obx;