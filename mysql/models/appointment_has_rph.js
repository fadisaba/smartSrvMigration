"use strict";
module.exports = function (sequelize, DataTypes) {
    let AppointmentHasRph = sequelize.define("AppointmentHasRph", {
            AppointmentHasRphId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            appointmentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            referringPhysicianId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            referringPhysicianPatientIsOrientedBy: { // true if the Referring physician  oriented patient
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'appointment_has_rph',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    AppointmentHasRph.belongsTo(models.Appointment, {foreignKey: 'appointmentId'});
                    AppointmentHasRph.belongsTo(models.ReferringPhysician, {foreignKey: 'referringPhysicianId'});
                }
            }
        }
    );
    return AppointmentHasRph;
};
