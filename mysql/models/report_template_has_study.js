"use strict";
module.exports = function(sequelize, DataTypes) {
  var ReportTemplateHasStudy = sequelize.define("ReportTemplateHasStudy", {
          reportTemplateHasStudyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
          doctorId: { // the doctor
              type: DataTypes.INTEGER,
              allowNull: true
          },
          reportTemplateId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          studyId: { // concerned study
              type: DataTypes.INTEGER,
              allowNull: true
          },
          reportTemplateHasStudyIsDefault: {// le template par défaut à afficher lors de l'ouverture du compte rendu
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
        tableName: 'report_template_has_study',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ReportTemplateHasStudy.belongsTo(models.Doctor,{foreignKey: 'doctorId',constraints:false});
              ReportTemplateHasStudy.belongsTo(models.ReportTemplate,{foreignKey: 'reportTemplateId'});
              ReportTemplateHasStudy.belongsTo(models.Study,{foreignKey: 'studyId'});
          }
        }
      }
  );
  return ReportTemplateHasStudy;
};
