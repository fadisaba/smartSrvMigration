"use strict";
module.exports = function(sequelize, DataTypes) {
    let MaterielType= sequelize.define("MaterielType", {
            idMaterielType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            designationMaterielType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            disciplineFTMaterielType: {
                type: DataTypes.STRING,
                allowNull: true
            },
             idMaintenance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DEL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'materiel_type',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return MaterielType;
};
