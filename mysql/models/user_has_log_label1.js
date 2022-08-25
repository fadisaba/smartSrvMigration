module.exports = function(sequelize, DataTypes) {
    let UserHasLogLabel1= sequelize.define("UserHasLogLabel1", {
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
            tableName: 'user_has_log_label1',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    UserHasLogLabel1.belongsTo(models.UserHasLog1,{foreignKey: 'userHasLogId'});
                }
            }
        }
    );
    return UserHasLogLabel1;
};
