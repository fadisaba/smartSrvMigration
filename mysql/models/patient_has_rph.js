
"use strict";
module.exports = function (sequelize, DataTypes) {
    var PatientHasRph = sequelize.define("PatientHasRph", {
            patientHasRphId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            referringPhysicianId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            patientHasRphDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'patient_has_rph',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    PatientHasRph.belongsTo(models.Patient, {foreignKey: 'patientId'});
                    PatientHasRph.belongsTo(models.ReferringPhysician, {foreignKey: 'referringPhysicianId'});
                }
            }
        }
    );
    return PatientHasRph;
};
