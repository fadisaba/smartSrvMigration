"use strict";
module.exports = function(sequelize, DataTypes) {
    let FtAvailNumber = sequelize.define("FtAvailNumber", {
            ftAvailNumberId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            deviceId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ftAvailNumberYear: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ftAvailNumberNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'ft_avail_number',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    FtAvailNumber.belongsTo(models.Device,{foreignKey: 'deviceId'});
                }
            }
        }
    );
    return FtAvailNumber;
};
