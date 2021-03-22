"use strict";
module.exports = function (sequelize, DataTypes) {
    var AppointmentOnlineIpLog = sequelize.define("AppointmentOnlineIpLog", {
            appointmentOnlineIpLogId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            appointmentOnlineIpLogIp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            appointmentOnlineIpLogDateTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            appointmentOnlineIpLogAction: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'appointment_online_ip_log',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return AppointmentOnlineIpLog;
};
