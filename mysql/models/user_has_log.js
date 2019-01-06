module.exports = function(sequelize, DataTypes) {
    let UserHasLog= sequelize.define("UserHasLog", {
            userHasLogId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            userHasLogTableUuId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            userHasLogTableIntegerId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            userHasLogTableName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userHasLogActionCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userHasLogDateTime: {
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
            tableName: 'user_has_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    UserHasLog.hasMany(models.UserHasLogLabel,{foreignKey: 'userHasLogId'});
                    UserHasLog.belongsTo(models.User,{foreignKey: 'userId'});
                }
            }
        }
    );

    return UserHasLog;
};
