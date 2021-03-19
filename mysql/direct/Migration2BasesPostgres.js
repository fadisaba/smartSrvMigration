let uuid = require('node-uuid');
let Migration = {

    migrateActes:function()
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "acte","_migrate")
            .then(_rows=>{
                dbUtility.insertRecords(_rows,"acte",false)
                    .then(results=>{
                        console.log("migration actes successful")
                })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
    migrateMutuelles:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "mutuelle","_migrate")
            .then(_rows=>{
                _rows.forEach(_row=>{
                    _row.mutuelleId=uuid.v4();
                });
                dbUtility.insertRecords(_rows,"mutuelle",false)
                    .then(results=>{
                        console.log("migration mutuelle successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
    migrateAmo:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "amo","_migrate")
            .then(_rows=>{
                _rows.forEach(_row=>{
                    _row.amoId=uuid.v4();
                });
                dbUtility.insertRecords(_rows,"amo",false)
                    .then(results=>{
                        console.log("migration amo successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },

    migrateCcamConfig:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "CCAM_CONFIG","_migrate")
            .then(_rows=>{
                dbUtility.insertRecords(_rows,"CCAM_CONFIG",false)
                    .then(results=>{
                        console.log("migration CCAM_CONFIG successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
    migrateStudyType:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "STUDY_TYPE","_migrate")
            .then(_rows=>{
                dbUtility.insertRecords(_rows,"STUDY_TYPE",false)
                    .then(results=>{
                        console.log("migration STUDY_TYPE successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
    migrateStudy:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "STUDY","_migrate")
            .then(_rows=>{

                dbUtility.insertRecords(_rows,"STUDY",false)
                    .then(results=>{
                        console.log("migration STUDY successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },

    migrateStudyActe:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "STUDY_ACTE","_migrate")
            .then(_rows=>{

                dbUtility.insertRecords(_rows,"STUDY_ACTE",false)
                    .then(results=>{
                        console.log("migration STUDY_ACTE successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },

    migrateModality:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "MODALITY","_migrate")
            .then(_rows=>{

                dbUtility.insertRecords(_rows,"MODALITY",false)
                    .then(results=>{
                        console.log("migration MODALITY successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },

    migrateDevice:function(callback)
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "DEVICE","_migrate")
            .then(_rows=>{
                _rows.forEach(_row=>{

                    if(_row.deviceAgreementDate && _row.deviceAgreementDate=="0000-00-00")
                        _row.deviceAgreementDate="2010-10-10";
                    if(_row.deviceInstallationDate && _row.deviceInstallationDate=="0000-00-00 00:00:00")
                        _row.deviceInstallationDate="2010-10-10 10:10:10";
                });
                dbUtility.insertRecords(_rows,"DEVICE",false)
                    .then(results=>{
                        console.log("migration DEVICE successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
    migrateMedecin:function()
    {
        let dbUtility = global.App.DbUtility;
        dbUtility.read({limit:"no"}, "acte","_migrate")
            .then(_rows=>{
                dbUtility.insertRecords(_rows,"acte",false)
                    .then(results=>{
                        console.log("migration actes successful")
                    })
                    .catch(_err=>{
                        console.error(_err)
                    })
            });
    },
};
module.exports = Migration;