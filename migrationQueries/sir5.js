// migrate City
Server.Sir5Migration.migrateCommune({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
// migrate group site
Server.Sir5Migration.migrateGroupeSite({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  site
Server.Sir5Migration.migrateSite({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
// migrate  radiologue
Server.Sir5Migration.migrateRadiologue({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  patient
Server.Sir5Migration.migratePatient({limit:10000,offset:50000},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    });

// migrate  patient delta
Server.Sir5Migration.migratePatientDelta({limit:100000,offset:0},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    });

// MIGRATE STUDY TYPE
Server.Sir5Migration.migrateStudiesType({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// MIGRATE STUDY
Server.Sir5Migration.migrateStudies({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
// MIGRATE STUDY acte
Server.Sir5Migration.migrateStudiesActe({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// MIGRATE migrateDossiers
Server.Sir5Migration.migrateDossiers({mind:0,maxd:5},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate examen
Server.Sir5Migration.migrateExamens({mind:0,maxd:5},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
// migrate CRs

Server.Sir5Migration.migrateCrs({mind:0,maxd:2,startDate:'2018-01-01',endDate:'2018-12-31',directory:""},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);