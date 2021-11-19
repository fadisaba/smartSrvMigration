"use strict";
module.exports = function(sequelize, DataTypes) {
    let Communes= sequelize.define("Communes", {
            COMMUNEID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            COMMUNECP: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            COMMUNENOM: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'COMMUNES',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );

    return Communes;
};
