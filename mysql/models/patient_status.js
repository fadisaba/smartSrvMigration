
"use strict";
module.exports = function (sequelize, DataTypes) {
    let PatientStatus = sequelize.define("PatientStatus", {
            patientStatusId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            patientStatusFontImgage: {
                type: DataTypes.STRING,
                allowNull: true
            },
            patientStatusLabel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patientStatusVisibleOnWorklist: {
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
            tableName: 'patient_status',
            paranoid: true
        }
    );
    return PatientStatus;
};
