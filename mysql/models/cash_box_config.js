"use strict";
module.exports = function (sequelize, DataTypes) {
    let CashBoxConfig = sequelize.define("CashBoxConfig", {
            cashBoxConfigId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cashBoxId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cashBoxConfigIsDefault: { // default cash box for the site or the doctor
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'cash_box_config',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    CashBoxConfig.belongsTo(models.CashBox,{foreignKey: 'cashBoxId'});
                    CashBoxConfig.belongsTo(models.Site,{foreignKey: 'siteId',constraints:false});
                    CashBoxConfig.belongsTo(models.User,{foreignKey: 'userId',constraints:false});
                }
            }
        }
    );

    return CashBoxConfig;
};
