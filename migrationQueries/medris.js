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

// migrate City
Server.MedRisMigration.migrateCommune({},
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
Server.MedRisMigration.migrateGroupeSite({},
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
Server.MedRisMigration.migrateSite({},
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
Server.MedRisMigration.migrateMedecin({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  migrateMateriel type
Server.MedRisMigration.migrateMaterielType({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

/** TODO attention il faut affecter le modalityId manuellement après la migration du materiel
 *
 */
// migrate  migrateMateriel
Server.MedRisMigration.migrateMateriel({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  migrateCorrespondant
Server.MedRisMigration.migrateCorrespondant({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);


// migrate  migrateCityIdForCorrespondant
Server.MedRisMigration.migrateCityIdForCorrespondant({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

/**
 * query to execute on medris database
 *

 */

// migrate  patient
Server.MedRisMigration.migratePatient({limit:50000,offset:0},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// migrate  migrate
Server.MedRisMigration.migrateCorrespondantIdForPatient({},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);

// MIGRATE STUDY TYPE
Server.MedRisMigration.migrateStudiesType({},
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
Server.MedRisMigration.migrateStudies({},
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

// MIGRATE migrateDossiers

/**
 * delete from visit;
 * delete from worklist
 *
 */
Server.MedRisMigration.migrateDossiers({mind:0,maxd:5,startDate:'2018-01-01',endDate:'2018-12-31'},
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
Server.MedRisMigration.migrateExamens({mind:0,maxd:5,startDate:'2018-01-01',endDate:'2018-12-31'},
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
Server.MedRisMigration.migrateCrs({mind:0,maxd:3000,startDate:'2018-01-01',endDate:'2018-12-31',directory:""},
    function(res){
        if(res.success){
            console.log(res.data);
        }
        else{
            console.error(res.msg);
        }
    }
);
