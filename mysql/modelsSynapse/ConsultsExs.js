"use strict";
module.exports = function(sequelize, DataTypes) {
    let ConsultsExs= sequelize.define("ConsultsExs", {
            CONSULTEXID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            CONSULTID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            EXAMENID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'consults_exs',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                    ConsultsExs.belongsTo(modelsSynapse.Consult,{foreignKey: 'CONSULTID'});
                    ConsultsExs.belongsTo(modelsSynapse.Examen,{foreignKey: 'EXAMENID'});
                }
            }
        }
    );
    return ConsultsExs;
};