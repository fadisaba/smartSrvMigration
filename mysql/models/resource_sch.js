"use strict";
module.exports = function(sequelize, DataTypes) {
    let ResourceSch = sequelize.define("ResourceSch", {
            resourceSchId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userLabel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            roomCatId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            resourceSchStartDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            resourceSchEndDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            resourceSchColor: {
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
            tableName: 'resource_sch',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    ResourceSch.belongsTo(models.User,{foreignKey: 'userId'});
                    ResourceSch.belongsTo(models.Site,{foreignKey: 'siteId'});
                    ResourceSch.belongsTo(models.RoomCat,{foreignKey: 'roomCatId'});
                }
            }
        }
    );
    return ResourceSch;
};

