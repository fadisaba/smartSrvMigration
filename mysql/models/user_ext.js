"use strict";
module.exports = function (sequelize, DataTypes) {
    var UserExt = sequelize.define("UserExt", {
            userExtId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            cityId: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            userExtType: {//0 patient  1: prescipteur
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userExtFName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userExtLName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userExtEmail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            userExtPass: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userExtZipCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userExtAddress: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userExtBirthday: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            userExtPhone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'user_ext',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    UserExt.belongsTo(models.City, {foreignKey: 'cityId', constraints: false});

                }
            }
        }
    );

    return UserExt;
};
