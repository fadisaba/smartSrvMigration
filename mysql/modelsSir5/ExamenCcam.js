"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExamenCcam= sequelize.define("ExamenCcam", {
            IDE_NOMEN_CCAM: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDU_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDU_DOSSIER: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_RADIOLOGUE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CODE_CCAM: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CODE_REGROUP: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Code_asso_non_prev_def: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'EXAMEN_CCAM',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    ExamenCcam.belongsTo(modelsSir5.Dossier,{foreignKey: 'IDU_DOSSIER'});
                    ExamenCcam.belongsTo(modelsSir5.Examen,{foreignKey: 'IDU_EXAMEN'});
                    ExamenCcam.belongsTo(modelsSir5.Radiologue,{foreignKey: 'IDE_RADIOLOGUE'});
                    ExamenCcam.belongsTo(modelsSir5.Site,{foreignKey: 'IDE_SITE'});
                }
            }
        }
    );

    return ExamenCcam;
};
