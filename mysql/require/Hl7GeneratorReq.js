let moment = require('../node_modules/moment');
let uuid = require('node-uuid');
let htmlToText = require('../node_modules/html-to-text');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const fromFile= promisify(htmlToText.fromFile);
let Msh = require('../hl7v2/Msh');
let Pid = require('../hl7v2/Pid');
let Pv1 = require('../hl7v2/Pv1');
let Mrg = require('../hl7v2/Mrg');
let Orc = require('../hl7v2/Orc');
let Obx = require('../hl7v2/Obx');
let Obr = require('../hl7v2/Obr');
let WorklistGeneratorReq = require('./WorklistGeneratorReq');
class Hl7GeneratorReq{
    constructor()
    {

    }
    createHl7XmlFile(_siteId,_hl7Content,_prefixFile='hl7_')
    {
        let hl7Dir=global.App.appConf.htl7FileDir;
        fs.existsSync(hl7Dir+"/site"+_siteId) || fs.mkdirSync(hl7Dir+"/site"+_siteId);
        let wlXmlFilePath=hl7Dir+"/site"+_siteId+"/"+_prefixFile+uuid.v4()+".txt";
        return writeFile(wlXmlFilePath,_hl7Content);//,'latin1'
    }
    generateMshSegment(_messageType,_sendingFacility)
    {
        let date=(moment(new Date()).format('Y-MM-DD')).replace(/-/g,"");
        let time=(moment(new Date()).format('HH:MM:SS')).replace(/:/g,"");
        let msh = new Msh (_messageType,(date+""+time),_sendingFacility);

        return msh.getMshSegment();
    }
    generatePidSegment(_patientDataObject,_cityName,_ippPatient)
    {

        let patientPacsId=_patientDataObject.patientPacsId;
        let patientLName=_patientDataObject.patientLName;
        let patientFName=_patientDataObject.patientFname;
        let patientPhoneNumber="";
        if(_patientDataObject.patientPhoneNumber)
            patientPhoneNumber=_patientDataObject.patientPhoneNumber;
        else
        {
            if(_patientDataObject.patientMobileNumber)
                patientPhoneNumber=_patientDataObject.patientMobileNumber;
        }
        let dateTimeofBirth=(moment(_patientDataObject.patientBirthday).format('Y-MM-DD')).replace(/-/g,"");
        let sex="";
        if(_patientDataObject.patientGender===1)
            sex="M";
        else
            sex="F";

        let ssnNumberPatient="";
        if(_patientDataObject.patientSocialNumber)
            ssnNumberPatient=_patientDataObject.patientSocialNumber+""+_patientDataObject.patientSocialKey;

        let patientAddressObj={};
        patientAddressObj.patientAddress=_patientDataObject.patientAddress||"";
        patientAddressObj.patientZipCode=_patientDataObject.patientZipCode||"";
        patientAddressObj.cityName=_cityName||"";

        let patientIpp=_ippPatient||"";

        let pid=new Pid(patientIpp,patientPacsId,patientLName,patientFName,patientPhoneNumber,dateTimeofBirth,sex,patientAddressObj,ssnNumberPatient);
        return pid.getPidSegment();
    }

    generatePv1Segment(_medTraitantObj,_refphyObj,_visitObj,_patientObj)
    {
        let attendingDoctor="";
        if(_medTraitantObj)
            attendingDoctor=_medTraitantObj.referringPhysicianId+"^"+_medTraitantObj.referringPhysicianLName+"^"+_medTraitantObj.referringPhysicianFName;

        let referringDoctor="";
        if(_refphyObj)
            referringDoctor=_refphyObj.referringPhysicianId+"^"+_refphyObj.referringPhysicianLName+"^"+_refphyObj.referringPhysicianFName;

        let visitNumber=_visitObj.visitHospitVisitNumber||_visitObj.visitPacsId;
        let patientIsVip=_patientObj.patientIsVip||false;
        let isPatientHopsitalizied=_visitObj.visitIsHospitalized||false;

        let pv1=new Pv1(attendingDoctor,referringDoctor,visitNumber,patientIsVip,isPatientHopsitalizied);
        return pv1.getPv1Segment();
    }
    generateMrgSegment(_patientPacsIdToReplace)
    {
        let mrg=new Mrg(_patientPacsIdToReplace);
        return mrg.getMrgSegment();
    }


    generateOrcSegment(_orderControl,_studyVisitPacsId,_visitPacsId,_orderStatus)
    {
        let orc=new Orc(_orderControl,"A-"+_studyVisitPacsId,_visitPacsId,_orderStatus);
        return orc.getOrcSegment();
    }
    generateObrSegment(_studyObj,_visitObj,_studyVisitObj,_modalityObj,_doctorObj)
    {
        let obj={};
        obj.placerOrderNumber='A-'+_studyVisitObj.studyVisitPacsId;
        obj.universalServiceId=_studyObj.studyId+"^"+_studyObj.studyName+"^"+_visitObj.siteId;
        obj.placerField1='A-'+_studyVisitObj.studyVisitPacsId;// accession number
        obj.fillerField1="1.2.826.0.1.3680043.9.7404." +_studyVisitObj.studyVisitPacsId; // instance uuid
        obj.quantityTiming=(moment(_visitObj.visitDate).format('Y-MM-DD')).replace(/-/g,"");
        obj.quantityTiming+=(_visitObj.visitTime).toString().replace(/:/g,"");
        obj.diagnosticServSectId=_modalityObj.modalityCode;
        obj.resultStatus="F";//final
        obj.parent1=_visitObj.visitPacsId;
        obj.principalResultInterpreter=_doctorObj['User.userLName']+"^"+_doctorObj['User.userFName'];
        let obr=new Obr(obj);
        return obr.getObrSegment();
    }
    generateObxSegment()
    {

    }
    deleteOrmMessageByStudyVisitId(_studyVisitId){
        let dbUtility = global.App.DbUtility;
        let params = {};
        params.filters = [{name: 'studyVisitId', value:_studyVisitId }];
        return dbUtility.read(params, 'STUDY_VISIT')
            .then(_resultArray=>{
                if(_resultArray.length)
                {
                    this.generateOrmMsgByStudyVisitId("CA","CA",_resultArray[0].studyId,_studyVisitId);
                }
            });
    }
    getDataByStudyVisitIdToHl7Msg(_studyVisitId)
    {
        let worklistGeneratorReq=new WorklistGeneratorReq();
        return worklistGeneratorReq.getDataToGenerateWorklistXml(_studyVisitId)
            .then(_result=>{
                let result={};
                result.patientObj=_result.patientObj;
                result.studyVisitAndVisitObj=_result.studyVisitAndVisitObj;
                result.deviceObj=_result.deviceObj;
                result.modalityObj={modalityCode:result.deviceObj['Modality.modalityCode']};
                result.studyObj=_result.studyObj;
                result.refPhyObj=_result.refPhyObj;
                result.doctorObj=_result.doctorObj;
                result.cityObj=_result.cityObj;
                result.visitObj={
                    visitId:result.studyVisitAndVisitObj['Visit.visitId'],
                    patientId:result.studyVisitAndVisitObj['Visit.patientId'],
                    visitDate:result.studyVisitAndVisitObj['Visit.visitDate'],
                    visitTime:result.studyVisitAndVisitObj['Visit.visitTime'],
                    doctorId:result.studyVisitAndVisitObj['Visit.doctorId'],
                    siteId:result.studyVisitAndVisitObj['Visit.siteId'],
                    visitIppPatient:result.studyVisitAndVisitObj['Visit.visitIppPatient'],
                    visitHospitVisitNumber:result.studyVisitAndVisitObj['Visit.visitHospitVisitNumber'],
                    visitPacsId:result.studyVisitAndVisitObj['Visit.visitPacsId'],
                    visitIsHospitalized:result.studyVisitAndVisitObj['Visit.visitIsHospitalized']
                };
                return result;

            });
    }
    generateOrmMsgByStudyVisitId(_orderControl,_orderStatus,_studyId,_studyVisitId)
    {
        let dbUtility = global.App.DbUtility;
        let params = {};
        params.filters = [{name: 'studyId', value: _studyId}];
        return dbUtility.read(params, 'STUDY')
            .then(_resultStudyArray=> {
                if (_resultStudyArray[0].studyGenerateDicomWl) {
                    let studyObj=_resultStudyArray[0];

                    return this.getDataByStudyVisitIdToHl7Msg(_studyVisitId)
                        .then(_result=>{
                            let patientObj=_result.patientObj;
                            let studyVisitAndVisitObj=_result.studyVisitAndVisitObj;
                            let deviceObj=_result.deviceObj;
                            let modalityObj=_result.modalityObj;
                            let studyObj=_result.studyObj;
                            let refPhyObj=_result.refPhyObj;
                            let doctorObj=_result.doctorObj;
                            let cityObj=_result.cityObj;
                            let visitObj=_result.visitObj;

                            let mshSegment=this.generateMshSegment("ORM^O01",visitObj.siteId,visitObj.visitIppPatient);
                            let cityName="";
                            if(cityObj)
                                cityName=cityObj.cityName;
                            let pidSegment=this.generatePidSegment(patientObj,cityName,visitObj.visitIppPatient);
                            let pv1Segment=this.generatePv1Segment(refPhyObj,refPhyObj,visitObj,patientObj);
                            let orcSegment=this.generateOrcSegment(_orderControl,studyVisitAndVisitObj.studyVisitPacsId,visitObj.visitPacsId,_orderStatus);
                            let obrSegment=this.generateObrSegment(studyObj,visitObj,studyVisitAndVisitObj,modalityObj,doctorObj);
                            let hl7Content=mshSegment+String.fromCharCode(13)+pidSegment+String.fromCharCode(13)+pv1Segment+String.fromCharCode(13)+orcSegment+String.fromCharCode(13)+obrSegment+String.fromCharCode(13);
                            return this.createHl7XmlFile(visitObj.siteId,hl7Content,"orm_");
                        });
                }
            });
    }
    generateOruMsgByVisitId(_visitId)
    {
     let dbUtility = global.App.DbUtility;


     let params = {};
     params.filters = [{name: 'visitId', value:_visitId }];
     return dbUtility.read(params, 'STUDY_VISIT')
         .then(_studyVisitArray=>
         {
             let promiseArray=[];
             _studyVisitArray.forEach(_studyVisitObj=>{
                 promiseArray.push(this.generateOruMsgByStudyVisitId("NW",_studyVisitObj.studyId,_studyVisitObj.studyVisitId));
             });
             return Promise.all(promiseArray);
         });
    }
    generateOruMsgByStudyVisitId(_orderControl,_studyId,_studyVisitId)
    {
        let dbUtility = global.App.DbUtility;
        let hl7Content;
        let visitObj;
        let params = {};
        params.filters = [{name: 'studyId', value: _studyId}];
        return dbUtility.read(params, 'STUDY')
            .then(_resultStudyArray=> {
                if (_resultStudyArray[0].studyGenerateDicomWl) {
                    let studyObj=_resultStudyArray[0];

                    return this.getDataByStudyVisitIdToHl7Msg(_studyVisitId)
                        .then(_result=>{
                            let patientObj=_result.patientObj;
                            let studyVisitAndVisitObj=_result.studyVisitAndVisitObj;
                            let deviceObj=_result.deviceObj;
                            let modalityObj=_result.modalityObj;
                            let studyObj=_result.studyObj;
                            let refPhyObj=_result.refPhyObj;
                            let doctorObj=_result.doctorObj;
                            let cityObj=_result.cityObj;
                             visitObj=_result.visitObj;

                            let mshSegment=this.generateMshSegment("ORU^R01",visitObj.siteId,visitObj.visitIppPatient);
                            let cityName="";
                            if(cityObj)
                                cityName=cityObj.cityName;
                            let pidSegment=this.generatePidSegment(patientObj,cityName,visitObj.visitIppPatient);
                            let pv1Segment=this.generatePv1Segment(refPhyObj,refPhyObj,visitObj,patientObj);
                            let orcSegment=this.generateOrcSegment(_orderControl,studyVisitAndVisitObj.studyVisitPacsId,visitObj.visitPacsId);
                            let obrSegment=this.generateObrSegment(studyObj,visitObj,studyVisitAndVisitObj,modalityObj,doctorObj);
                            hl7Content=mshSegment+String.fromCharCode(13)+pidSegment+String.fromCharCode(13)+pv1Segment+String.fromCharCode(13)+orcSegment+String.fromCharCode(13)+obrSegment+String.fromCharCode(13);
                           return studyVisitAndVisitObj;
                        })
                        .then(_studyVisitAndVisitObj=>{
                            return this.generateObxMsgForOruMsg(_studyVisitAndVisitObj);
                        })
                        .then(_obxSegmentContent=>{
                            hl7Content+=_obxSegmentContent+String.fromCharCode(13);
                            return this.createHl7XmlFile(visitObj.siteId,hl7Content,"oru_");
                        })

                }
            });
    }

    generateObxMsgForOruMsg(_studyVisitAndVisitObj)
    {
      let dbUtility = global.App.DbUtility;

      let params = {};
      params.filters = [{name: 'visitId', value: _studyVisitAndVisitObj.visitId}];
         return dbUtility.read(params, 'REPORT')
            .then(_resultArray=>{

                let reportDir=global.App.appConf.reportDir;
                // get the report body
                let promiseArray=[];
                _resultArray.forEach(_reportObj=>{
                    promiseArray.push(fromFile(reportDir+"/"+_reportObj.reportPath));
                });
               return Promise.all(promiseArray)
                   .then(_resContentArray=>{
                       let obxContents="";
                       let instanceUid=_studyVisitAndVisitObj.studyVisitPacsId;
                       obxContents+= "OBX|1|HD|Study Instance UID|1|1.2.826.0.1.3680043.9.7404." +instanceUid+"||||||F"+String.fromCharCode(13);

                     _resContentArray.forEach(_fileContent=>{
                         let reportLinesArray=_fileContent.split("\n");
                         let i=2;
                         reportLinesArray.forEach(_line=>{
                             obxContents+= "OBX|"+i+"|TX|SR Text|1|"+_line+"||||||F"+String.fromCharCode(13);
                             i++;
                         });
                         obxContents+=String.fromCharCode(13)+String.fromCharCode(13)+String.fromCharCode(13);
                     });
                       return obxContents;
                   });


            });
    }

    getDataToCreatePatientMsgByPatientId(_patientId)
    {
        let dbUtility = global.App.DbUtility;
        let params = {
            fieldsArray:['patientFname','patientLName','patientGender','patientBirthday','referringPhysicianId','cityId','patientPacsId','patientAddress','patientSocialNumber','patientSocialKey','patientPhoneNumber','patientIsVip','patientZipCode','patientMobileNumber']};
        params.filters = [{name: 'patientId', value:_patientId }];
        return dbUtility.read(params, 'PATIENT')
            .then(_resultPatient=>{
                if(!_resultPatient.length)
                    throw new Error("Patient was not found!!!!!!!!!!");
                else
                {
                    let patientObj=_resultPatient[0];
                    let promiseArray=[];

                    // get the referring physician "Medecin traitant"
                    if(patientObj.referringPhysicianId)
                    {
                        let paramsRefPh = {};
                        paramsRefPh.filters = [{name: 'referringPhysicianId', value: patientObj.referringPhysicianId}];
                        paramsRefPh.fieldsArray=['referringPhysicianId','referringPhysicianFName','referringPhysicianLName'];
                        promiseArray.push( dbUtility.read(paramsRefPh, 'REFERRING_PHYSICIAN'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));


                    // get the patient city
                    if(patientObj.cityId)
                    {
                        let paramsCity = {};
                        paramsCity.filters = [{name: 'cityId', value: patientObj.cityId}];
                        paramsCity.fieldsArray=['cityName'];
                        promiseArray.push( dbUtility.read(paramsCity, 'CITY'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));

                    return Promise.all(promiseArray)
                        .then(_result=>{
                            let refPhyObj=null;
                            let medTraitant=null;
                            if(_result[0]&& _result[0].length)
                                medTraitant=_result[0][0];

                            let cityObj=null;
                            if(_result[1].length)
                                cityObj=_result[1][0];
                            return {patientObj:patientObj,cityObj:cityObj,medTraitantObj:medTraitant};
                        })
                }
            })
    }

    generatePatientCreateMsgByPatientId(_patientId,_siteId)
    {
        return this.getDataToCreatePatientMsgByPatientId(_patientId)
            .then(_result=>{
                let cityObj=_result.cityObj;
                let mshSegment=this.generateMshSegment("ADT^A08",_siteId);
                let cityName="";
                if(cityObj)
                    cityName=cityObj.cityName;

                let pidSegment=this.generatePidSegment(_result.patientObj,cityName);


                let hl7Content=mshSegment+String.fromCharCode(13)+pidSegment+String.fromCharCode(13);
                return this.createHl7XmlFile(_siteId,hl7Content);
            })
    }

    getDataToUpdatePatientMsgByVisitId(_visitId)
    {
        let dbUtility = global.App.DbUtility;
        let mainTableObject={tableName:'VISIT',filters:[{name:'visitId',value:_visitId}],
            fieldsArray:['visitId','patientId','visitDate','visitTime','doctorId','siteId','visitHospitVisitNumber','visitPacsId','visitIsHospitalized','visitTime','visitIppPatient']};
        let joinTablesArray=[];
        joinTablesArray.push(
            {
                tableName: "PATIENT",
                fieldsArray:['patientFname','patientLName','patientGender','patientBirthday','referringPhysicianId','cityId','patientPacsId','patientAddress','patientSocialNumber','patientSocialKey','patientPhoneNumber','patientIsVip','patientZipCode','patientMobileNumber']
            });
        return dbUtility.joinQuery(mainTableObject,joinTablesArray,'no')
            .then(_resultVisit=>{
                if(!_resultVisit.length)
                    throw new Error("Visit was not found!!!!!!!!!!");
                else
                {
                    let visitAndPatientObj=_resultVisit[0];
                    let promiseArray=[];

                    // get the referring physician, if patient isn't sent by his "medecin traitant"
                    let mainTableRefPhyObject={tableName:'VISIT_HAS_RPH',
                        filters :[{name: 'patientIsOrientedBy', value:true },
                            {name: 'visitId', value:visitAndPatientObj.visitId }]};
                    let joinTablesRefPhyArray=[];
                    joinTablesRefPhyArray.push({tableName:'REFERRING_PHYSICIAN',fieldsArray:['referringPhysicianFName','referringPhysicianLName']});
                    promiseArray.push(dbUtility.joinQuery(mainTableRefPhyObject,joinTablesRefPhyArray,'no'));


                    // get the referring physician "Medecin traitant"
                    if(visitAndPatientObj['Patient.referringPhysicianId'])
                    {
                        let paramsRefPh = {};
                        paramsRefPh.filters = [{name: 'referringPhysicianId', value: visitAndPatientObj['Patient.referringPhysicianId']}];
                        paramsRefPh.fieldsArray=['referringPhysicianId','referringPhysicianFName','referringPhysicianLName'];
                        promiseArray.push( dbUtility.read(paramsRefPh, 'REFERRING_PHYSICIAN'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));

                    // get the doctor
                    let mainTableDoctorObject={tableName:'DOCTOR',
                        filters :[{name: 'doctorId', value:visitAndPatientObj.doctorId}]};
                    let joinTablesDoctorArray=[];
                    joinTablesDoctorArray.push({tableName:'USER',fieldsArray:['userFName','userLName']});
                    promiseArray.push(dbUtility.joinQuery(mainTableDoctorObject,joinTablesDoctorArray,'no'));


                    // get the patient city
                    if(visitAndPatientObj['Patient.cityId'])
                    {

                        let paramsCity = {};
                        paramsCity.filters = [{name: 'cityId', value: visitAndPatientObj['Patient.cityId']}];
                        paramsCity.fieldsArray=['cityName'];
                        promiseArray.push( dbUtility.read(paramsCity, 'CITY'));
                    }
                    else
                        promiseArray.push(Promise.resolve([]));

                    return Promise.all(promiseArray)
                        .then(_result=>{
                            let refPhyObj=null;
                            if(_result[0].length) {
                                refPhyObj = {
                                    referringPhysicianFName: _result[0][0]['ReferringPhysician.referringPhysicianFName'],
                                    referringPhysicianLName: _result[0][0]['ReferringPhysician.referringPhysicianLName'],
                                    referringPhysicianId: _result[0][0]['referringPhysicianId']
                                }
                            }
                            else{
                                if(_result[1]&& _result[1].length)
                                    refPhyObj=_result[1][0];//the referring physician "Medecin traitant"
                            }
                            let medTraitant=null;
                            if(_result[1]&& _result[1].length)
                                medTraitant=_result[1][0];

                            let cityObj=null;
                            if(_result[3].length)
                                cityObj=_result[3][0];

                            let patientObj={
                                patientId:visitAndPatientObj.patientId,
                                patientPacsId:visitAndPatientObj['Patient.patientPacsId'],
                                cityId:visitAndPatientObj['Patient.cityId'],
                                patientBirthday:visitAndPatientObj['Patient.patientBirthday'],
                                patientFname:visitAndPatientObj['Patient.patientFname'],
                                patientLName:visitAndPatientObj['Patient.patientLName'],
                                patientGender:visitAndPatientObj['Patient.patientGender'],
                                patientAddress:visitAndPatientObj['Patient.patientAddress'],
                                patientSocialNumber:visitAndPatientObj['Patient.patientSocialNumber'],
                                patientSocialKey:visitAndPatientObj['Patient.patientSocialKey'],
                                patientPhoneNumber:visitAndPatientObj['Patient.patientPhoneNumber'],
                                patientMobileNumber:visitAndPatientObj['Patient.patientMobileNumber'],
                                patientIsVip:visitAndPatientObj['Patient.patientIsVip'],
                                patientZipCode:visitAndPatientObj['Patient.patientZipCode'],
                                referringPhysicianId:visitAndPatientObj['Patient.referringPhysicianId'],
                            };
                            return {patientObj:patientObj,visitObj:visitAndPatientObj,refPhyObj:refPhyObj,
                                doctorObj:_result[2][0],cityObj:cityObj,medTraitantObj:medTraitant}
                        })
                }
            })
    }
    generatePatientUpdateMsgByVisitId(_visitId)
    {
       return this.getDataToUpdatePatientMsgByVisitId(_visitId)
           .then(_result=>{
               let visitObj=_result.visitObj;
               let cityObj=_result.cityObj;
               let mshSegment=this.generateMshSegment("ADT^A08",visitObj.siteId);
               let cityName="";
               if(cityObj)
                   cityName=cityObj.cityName;

               let pidSegment=this.generatePidSegment(_result.patientObj,cityName,visitObj.visitIppPatient);
               let pv1Segment=this.generatePv1Segment(_result.medTraitantObj,_result.refPhyObj,visitObj,_result.patientObj);

               let hl7Content=mshSegment+String.fromCharCode(13)+pidSegment+String.fromCharCode(13)+pv1Segment+String.fromCharCode(13);
               return this.createHl7XmlFile(visitObj.siteId,hl7Content);
           })
    }

    deleteUnautorizedCharacter(_value)
    {
        let reg=/\\|\&|\^|\~|\|/g;
        _value=_value.replace(reg,"");
        return _value;
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
module.exports=Hl7GeneratorReq;