"use strict";
let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))['sir5'];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let dbSir5        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        dbSir5[model.name] = model;
    });

Object.keys(dbSir5).forEach(function(modelName) {
    if ("associate" in dbSir5[modelName]) {
        dbSir5[modelName].associate(dbSir5);
    }
});

dbSir5.sequelizeSir5 = sequelize;
dbSir5.Sequelize = Sequelize;
module.exports = dbSir5;