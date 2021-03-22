module.exports = function(sequelize, DataTypes) {
    let UserExtHasLog= sequelize.define("UserExtHasLog", {
            userExtHasLogId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userExtId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userExtHasLogTableUuId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            userExtHasLogTableName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userExtHasLogActionCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userExtHasLogDateTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'user_ext_has_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    UserExtHasLog.belongsTo(models.UserExt,{foreignKey: 'userExtId'});
                }
            }
        }
    );

    return UserExtHasLog;
};
