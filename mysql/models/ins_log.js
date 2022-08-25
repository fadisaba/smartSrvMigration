module.exports = function(sequelize, DataTypes) {
    let InsLog= sequelize.define("InsLog", {
            insLogId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            insLogActionCode: {//4 retour KO
                type: DataTypes.STRING,
                allowNull: false
            },
            insLogDateTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            insLogLabel: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            insLogHtml: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            insiLogIsDonnesDeSante: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            insiLogIsHandled: { // traité
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'ins_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    InsLog.belongsTo(models.User,{foreignKey: 'userId'});
                    InsLog.belongsTo(models.Patient,{foreignKey: 'patientId'});
                }
            }
        }
    );
    InsLog.associate = function(models) {
        InsLog.belongsTo(models.User,{foreignKey: 'userId'});
        InsLog.belongsTo(models.Patient,{foreignKey: 'patientId'});
    };
    return InsLog;
};
