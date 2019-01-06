"use strict";
module.exports = function(sequelize, DataTypes) {
    var CcamConfig = sequelize.define("CcamConfig", {
            CCAMConfigId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            CCAMConfigCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CCAMConfigDescription: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'ccam_config',
            paranoid: true

        }
    );
    return CcamConfig;
};

