module.exports = function(sequelize, DataTypes) {
    let UserHasLogLabel= sequelize.define("UserHasLogLabel", {
            userHasLogLabelId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userHasLogId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userHasLogLabelText: {
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
            tableName: 'user_has_log_label',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    UserHasLogLabel.belongsTo(models.UserHasLog,{foreignKey: 'userHasLogId'});
                }
            }
        }
    );
    return UserHasLogLabel;
};
