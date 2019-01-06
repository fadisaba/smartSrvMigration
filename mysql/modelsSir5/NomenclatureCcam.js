"use strict";
module.exports = function(sequelize, DataTypes) {
    let NomenclatureCcam= sequelize.define("NomenclatureCcam", {
            IDE_NOMEN_CCAM: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_RADIOLOGUE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_NOMENCLATURE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            CODE_CCAM: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CODE_ACTIVITE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_EXTENSION: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PHASE_TRAITEMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_ASSO_NON_PREV: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CODE_REMB_EXCEPTIO: {
                type: DataTypes.STRING,
                allowNull: true
            },
            TOP_SUPPLEMENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            GESTE_COMPLE: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,PAR_DEFAUT: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'NOMENCLATURE_CCAM',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    NomenclatureCcam.belongsTo(modelsSir5.Nomenclature,{foreignKey: 'IDE_NOMENCLATURE'});
                    NomenclatureCcam.belongsTo(modelsSir5.Site,{foreignKey: 'IDE_SITE'});
                    NomenclatureCcam.belongsTo(modelsSir5.Radiologue,{foreignKey: 'IDE_RADIOLOGUE'});
                }
            }
        }
    );

    return NomenclatureCcam;
};
