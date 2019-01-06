"use strict";
module.exports = function(sequelize, DataTypes) {
    let Document= sequelize.define("Document", {
            IDE_DOCUMENT: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDU_DOSSIER: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_TYPE_DOCUMENT: { // 1 POUR COMPTE RENDU
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_DOCUMENT_SOURCE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDU_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CHEMINDOC: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Version: { // version du compte rendu, il faut prendre juste la dernière version
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            CRSAISI: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            CRCORRIGE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            CRSIGNE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            DATE_CREATION: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'DOCUMENT',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Document.belongsTo(modelsSir5.Dossier,{foreignKey: 'IDU_DOSSIER'});
                    Document.belongsTo(modelsSir5.Examen,{foreignKey: 'IDU_EXAMEN'});
                }
            }
        }
    );
    return Document;
};