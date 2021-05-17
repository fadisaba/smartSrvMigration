"use strict";
module.exports = function(sequelize, DataTypes) {
    let OrgadestParamEtebac= sequelize.define("OrgadestParamEtebac", {
            id_orgadest_param_etebac: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            code_regime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_orgadest: {
                type: DataTypes.STRING,
                allowNull: true
            },
            code_centre_info: {
                type: DataTypes.STRING,
                allowNull: true
            },
            libelle: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'orgadest_param_etebac',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return OrgadestParamEtebac;
};
