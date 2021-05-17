"use strict";
module.exports = function(sequelize, DataTypes) {
    let UserPs= sequelize.define("UserPs", {
            id_user_ps: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_ps: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'user_ps',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                }
            }
        }
    );
    return UserPs;
};