"use strict";
module.exports = function(sequelize, DataTypes) {
    let UserExtHasPatient = sequelize.define("UserExtHasPatient", {
            userExtPatientId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            userExtId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userExtPatientStatus: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'user_ext_has_patient',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    UserExtHasPatient.belongsTo(models.UserExt,{foreignKey: 'userExtId'});
                    UserExtHasPatient.belongsTo(models.Patient,{foreignKey: 'patientId'});
                }
            }
        }
    );

    return UserExtHasPatient;
};
