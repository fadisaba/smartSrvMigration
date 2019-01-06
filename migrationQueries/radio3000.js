/*
corrigerCodeGroupementApresMigration : fonction à executer après la migration des actes
*/
/**
 *
 * requetes à executer sur la base medRIS
 * ALTER TABLE `ville_cp` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `site` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `medecin` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * UPDATE `coordonnee` SET `DEL` = '0' WHERE DEL is null;
    delete FROM coordonnee WHERE DEL=1;
 * DELETE from examen_cotation where examen_cotation.idExamen IN (select ex.idExamen from examen as ex WHERE ex.DEL<>0 );
 * ALTER TABLE `examen_type` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `patient` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `correspondant` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `coordonnee` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `patient_correspondant` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `dossier` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `materiel` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `examen` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `dossier_cotation` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `dossier_compte_rendu` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `dossier_examen_cotation` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 *ALTER TABLE `examen_cotation` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 *ALTER TABLE `materiel_type` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;
 * ALTER TABLE `dossier_examen` ADD `createdAt` INT NULL DEFAULT NULL AFTER `DEL`, ADD `updatedAt` INT NULL DEFAULT NULL AFTER `createdAt`;

 * ALTER TABLE `dossier` ADD INDEX( `DEL`);
 *
 *
 *
 */
// migrate  radiologue
Server.Radio3000Migration.migrateRadiologue({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  worklist
Server.Radio3000Migration.migrateWorklist({siteId:1},
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
Server.Radio3000Migration.migrateStudies({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// MIGRATE actes
Server.Radio3000Migration.migrateStudiesActe({},
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
Server.MedRisMigration.migrateStudiesActe({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  migrateMedecin
Server.Radio3000Migration.migrateMedecin({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  migrateMedecinDelta
Server.Radio3000Migration.migrateMedecinDelta({},
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
Server.Radio3000Migration.migratePatient({siteId:1},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  patient delta
Server.Radio3000Migration.migratePatientDelta({siteId:1},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);


// migrate  migrateMedecinTraitantForPatient
Server.Radio3000Migration.migrateMedecinTraitantForPatient1({limit:50000,offset:0},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
Server.Radio3000Migration.migrateMedecinTraitantForPatient2({},
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

/**
 * delete from visit;
 * delete from worklist
 *
 */
Server.Radio3000Migration.migrateDossiers({mind:0,maxd:5,startDate:'2017-01-01',endDate:'2017-12-31',siteId:1},
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
Server.Radio3000Migration.migrateExamens({mind:0,maxd:5,startDate:'2018-01-01',endDate:'2018-12-31'},
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
Server.Radio3000Migration.migrateCrs({mind:0,maxd:3000,startDate:'2018-01-01',endDate:'2018-12-31',directory:""},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
