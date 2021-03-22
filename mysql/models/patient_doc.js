"use strict";
module.exports = function (sequelize, DataTypes) {
    let PatientDoc = sequelize.define("PatientDoc", {
            patientDocId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            appointmentId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            docTypeId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            patientDocName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patientDocPath: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patientDocDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            patientDocOrder: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'patient_doc',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    PatientDoc.belongsTo(models.DocType, {foreignKey: 'docTypeId'});
                    PatientDoc.belongsTo(models.Visit, {foreignKey: 'visitId',constraints: false});
                    PatientDoc.belongsTo(models.Patient, {foreignKey: 'patientId',constraints: false});
                }
            }
        }
    );
    return PatientDoc;
};
