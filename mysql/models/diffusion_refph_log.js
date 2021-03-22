module.exports = function(sequelize, DataTypes) {
    let DiffusionRefphLog= sequelize.define("DiffusionRefphLog", {
            diffusionRefphLogId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            referringPhysicianId: {
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
            tableName: 'diffusion_refph_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    DiffusionRefphLog.belongsTo(models.ReferringPhysician,{foreignKey: 'referringPhysicianId'});
                }
            }
        }
    );

    return DiffusionRefphLog;
};
