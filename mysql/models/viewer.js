"use strict";
module.exports = function(sequelize, DataTypes) {
    let Viewer = sequelize.define("Viewer", {
            viewerId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            viewerIp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            viewerPort: {
                type: DataTypes.STRING,
                allowNull: true
            },
            viewerCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            viewerType: { // 'horos, osirix,fuji etc....
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
            tableName: 'viewer',
            paranoid: true
        }
    );

    return Viewer;
};
