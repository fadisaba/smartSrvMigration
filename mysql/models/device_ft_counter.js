"use strict";
module.exports = function(sequelize, DataTypes) {
    let DeviceFtCounter= sequelize.define("DeviceFtCounter",{
            deviceFtCounterId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
        deviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        deviceFtCounterYear: {
                type: DataTypes.STRING,
                allowNull: false
            },
        deviceFtCounterValue: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'device_ft_counter',
            paranoid: true,
             classMethods: {
           associate: function(models) {
               DeviceFtCounter.belongsTo(models.Device,{foreignKey: 'deviceId'});
           }
            }
        }
    );
    return DeviceFtCounter;
};