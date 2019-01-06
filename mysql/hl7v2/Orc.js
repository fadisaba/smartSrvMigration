class Orc{
    constructor(_orderControl,_placerOrderNumber,_visitPacsId,_orderStatus){
        this.orderControl = 'NW';
        this.placerOrderNumber = _placerOrderNumber;
        this.fillerOrderNumber = _placerOrderNumber;
        this.placerGroupNumber = '';
        this.orderStatus = _orderStatus||'';
        this.responseFlag = '';
        this.quantityTiming = '';
        this.parent1 = _visitPacsId;
        this.dateTimeofTransaction = '';
        this.enteredBy = '';
        this.verifiedBy = '';
        this.orderingProvider = '';
        this.enterersLocation = '';
        this.callBackPhoneNumber = '';
        this.orderEffectiveDateTime = '';
        this.orderControlCodeReason = '';
        this.enteringOrganization = '';
        this.enteringDevice = '';
        this.actionBy = '';
        this.advancedBeneficiaryNoticeCode = '';
        this.orderingFacilityName = '';
        this.orderingFacilityAddress = '';
        this.orderingFacilityPhoneNumber = '';
        this.orderingProviderAddress = '';
    }
    getOrcSegment() {
        return "ORC|"+this.orderControl+'|'+this.placerOrderNumber+'|'+this.fillerOrderNumber+'|'+this.placerGroupNumber+'|'+this.orderStatus+'|'+this.responseFlag+'|'+this.quantityTiming+'|'+this.parent1+'|'+this.dateTimeofTransaction+'|'+this.enteredBy+'|'+this.verifiedBy+'|'+this.orderingProvider+'|'+this.enterersLocation+'|'+this.callBackPhoneNumber+'|'+this.orderEffectiveDateTime+'|'+this.orderControlCodeReason+'|'+this.enteringOrganization+'|'+this.enteringDevice+'|'+this.actionBy+'|'+this.advancedBeneficiaryNoticeCode+'|'+this.orderingFacilityName+'|'+this.orderingFacilityAddress+'|'+this.orderingFacilityPhoneNumber+'|'+this.orderingProviderAddress;
    }
}
module.exports=Orc;