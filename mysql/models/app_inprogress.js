"use strict";
module.exports = function(sequelize, DataTypes) {
    let AppInprogress = sequelize.define("AppInprogress", {
            appInprogressId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4 ,
                primaryKey: true
            },
            roomId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            doctorId: { // userId
                type: DataTypes.INTEGER,
                allowNull: true
            },
            appInprogressDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appInprogressAppStartTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            appInprogressAppEndTime: {
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
            tableName: 'app_inprogress',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    AppInprogress.belongsTo(models.Room,{foreignKey: 'roomId'});
                    AppInprogress.belongsTo(models.User,{foreignKey: 'doctorId',constraints:false});
                }
            }
        }
    );
    return AppInprogress;
};