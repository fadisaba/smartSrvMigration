"use strict";
module.exports = function(sequelize, DataTypes) {
    var ReportHasStudy = sequelize.define("ReportHasStudy", {
            reportHasStudyId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            reportId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            studyId: {
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
            tableName: 'report_has_study',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    ReportHasStudy.belongsTo(models.Report,{foreignKey: 'reportId'});
                    ReportHasStudy.belongsTo(models.Study,{foreignKey: 'studyId'});
                }
            }
        }
    );
    return ReportHasStudy;
};