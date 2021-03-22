"use strict";
module.exports = function(sequelize, DataTypes) {
    var ReportHasLog = sequelize.define("ReportHasLog", {
            reportHasLogId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            reportHasLogDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            reportId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userInitiales: {
                type: DataTypes.STRING,
                allowNull: false
            },
            reportHasLogAction: {
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
            tableName: 'report_has_log',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    ReportHasLog.belongsTo(models.Report,{foreignKey: 'reportId'});
                }
            }
        }
    );
    return ReportHasLog;
};