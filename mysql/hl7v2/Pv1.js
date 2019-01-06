class Pv1{
    constructor(_attendingDoctor,_referringDoctor,_visitNumber,_patientIsVip,_isPatientHopsitalizied){
        this. setIdPv1 = '1';
        if(_isPatientHopsitalizied)
            this. patientClass = 'I';// inpatient =>hospitalisé
        else
            this. patientClass = 'U';// unknown

        this. assignedPatientLocation = '';
        this. admissionType = '';
        this. preadmitNumber = '';
        this. priorPatientLocation = '';
        this. attendingDoctor = _attendingDoctor;
        this. referringDoctor = _referringDoctor;
        this. consultingDoctor = '';
        this. hospitalService = '';
        this. temporaryLocation = '';
        this. preadmitTestIndicator = '';
        this. readmissionIndicator = '';
        this. admitSource = '';
        this. ambulatoryStatus = '';
        if(_patientIsVip)
            this. vipIndicator = 'I';
        else
            this. vipIndicator = 'P';

        this. admittingDoctor = '';
        this. patientType = '';
        this. visitNumber = _visitNumber||"";
        this. financialClass = '';
        this. chargePriceIndicator = '';
        this. courtesyCode = '';
        this. creditRating = '';
        this. contractCode = '';
        this. contractEffectiveDate = '';
        this. contractAmount = '';
        this. contractPeriod = '';
        this. interestCode = '';
        this. transfertoBadDebtCode = '';
        this. transfertoBadDebtDate = '';
        this. badDebtAgencyCode = '';
        this. badDebtTransferAmount = '';
        this. badDebtRecoveryAmount = '';
        this. deleteAccountIndicator = '';
        this. deleteAccountDate = '';
        this. dischargeDisposition = '';
        this. dischargedtoLocation = '';
        this. dietType = '';
        this. servicingFacility = '';
        this. bedStatus = '';
        this. accountStatus = '';
        this. pendingLocation = '';
        this. priorTemporaryLocation = '';
        this. admitDateTime = '';
        this. dischargeDateTime = '';
        this. currentPatientBalance = '';
        this. totalCharges = '';
        this. totalAdjustments = '';
        this. totalPayments = '';
        this. alternateVisitId = '';
        this. visitIndicator = '';
        this. otherHealthcareProvider = '';
    }
     getPv1Segment() {
        return  "PV1|"+this. setIdPv1+'|'+this. patientClass+'|'+this. assignedPatientLocation+'|'+this. admissionType+'|'+this. preadmitNumber+'|'+this. priorPatientLocation+'|'+this. attendingDoctor+'|'+this. referringDoctor+'|'+this. consultingDoctor+'|'+this. hospitalService+'|'+this. temporaryLocation+'|'+this. preadmitTestIndicator+'|'+this. readmissionIndicator+'|'+this. admitSource+'|'+this. ambulatoryStatus+'|'+this. vipIndicator+'|'+this. admittingDoctor+'|'+this. patientType+'|'+this. visitNumber+'|'+this. financialClass+'|'+this. chargePriceIndicator+'|'+this. courtesyCode+'|'+this. creditRating+'|'+this. contractCode+'|'+this. contractEffectiveDate+'|'+this. contractAmount+'|'+this. contractPeriod+'|'+this. interestCode+'|'+this. transfertoBadDebtCode+'|'+this. transfertoBadDebtDate+'|'+this. badDebtAgencyCode+'|'+this. badDebtTransferAmount+'|'+this. badDebtRecoveryAmount+'|'+this. deleteAccountIndicator+'|'+this. deleteAccountDate+'|'+this. dischargeDisposition+'|'+this. dischargedtoLocation+'|'+this. dietType+'|'+this. servicingFacility+'|'+this. bedStatus+'|'+this. accountStatus+'|'+this. pendingLocation+'|'+this. priorTemporaryLocation+'|'+this. admitDateTime+'|'+this. dischargeDateTime+'|'+this. currentPatientBalance+'|'+this. totalCharges+'|'+this. totalAdjustments+'|'+this. totalPayments+'|'+this. alternateVisitId+'|'+this. visitIndicator+'|'+this. otherHealthcareProvider;

    }
}
module.exports=Pv1;