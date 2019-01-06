"use strict";
module.exports = function(sequelize, DataTypes) {
    let Appointment = sequelize.define("Appointment", {
            appointmentId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: true

            },
            doctorId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            appointmentDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            appointmentIsEmergency: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentIsHospit: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentMedIsRequired: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentCanceledByPatient: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentCancelationDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appointmentConfirmationDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appointmentSmsSentDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appointmentDateConfirmationByPatient: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appointmentIsReceived: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentIsNotHononred: { // the appointment is not hononred by the patient
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            appointmentComment: {
                type: DataTypes.STRING,
                allowNull: true
            },

            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'appointment',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    Appointment.belongsTo(models.User,{foreignKey: 'doctorId',constraints:false});
                    Appointment.belongsTo(models.Patient,{foreignKey: 'patientId'});
                    Appointment.hasMany(models.AppDetail,{foreignKey: 'appointmentId'});
                    Appointment.hasMany(models.AppointmentHasRph,{foreignKey: 'appointmentId'});
                }
            }
        }
    );
    return Appointment;
};