"use strict";
module.exports = function(sequelize, DataTypes) {
    var ReportHeader = sequelize.define("ReportHeader", {
            reportHeaderId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            reportId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            reportHeaderContentIsHtml: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'report_header',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    ReportHeader.belongsTo(models.Report,{foreignKey: 'reportId'});
                }
            }
        }
    );

    return ReportHeader;
};