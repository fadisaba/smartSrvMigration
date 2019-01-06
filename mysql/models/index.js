"use strict";

let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let env       = process.env.NODE_ENV || "development";
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let migrateConfig    = require(path.join(__dirname, '..', 'config', 'config.json'))['migrate'];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let sequelizeMigrate = new Sequelize(migrateConfig.database, migrateConfig.username, migrateConfig.password, migrateConfig);
let db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
         let model1 = sequelizeMigrate.import(path.join(__dirname, file));
        db[model.name+"_migrate"] = model1;
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);

    }
});

db.sequelize = sequelize;
db.sequelizeMigrate = sequelizeMigrate;
db.Sequelize = Sequelize;

module.exports = db;