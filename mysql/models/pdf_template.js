"use strict";
module.exports = function(sequelize, DataTypes) {
    let PdfTemplate = sequelize.define("PdfTemplate", {
            pdfTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            pdfTemplateType: {
            type: DataTypes.INTEGER, // 1-FsCerfa,2-FTCerfa-3-FicheSuiveuse,4-etiquette,5-quittance, 6- bon examen, 7-certificat passage, 8 - note d'honoraire,9-Autre
            allowNull: true
          },
        pdfTemplateNamePc: {// le nom du poste qui imprime
            type: DataTypes.STRING,
            allowNull: true
        },
        pdfTemplateTables: {
            type: DataTypes.STRING,
            allowNull: true
        },
            pdfTemplatePath: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pdfTemplateLabel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pdfTemplateOrder: {
            type: DataTypes.INTEGER, // the template position in the menu
            allowNull: true
            },
            pdfTemplatePrinterName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pdfTemplateIsHidden: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'pdf_template',
            paranoid: true,
        }
    );
    return PdfTemplate;
};
