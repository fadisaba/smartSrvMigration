"use strict";
let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))['eris'];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let dbEris        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        dbEris[model.name] = model;
    });

Object.keys(dbEris).forEach(function(modelName) {
    if ("associate" in dbEris[modelName]) {
        dbEris[modelName].associate(dbEris);
    }
});

dbEris.sequelizeEris = sequelize;
dbEris.Sequelize = Sequelize;
module.exports = dbEris;