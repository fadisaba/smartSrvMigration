"use strict";
module.exports = function(sequelize, DataTypes) {
  var ReportHf = sequelize.define("ReportHf", {
          reporthfId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
          doctorId: { // the doctor
              type: DataTypes.INTEGER,
              allowNull: false
          },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: true
          },
          reporthfType: { // 1 Header, 2 Footer
              type: DataTypes.INTEGER,
              allowNull: false
          },
          reporthfName: {
          type: DataTypes.STRING,
          allowNull: false
        },
          reporthfContent: {
              type: DataTypes.BLOB,
              allowNull: true
          },
          reporthfContentIsHtml: {
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
        tableName: 'report_hf',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              ReportHf.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
              ReportHf.belongsTo(models.Site,{foreignKey: 'siteId',constraints:false});
          }
        }
      }
  );
  return ReportHf;
};
