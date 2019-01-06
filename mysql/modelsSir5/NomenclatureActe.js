"use strict";
module.exports = function(sequelize, DataTypes) {
    let NomenclatureActe= sequelize.define("NomenclatureActe", {
            NUMLIGNE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_NOMENCLATURE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            QUANTITE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            LETTRE_CLE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            COEF: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            MULTIPLICATEUR: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            DENOMBREMENT: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'NOMENCLATURE_ACTE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    NomenclatureActe.belongsTo(modelsSir5.Nomenclature,{foreignKey: 'IDE_NOMENCLATURE'});
                }
            }
        }
    );

    return NomenclatureActe;
};
