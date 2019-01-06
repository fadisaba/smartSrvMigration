class Pid{
    constructor(_patientIpp,_patientPacsId,_patientLName,_patientFName,_patientPhoneNumber,_dateTimeofBirth,_sex,_patientAddressObj,_ssnNumberPatient){
        this.setIdPid = '1';
        this.patientId = _patientIpp||_patientPacsId;
        this.patientIdentifierList = _patientPacsId;
        this.alternatePatientIdPid = '';
        this.patientName = _patientLName+"^"+_patientFName;
        this.motherMaidenName = '';
        this.dateTimeofBirth = _dateTimeofBirth;
        this.sex = _sex;
        this.patientAlias = '';
        this.race = '';
        this.patientAddress = '';
        if(_patientAddressObj)
        {
            let patientAddress=_patientAddressObj.patientAddress||"";
            let cityName=_patientAddressObj.cityName||"";
            let patientZipCode=_patientAddressObj.patientZipCode||"";
            this.patientAddress= patientAddress+"^"+" "+"^"+cityName+"^"+patientZipCode;
        }
        this.countryCode = '';
        this.phoneNumberHome = _patientPhoneNumber||"";
        this.phoneNumberBusiness = '';
        this.primaryLanguage = '';
        this.maritalStatus = '';
        this.religion = '';
        this.patientAccountNumber = '';
        this.ssnNumberPatient =_ssnNumberPatient||"";
        this.driverLicenseNumberPatient = '';
        this.motherIdentifier = '';
        this.ethnicGroup = '';
        this.birthPlace = '';
        this.multipleBirthIndicator = '';
        this.birthOrder = '';
        this.citizenship = '';
        this.veteransMilitaryStatus = '';
        this.nationality = '';
        this.patientDeathDateTime = '';
        this.patientDeathIndicator = '';
        this.identityReliabilityCode= '';
        this.lastUpdateDateTime= '';
        this.lastUpdateFacility= '';
        this.speciesCode= '';
        this.strain= '';
        this.productionClassCode= '';
        this.tribalCitizenship= '';
        this.patientTelecommunicationInformation= '';
    }
     getPidSegment() {
         return "PID|"+this.setIdPid+'|'+this.patientId+'|'+this.patientIdentifierList+'|'+this.alternatePatientIdPid+'|'+this.patientName+'|'+this.motherMaidenName+'|'+this.dateTimeofBirth+'|'+
             this.sex+'|'+this.patientAlias+'|'+this.race+'|'+this.patientAddress+'|'+this.countryCode+'|'+this.phoneNumberHome+'|'+this.phoneNumberBusiness+'|'+this.primaryLanguage+'|'+
             this.maritalStatus+'|'+this.religion+'|'+this.patientAccountNumber+'|'+this.ssnNumberPatient+'|'+this.driverLicenseNumberPatient+
         '|'+this.motherIdentifier+'|'+this.ethnicGroup+'|'+this.birthPlace+'|'+this.multipleBirthIndicator+'|'+this.birthOrder+'|'+
             this.citizenship+'|'+this.veteransMilitaryStatus+'|'+this.nationality+'|'+this.patientDeathDateTime+'|'+this.patientDeathIndicator
             +'|'+this.identityReliabilityCode+'|'+this.lastUpdateDateTime+'|'+this.lastUpdateFacility+'|'+this.speciesCode+'|'+this.strain+'|'+
             this.productionClassCode+'|'+this.tribalCitizenship+'|'+this.patientTelecommunicationInformation;
     }
}
module.exports=Pid;