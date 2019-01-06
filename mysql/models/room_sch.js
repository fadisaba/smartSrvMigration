"use strict";
module.exports = function(sequelize, DataTypes) {
    let RoomSch = sequelize.define("RoomSch", {
            roomSchId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            roomId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            roomSchStartDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            roomSchEndDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            roomSchColor: {
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
            tableName: 'room_sch',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    RoomSch.belongsTo(models.Site,{foreignKey: 'siteId'});
                    RoomSch.belongsTo(models.Room,{foreignKey: 'roomId'});
                }
            }
        }
    );
    return RoomSch;
};

