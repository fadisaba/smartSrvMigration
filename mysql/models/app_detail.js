"use strict";
module.exports = function(sequelize, DataTypes) {
    let AppDetail = sequelize.define("AppDetail", {
            appDetailId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4 ,
                primaryKey: true
            },
            appointmentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            roomId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            doctorId: { // userId
                type: DataTypes.INTEGER,
                allowNull: true
            },
            technicianId: { // userId
                type: DataTypes.INTEGER,
                allowNull: true
            },
            appDetailStartTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appDetailEndTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'app_detail',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    AppDetail.belongsTo(models.Appointment,{foreignKey: 'appointmentId'});
                    AppDetail.belongsTo(models.Study,{foreignKey: 'studyId'});
                    AppDetail.belongsTo(models.Room,{foreignKey: 'roomId'});
                    AppDetail.belongsTo(models.User,{foreignKey: 'doctorId',constraints:false});
                    AppDetail.belongsTo(models.User,{foreignKey: 'technicianId',constraints:false});
                }
            }
        }
    );
    return AppDetail;
};