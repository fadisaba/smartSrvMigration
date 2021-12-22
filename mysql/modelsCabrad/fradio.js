"use strict";
module.exports = function(sequelize, DataTypes) {
    let Fradio= sequelize.define("Fradio", {
            oid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            codrad: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nomrad: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'fradio',
            paranoid: false,
            classMethods: {
                associate: function(modelsCabrad) {
                }
            }
        }
    );
    return Fradio;
};
