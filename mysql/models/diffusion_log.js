module.exports = function(sequelize, DataTypes) {
    let DiffusionLog= sequelize.define("DiffusionLog", {
            diffusionLogId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            reportId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            diffusionLogCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            diffusionLogDateTime: {
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
            tableName: 'diffusion_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    DiffusionLog.belongsTo(models.Patient,{foreignKey: 'patientId'});
                }
            }
        }
    );

    return DiffusionLog;
};
