let app = require('../server');
let models = require("../models");
//let modelsSir5 = require("../modelsSir5"); //TODO uncomment to do sir5 migration
//let modelsMedris = require("../modelsMedris"); //TODO uncomment to do medris migration
let modelsRadio3000 = require("../modelsRadio3000"); //TODO uncomment to do medris migration
app.set('port', 8080);

models.sequelize.sync().then(function () {
    console.log('Database was successfully sync');
});
   /* models.sequelizeMigrate.sync().then(function () {
    console.log('Migrate DB was successfully sync');
});*/

/*modelsSir5.sequelizeSir5.sync().then(function () {
    console.log('sir5 DB was successfully  sync'); //TODO uncomment to do sir5 migration
});*/

/*modelsMedris.sequelizeMedris.sync().then(function () {
    console.log('medris DB was successfully  sync'); //TODO uncomment to do Medris migration
});*/

modelsRadio3000.sequelizeRadio3000.sync().then(function () {
    console.log('Radio3000 DB was successfully  sync'); //TODO uncomment to do Medris migration
});
//"server":"smartmed.ddns.net", //"server":"localhost", à mettre dans le fichier direct-config

//TODO add the folowing to the database after his creation to set the timezone
/*ALTER DATABASE smartmed
SET "TimeZone" TO 'GMT';
ALTER ROLE postgres IN DATABASE smartmed
SET "TimeZone" TO 'GMT';
    */