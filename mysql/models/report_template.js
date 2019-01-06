"use strict";
module.exports = function(sequelize, DataTypes) {
  var ReportTemplate = sequelize.define("ReportTemplate", {
          reportTemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
          doctorId: { // the author
              type: DataTypes.INTEGER,
              allowNull: false
          },

          reportTemplateName: {
          type: DataTypes.STRING,
          allowNull: false
        },
          reportTemplateContent: {
          type: DataTypes.BLOB,
          allowNull: true
        },
          reportTemplateContentIsHtml: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          reportTemplateIsPublic: { // if the template is visible by other users
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: true
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'report_template',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ReportTemplate.hasMany(models.ReportTemplateHasStudy,{foreignKey: 'reportTemplateId'});
              ReportTemplate.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
          }
        }
      }
  );
  return ReportTemplate;
};
