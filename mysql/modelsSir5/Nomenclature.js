"use strict";
module.exports = function(sequelize, DataTypes) {
    let Nomenclature= sequelize.define("Nomenclature", {
            IDE_NOMENCLATURE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_GROUPE_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            LIBELLE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            HORS_NOMENCLATURE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PRESENCE_RAD: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            TRACTUS_TECH: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            OBSOLETE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            DOUBLE_FT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            SELECTION_APPAREIL: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            DEPISTAGE: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'NOMENCLATURE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Nomenclature.belongsTo(modelsSir5.GroupeExamen,{foreignKey: 'IDE_GROUPE_EXAMEN'});
                    Nomenclature.hasMany(modelsSir5.Examen,{foreignKey: 'IDE_NOMENCLATURE'});
                    Nomenclature.hasMany(modelsSir5.NomenclatureActe,{foreignKey: 'IDE_NOMENCLATURE'});
                    Nomenclature.hasMany(modelsSir5.NomenclatureCcam,{foreignKey: 'IDE_NOMENCLATURE'});
                }
            }
        }
    );
    return Nomenclature;
};
