"use strict";
module.exports = function(sequelize, DataTypes) {
    let Crs= sequelize.define("Crs", {
            CRID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            CONSULTID: {
                type: DataTypes.STRING,
                allowNull: true
            },

            USERID: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CRLIBELLE: {
                type: DataTypes.STRING,
                allowNull: true
            },

            CRPATH: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CRHTMLPATH: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CRDATETIME: {
                type: DataTypes.DATE,
                allowNull: true
            },

            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'crs',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return Crs;
};
