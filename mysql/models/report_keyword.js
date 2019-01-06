"use strict";
module.exports = function(sequelize, DataTypes) {
  var ReportKeyword = sequelize.define("ReportKeyword", {
          reportKeywordId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4 ,
              primaryKey: true
        },
          doctorId: { // the doctor
              type: DataTypes.INTEGER,
              allowNull: false
          },
          reportKeywordName: {
          type: DataTypes.STRING,
          allowNull: false
        },
          reportKeywordContent: {
              type: DataTypes.BLOB,
              allowNull: true
          },
          reportKeywordContentIsHtml: {
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: true
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'report_keyword',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ReportKeyword.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
          }
        }
      }
  );
  return ReportKeyword;
};
