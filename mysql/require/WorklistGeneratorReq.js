let moment = require('../node_modules/moment');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
class WorklistGeneratorReq{
    constructor()
    {

    }
    createWorklistXmlFile(_siteId,_accessionNumber,_wlXmlContent)
    {
        let wlXmlDir=global.App.appConf.worklistDir;
        fs.existsSync(wlXmlDir+"/site"+_siteId) || fs.mkdirSync(wlXmlDir+"/site"+_siteId);
        let wlXmlFilePath=wlXmlDir+"/site"+_siteId+"/mwl"+_accessionNumber+".xml";
        return writeFile(wlXmlFilePath,_wlXmlContent,'latin1');
    }
    getDataToGenerateWorklistXml(_studyVisitId)
    {
       let dbUtility = global.App.DbUtility;
        let mainTableObject={tableName:'STUDY_VISIT',filters:[{name:'studyVisitId',value:_studyVisitId}]};
        let joinTablesArray=[];
        joinTablesArray.push(
            {tableName:'VISIT',
                fieldsArray:['visitId','patientId','visitDate','visitTime','doctorId','siteId','visitHospitVisitNumber','visitPacsId','visitIsHospitalized','visitTime','visitIppPatient'],
                joinObject:{
                    tableName: "PATIENT",
                    fieldsArray:['patientFname','patientLName','patientGender','patientBirthday','referringPhysicianId','cityId']
            }});
        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(_resultStudyVisit=>{
                if(!_resultStudyVisit.length)
                    throw new Error("Study was not found!!!!!!!!!!");
                else
                {
                    let studyVisitAndVisitObj=_resultStudyVisit[0];
                    let promiseArray=[];

                     let mainTableObject={tableName:'DEVICE',
                         filters :[{name: 'deviceId', value:studyVisitAndVisitObj.deviceId }]};
                     let joinTablesArray=[];
                     joinTablesArray.push({tableName:'MODALITY',fieldsArray:['modalityCode']});
                    promiseArray.push(dbUtility.joinQuery(mainTableObject,joinTablesArray,'no'));

                    let paramsPatient={};
                    paramsPatient.filters = [{name: 'patientId', value:studyVisitAndVisitObj['Visit.patientId'] }];
                    promiseArray.push(dbUtility.read(paramsPatient, 'PATIENT'));

                    let paramsStudy={};
                    paramsStudy.filters = [{name: 'studyId', value:studyVisitAndVisitObj.studyId }];
                    promiseArray.push(dbUtility.read(paramsStudy, 'STUDY'));

                    // get the referring physician, if patient isn't sent by his "medecin traitant"
                    let mainTableRefPhyObject={tableName:'VISIT_HAS_RPH',
                        filters :[{name: 'patientIsOrientedBy', value:true },
                            {name: 'visitId', value:studyVisitAndVisitObj.visitId }]};
                    let joinTablesRefPhyArray=[];
                    joinTablesRefPhyArray.push({tableName:'REFERRING_PHYSICIAN',fieldsArray:['referringPhysicianFName','referringPhysicianLName']});
                    promiseArray.push(dbUtility.joinQuery(mainTableRefPhyObject,joinTablesRefPhyArray,'no'));

                    // get the referring physician "Medecin traitant"
                    if(studyVisitAndVisitObj['Visit.Patient.referringPhysicianId'])
                    {
                        let paramsRefPh = {};
                        paramsRefPh.filters = [{name: 'referringPhysicianId', value: studyVisitAndVisitObj['Visit.Patient.referringPhysicianId']}];
                        paramsRefPh.fieldsArray=['referringPhysicianId','referringPhysicianFName','referringPhysicianLName'];
                        promiseArray.push( dbUtility.read(paramsRefPh, 'REFERRING_PHYSICIAN'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));

                    // get the doctor
                    let mainTableDoctorObject={tableName:'DOCTOR',
                        filters :[{name: 'doctorId', value:studyVisitAndVisitObj['Visit.doctorId'] }]};
                    let joinTablesDoctorArray=[];
                    joinTablesDoctorArray.push({tableName:'USER',fieldsArray:['userFName','userLName']});
                    promiseArray.push(dbUtility.joinQuery(mainTableDoctorObject,joinTablesDoctorArray,'no'));


                    // get the patient city
                    if(studyVisitAndVisitObj['Visit.Patient.cityId'])
                    {
                        let paramsCity = {};
                        paramsCity.filters = [{name: 'cityId', value: studyVisitAndVisitObj['Visit.Patient.cityId']}];
                        paramsCity.fieldsArray=['cityName'];
                        promiseArray.push( dbUtility.read(paramsCity, 'CITY'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));

                    return Promise.all(promiseArray)
                        .then(_result=>{
                            let refPhyObj=null;
                            if(_result[3].length)
                            {
                                refPhyObj = {
                                    referringPhysicianFName: _result[3][0]['ReferringPhysician.referringPhysicianFName'],
                                    referringPhysicianLName: _result[3][0]['ReferringPhysician.referringPhysicianLName'],
                                    referringPhysicianId: _result[3][0]['referringPhysicianId']

                                }

                            }
                            else{
                                if(_result[4]&& _result[4].length)
                                    refPhyObj=_result[4][0];
                            }
                            let medTraitant=null;
                            if(_result[4]&& _result[4].length)
                                medTraitant=_result[4][0];

                            let cityObj=null;
                            if(_result[6].length)
                                cityObj=_result[6][0];

                            return {patientObj:_result[1][0],deviceObj:_result[0][0],studyVisitAndVisitObj:_resultStudyVisit[0],
                                    studyObj:_result[2][0],refPhyObj:refPhyObj,doctorObj:_result[5][0],cityObj:cityObj,medTraitantObj:medTraitant}
                        })
                }
            });
    }
    deleteUnautorizedCharacter(_value)
    {
        let reg=/\\|\&|\^|\~/g;
        _value=_value.replace(reg,"");
        return _value;
    }
    generateWorklist(_studyVisitId,_studyId)
    {
        // get the study
        let dbUtility = global.App.DbUtility;
        let params = {};
        params.filters = [{name: 'studyId', value: _studyId}];
        return dbUtility.read(params, 'STUDY')
            .then(_resultStudyArray=>{
                if(_resultStudyArray[0].studyGenerateDicomWl)
                {
                    return this.getDataToGenerateWorklistXml(_studyVisitId)
                        .then(_result=>{
                            let patientObj=_result.patientObj;
                            let studyVisitAndVisitObj=_result.studyVisitAndVisitObj;
                            let deviceObj=_result.deviceObj;
                            let studyObj=_result.studyObj;
                            let refPhyObj=_result.refPhyObj;
                            let doctorObj=_result.doctorObj;
                            let referringPhysicianFName="Inconnu";
                            let referringPhysicianLName="Inconnu";
                            let patientBirthday=patientObj.patientBirthday;
                            patientBirthday=(moment(patientBirthday).format('Y-MM-DD')).replace(/-/g,"");
                            let patientGender="";
                            if(patientObj.patientGender===1)
                                patientGender="M";
                            else
                                patientGender="F";

                            let worklistStudyLabel=this.deleteUnautorizedCharacter(studyObj.studyCode +": "+ studyObj.studyName);
                            if(refPhyObj)
                            {
                                referringPhysicianFName= this.deleteUnautorizedCharacter(refPhyObj.referringPhysicianFName);
                                referringPhysicianLName=this.deleteUnautorizedCharacter(refPhyObj.referringPhysicianLName);
                            }
                            let visitDate=(moment(studyVisitAndVisitObj["Visit.visitDate"]).format('Y-MM-DD')).replace(/-/g,"");
                            let visitTime=(studyVisitAndVisitObj["Visit.visitTime"]).replace(/:/g,"");
                            let doctor=this.deleteUnautorizedCharacter(doctorObj['User.userLName'])+"^"+this.deleteUnautorizedCharacter(doctorObj['User.userFName']);
                            let patient=this.deleteUnautorizedCharacter(patientObj.patientLName)+"^"+this.deleteUnautorizedCharacter(patientObj.patientFname);
                            let accessionNumber= studyVisitAndVisitObj.studyVisitPacsId;
                            let smartRisAET=global.App.appConf.worklistAET;

                            let mwlxml= '<?xml version="1.0" encoding="iso-8859-1" ?> ' +
                                '\n<dicom> ' +
                                '\n<!-- Specific Character Set ISO_IR 100=Latin alphabet No. 1 --> ' +
                                '\n<attr tag="00080005" vr="CS">ISO_IR 100</attr> ' +
                                '\n<!-- Accession Number  --> ' +
                                '\n<attr tag="00080050" vr="SH">A-' + accessionNumber+ '</attr> ' +
                                '\n<!-- StudyDescription --> ' +
                                '\n<attr tag="00081030" vr="LO">' + worklistStudyLabel + '</attr> ' +
                                '\n<!-- Modality --> ' +
                                '\n<attr tag="00080060" vr="CS">' + deviceObj['Modality.modalityCode'] + '</attr> ' +
                                '\n<!-- Referring Physicians Name -->'+
                                '\n<attr tag="00080090" vr="PN">' + referringPhysicianLName + '^' + referringPhysicianFName + '</attr> ' +
                                '\n<!-- Referenced Study Sequence --> ' +
                                '\n<attr tag="00081110" vr="SQ" /> ' +
                                '\n<!-- Referenced Patient Sequence --> ' +
                                '\n<attr tag="00081120" vr="SQ" /> ' +
                                '\n<attr tag="00100010" vr="PN">' + patient + '</attr> ' +
                                '\n<!-- Patient ID --> ' +
                                '\n<attr tag="00100020" vr="LO">' + patientObj.patientPacsId + '</attr> ' +
                                '\n<!-- Patient\'s Birth Date --> ' +
                                '\n<attr tag="00100030" vr="DA">' + patientBirthday + '</attr> ' +
                                '\n<!-- Patient\'s Sex --> ' +
                                '\n<attr tag="00100040" vr="CS">' + patientGender + '</attr> ' +
                                '\n<!-- Patient\'s Weight --> ' +
                                '\n<attr tag="00101030" vr="DS" /> ' +
                                '\n<!-- Medical Alerts --> ' +
                                '\n<attr tag="00102000" vr="LO" /> ' +
                                '\n<!-- Contrast Allergies --> ' +
                                '\n<attr tag="00102110" vr="LO" /> ' +
                                '\n<!-- Pregnancy Status --> ' +
                                '\n<attr tag="001021C0" vr="US" /> ' +
                                '\n<!-- AffectedSOPClassUID --> ' +
                                '\n<attr tag="00000002" vr="UI">' + accessionNumber + '</attr> ' +
                                '\n<!-- Study Instance UID --> ' +
                                '\n<attr tag="0020000D" vr="UI">1.2.826.0.1.3680043.9.7404.' + accessionNumber+ '</attr> ' +
                                '\n<!-- Requesting Service --> ' +
                                '\n<attr tag="00321033" vr="SH">  Externe  </attr> ' +
                                '\n<!-- Requesting Physician\'s Name --> ' +
                                '\n<attr tag="00321032" vr="PN">' + referringPhysicianLName + '^' + referringPhysicianFName + '</attr> ' +
                                '\n<!-- Requested Procedure Description --> ' +
                                '\n<attr tag="00321060" vr="LO">' + worklistStudyLabel + '</attr> ' +
                                '\n<!-- Requested Procedure Code Sequence --> ' +
                                '\n<attr tag="00321064" vr="SQ"> ' +
                                '\n<item> ' +
                                '\n<!-- Code Value --> ' +
                                '\n<attr tag="00080100" vr="SH">16210</attr> ' +
                                '\n<!-- Coding Scheme Designator --> ' +
                                '\n<attr tag="00080102" vr="SH">' + smartRisAET + '</attr> ' +
                                '\n<!-- Code Meaning --> ' +
                                '\n<attr tag="00080104" vr="LO">' + worklistStudyLabel + '</attr> ' +
                                '\n</item> ' +
                                '\n</attr> ' +
                                '\n<!-- Admission ID --> ' +
                                '\n<attr tag="00380010" vr="LO" /> ' +
                                '\n<!-- Special Needs --> ' +
                                '\n<attr tag="00380050" vr="LO" /> ' +
                                '\n<!-- Current Patient Location --> ' +
                                '\n<attr tag="00380300" vr="LO" /> ' +
                                '\n<!-- Patient State --> ' +
                                '\n<attr tag="00380500" vr="LO" /> ' +
                                '\n<!-- Scheduled Procedure Step Sequence --> ' +
                                '\n<attr tag="00400100" vr="SQ"> ' +
                                '\n<item> ' +
                                '\n<!-- Requested Contrast Agent --> ' +
                                '\n<attr tag="00321070" vr="LO" /> ' +
                                '\n<!-- Scheduled Station AE Title --> ' +
                                '\n<attr tag="00400001" vr="AE">' + deviceObj.deviceAET + '</attr> ' +
                                '\n<!-- Scheduled Procedure Step Start Date --> ' +
                                '\n<attr tag="00400002" vr="DA">' + visitDate + '</attr> ' +
                                '\n<!-- Scheduled Procedure Step Start Time --> ' +
                                '\n<attr tag="00400003" vr="TM">' + visitTime + '</attr> ' +
                                '\n<!-- Modality --> ' +
                                '\n<attr tag="00080060" vr="CS">' + deviceObj['Modality.modalityCode'] + '</attr> ' +
                                '\n<!-- Scheduled Performing Physician\'s Name --> ' +
                                '\n<attr tag="00400006" vr="PN">' + doctor + '</attr> ' +
                                '\n<!-- Scheduled Procedure Step Description --> ' +
                                '\n<attr tag="00400007" vr="LO">' + worklistStudyLabel + '</attr> ' +
                                '\n<!-- Scheduled Protocol Code Sequence --> ' +
                                '\n<attr tag="00400008" vr="SQ"> ' +
                                '\n<item> ' +
                                '\n<!-- Code Value --> ' +
                                '\n<attr tag="00080100" vr="SH">' + accessionNumber + '</attr> ' +
                                '\n<!-- Coding Scheme Designator --> ' +
                                '\n<attr tag="00080102" vr="SH">' + smartRisAET + '</attr> ' +
                                '\n<!-- Code Meaning --> ' +
                                '\n<attr tag="00080104" vr="LO">' + worklistStudyLabel + '</attr> ' +
                                '\n</item> ' +
                                '\n</attr> ' +
                                '\n<!-- Scheduled Procedure Step ID --> ' +
                                '\n<attr tag="00400009" vr="SH">SPS-' + accessionNumber + '</attr> ' +
                                '\n<!-- Scheduled Station Name --> ' +
                                '\n<attr tag="00400010" vr="SH" /> ' +
                                '\n<!-- Scheduled Procedure Step Location --> ' +
                                '\n<attr tag="00400011" vr="SH" /> ' +
                                '\n<!-- Pre-Medication --> ' +
                                '\n<attr tag="00400012" vr="LO" /> ' +
                                '\n<!-- Scheduled Procedure Step Status --> ' +
                                '\n<attr tag="00400020" vr="CS" /> ' +
                                '\n</item> ' +
                                '\n</attr> ' +
                                '\n<!-- Requested Procedure ID --> ' +
                                '\n<attr tag="00401001" vr="SH">PROC-' + accessionNumber + '</attr> ' +
                                '\n<!-- Requested Procedure Priority --> ' +
                                '\n<attr tag="00401003" vr="SH" /> ' +
                                '\n<!-- Patient Transport Arrangements --> ' +
                                '\n<attr tag="00401004" vr="LO" /> ' +
                                '\n<!-- Confidentiality constraint on patient data --> ' +
                                '\n<attr tag="00403001" vr="LO" /> ' +
                                '\n</dicom>';
                            return this.createWorklistXmlFile(studyVisitAndVisitObj['Visit.siteId'],accessionNumber,mwlxml);

                        });
                }else return "";
            });


    }
    deleteWorklistFileByStudyVisitPacsId(_visitId,_studyVisitPacsId)
    {
        let dbUtility = global.App.DbUtility;
        let params = {};
        params.filters = [{name: 'visitId', value:_visitId }];
        params.fieldsArray = ['siteId'];
        return dbUtility.read(params, 'VISIT')
            .then(_resultArray=>{
                if(_resultArray.length)
                {
                    let wlXmlDir=global.App.appConf.worklistDir;
                    let wlXmlFilePath=wlXmlDir+"/site"+_resultArray[0]["siteId"]+"/mwl"+_studyVisitPacsId+".xml";
                    if(fs.existsSync(wlXmlFilePath))
                        unlink(wlXmlFilePath);
                    return Promise.resolve("");
                }
            });
    }


    deleteWorklistFileByStudyVisitId(_studyVisitId)
    {

        let dbUtility = global.App.DbUtility;

        let mainTableObject={tableName:'STUDY_VISIT',
            fieldsArray:['studyVisitPacsId'],
            filters:[{name:'studyVisitId',value:_studyVisitId}]};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'VISIT',fieldsArray:['siteId']});

        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(_resultArray=>{
                if(_resultArray.length)
                {
                    let wlXmlDir=global.App.appConf.worklistDir;
                    let wlXmlFilePath=wlXmlDir+"/site"+_resultArray[0]["Visit.siteId"]+"/mwl"+_resultArray[0].studyVisitPacsId+".xml";
                    if(fs.existsSync(wlXmlFilePath))
                        unlink(wlXmlFilePath);
                     return Promise.resolve("");
                }
            });
    }

    deleteWorklistFileByVisitId(_visitId)
    {
        let dbUtility = global.App.DbUtility;

        let mainTableObject={tableName:'VISIT',fieldsArray:['siteId'],filters:[{name:'visitId',value:_visitId}]};
        let joinTablesArray=[];
        joinTablesArray.push({tableName:'STUDY_VISIT',fieldsArray:['studyVisitPacsId']});

        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(_resultArray=>{
                if(_resultArray.length)
                {
                    let promiseArray=[];
                    _resultArray.forEach(_item=>{
                        let wlXmlDir=global.App.appConf.worklistDir;
                        let wlXmlFilePath=wlXmlDir+"/site"+_item["siteId"]+"/mwl"+_item["StudyVisits.studyVisitPacsId"]+".xml";
                       if(fs.existsSync(wlXmlFilePath))
                            promiseArray.push(unlink(wlXmlFilePath));
                    });
                  return Promise.all(promiseArray);
                }
                else return '';
            });
    }

}
module.exports=WorklistGeneratorReq;