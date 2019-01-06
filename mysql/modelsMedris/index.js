"use strict";
let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))['medris'];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let dbMedris        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        dbMedris[model.name] = model;
    });

Object.keys(dbMedris).forEach(function(modelName) {
    if ("associate" in dbMedris[modelName]) {
        dbMedris[modelName].associate(dbMedris);
    }
});

dbMedris.sequelizeMedris = sequelize;
dbMedris.Sequelize = Sequelize;
module.exports = dbMedris;