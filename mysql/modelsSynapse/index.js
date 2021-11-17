"use strict";
let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))['synapse'];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let dbSynapse        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        dbSynapse[model.name] = model;
    });

Object.keys(dbSynapse).forEach(function(modelName) {
    if ("associate" in dbSynapse[modelName]) {
        dbSynapse[modelName].associate(dbSynapse);
    }
});

dbSynapse.sequelizeSynapse = sequelize;
dbSynapse.Sequelize = Sequelize;
module.exports = dbSynapse;