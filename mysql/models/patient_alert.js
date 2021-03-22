"use strict";
module.exports = function(sequelize, DataTypes) {
    let PatientAlert = sequelize.define("PatientAlert", {
            patientAlertId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            patientAlertCode: {
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
            tableName: 'patient_alert',
            paranoid: true
        }
    );
    return PatientAlert;
};
