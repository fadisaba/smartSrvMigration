"use strict";
module.exports = function (sequelize, DataTypes) {
    let StatCalcul = sequelize.define("StatCalcul", {
            statCalculId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            statCalculYear: {
                type: DataTypes.STRING,
                allowNull: false
            },
            statCalculMonth: {
                type: DataTypes.STRING,
                allowNull: false
            },
            statCalculExecuteTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'stat_calcul',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                }
            }
        }
    );
    return StatCalcul;
};